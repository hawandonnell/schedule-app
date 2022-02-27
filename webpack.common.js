const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'Schedule App',
  template: './src/index.html'
})

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [htmlPlugin, /* new BundleAnalyzerPlugin() */],
  output: {
      filename: '[name].bundle.js',
      chunkFilename: '[id].chunk.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
  }
}