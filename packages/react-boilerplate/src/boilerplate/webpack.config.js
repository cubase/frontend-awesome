const path = require('path')
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8000
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TSConfigPathsPlugin()]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/public', to: "public", noErrorOnMissing: true }
      ]
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}
