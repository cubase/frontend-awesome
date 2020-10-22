const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const generateWebpackBase = ({ tsLoaderOptions } = {}) => ({
  mode: 'production',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: tsLoaderOptions,
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TSConfigPathsPlugin()]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
})

module.exports = generateWebpackBase
