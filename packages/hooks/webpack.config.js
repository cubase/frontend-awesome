const path = require('path')
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const generateWebpackBase = require('../../generateWebpackBase')

module.exports = merge(generateWebpackBase(), {
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  externals: {
    react: 'React'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../_types/hooks/src/'),
          to: path.resolve(__dirname, './dist')
        }
      ]
    })
  ]
})
