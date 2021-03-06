const CopyPlugin = require("copy-webpack-plugin");

module.exports = {

  devServer: {
    compress: true,
    disableHostCheck: true   
  },
  entry: {
    bundle: ['./app/app.js']
  },
  output: {
    path: __dirname + '/public',
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.bpmn$/,
        use: 'raw-loader'
      }
    ]
  },
  
  plugins: [
    new CopyPlugin({
      patterns: [
      { from: 'assets/**', to: 'vendor/bpmn-js', context: 'node_modules/bpmn-js/dist/' },
      { from: '**/*.{html,css,ico,woff,ttf}', context: 'app/' }
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],  
  
  
  //mode: 'development',
  mode: 'production',
  devtool: 'source-map'
};
