const path = require('path');

module.exports = {
  entry: './client/game.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client'),
  },
  mode: 'development',
};