var webpack = require('webpack')

module.exports = {
  entry: {
    sample: __dirname + '/src/index.js'
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },
  output: {
    filename: __dirname + '/dist/index.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  resolveLoader: {
    modulesDirectories: [__dirname + '/../../', 'node_modules']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' ,
        query: { presets: ['es2015'] }
      },
      { test: /.*/, exclude: /node_modules/, loader: 'ramda-global-loader' },
      { test: /.*/, exclude: /node_modules/, loader: 'ramda-debug-loader' }
    ]
  }
}
