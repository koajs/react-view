module.exports = {
  entry: './public/js/main.js',
  output: {
    path: './public/js',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader!jsx-loader?harmony'
    }]
  }
};
