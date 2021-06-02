const os = require('os')
const inquirer = require('inquirer')
const path = require('path')
const tar = require('tar-fs')
const fs = require('fs-extra')
const chalk = require('chalk')
const validateNpmName = require('validate-npm-package-name')

const validateProjectName = (appName) => {
  const validationResult = validateNpmName(appName)
  if (!validationResult.validForNewPackages) {
    console.error(
      chalk.red(
        `Cannot create a project named ${chalk.green(
          `"${appName}"`
        )} because of npm naming restrictions:\n`
      )
    )
    ;[...(validationResult.errors || []), ...(validationResult.warnings || [])].forEach((error) => {
      console.error(chalk.red(`  * ${error}`))
    })
    console.error(chalk.red('\nPlease choose a different project name.'))
    return false
  }
  return true
}

const isSafeToCreateProjectIn = (root, name) => {
  const validFiles = [
    '.DS_Store',
    '.git',
    '.gitattributes',
    '.gitignore',
    '.gitlab-ci.yml',
    '.hg',
    '.hgcheck',
    '.hgignore',
    '.idea',
    '.npmignore',
    '.travis.yml',
    'docs',
    'LICENSE',
    'README.md',
    'mkdocs.yml',
    'Thumbs.db'
  ]
  // These files should be allowed to remain on a failed install, but then
  // silently removed during the next create.
  const errorLogFilePatterns = ['npm-debug.log', 'yarn-error.log', 'yarn-debug.log']
  const isErrorLog = (file) => {
    return errorLogFilePatterns.some((pattern) => file.startsWith(pattern))
  }

  const conflicts = fs
    .readdirSync(root)
    .filter((file) => !validFiles.includes(file))
    // IntelliJ IDEA creates module files before CRA is launched
    .filter((file) => !/\.iml$/.test(file))
    // Don't treat log files from previous installation as conflicts
    .filter((file) => !isErrorLog(file))

  if (conflicts.length > 0) {
    console.log(`The directory ${chalk.green(name)} contains files that could conflict:\n`)
    for (const file of conflicts) {
      try {
        const stats = fs.lstatSync(path.join(root, file))
        if (stats.isDirectory()) {
          console.log(`  ${chalk.blue(`${file}/`)}`)
        } else {
          console.log(`  ${file}`)
        }
      } catch (e) {
        console.log(`  ${file}`)
      }
    }
    console.log('\nEither try using a new directory name, or remove the files listed above.')
    return false
  }

  // Remove any log files from a previous installation.
  fs.readdirSync(root).forEach((file) => {
    if (isErrorLog(file)) {
      fs.removeSync(path.join(root, file))
    }
  })
  return true
}

const run = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        filter: String,
        validate: validateProjectName,
        default: 'my-project'
      },
      {
        type: 'confirm',
        name: 'useCWD',
        message: (answers) => `Use current directory? (${path.join(process.cwd(), answers.name)})`,
        default: true
      },
      {
        type: 'input',
        name: 'customPath',
        message: 'Path to project directory:',
        filter: String,
        when: (answers) => !answers.useCWD
      }
    ])
    .then(async (answers) => {
      // Setup project phase
      const projectName = answers.name
      const projectDirectory = answers.useCWD
        ? path.resolve(process.cwd(), projectName)
        : path.resolve(answers.customPath)

      // 1. Ensure project directory
      console.log(chalk.yellow('» Initializing project directory...'))
      fs.ensureDirSync(projectDirectory)

      // 2. Check safe project creating
      if (!isSafeToCreateProjectIn(projectDirectory, projectName)) {
        process.exit(1)
      }

      // 3. Extract boilerplate
      console.log(chalk.yellow('» Exracting files...'))
      await new Promise((resolve, reject) => {
        const tarStream = fs
          .createReadStream(path.resolve(__dirname, 'boilerplate.tar'))
          .pipe(tar.extract(projectDirectory))

        tarStream.on('finish', () => {
          resolve()
        })

        tarStream.on('error', (err) => {
          reject(err)
        })
      })

      return { projectDirectory, projectName }
    })
    .then(({ projectDirectory, projectName }) => {
      // Finalize project phase
      console.log(chalk.yellow('» Updating project informations...'))
      const packageJsonPath = path.resolve(projectDirectory, './package.json')
      const packageJson = require(packageJsonPath)
      packageJson.name = projectName
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + os.EOL)

      console.log(chalk.green('✓ Enjoy!'))
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error(chalk.red("[FA] Prompt couldn't be rendered in the current environment"))
      } else {
        console.error(chalk.red('[FA] Error occured during creating boilerplate:\n'), error)
      }
    })
}

module.exports = { run }
