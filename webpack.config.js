import './frontend/src/style.scss';

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: __dirname + '/frontend/src/index.jsx',
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/frontend/public'
  }
}