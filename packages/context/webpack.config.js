const path = require('path')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const generateWebpackBase = require('../../generateWebpackBase')

module.exports = merge(
  generateWebpackBase({
    tsLoaderOptions: {
      context: __dirname,
      configFile: 'tsconfig.json'
    }
  }),
  {
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
      libraryTarget: 'umd'
    },
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    plugins: [new CleanWebpackPlugin()]
  }
)
