const path = require('path')

const config = ({ dest, source, mode, library }) => ({
  entry: { [path.basename(source)]: path.resolve(__dirname, `${source}.js`) },
  output: {
    path: path.resolve(__dirname, dest),
    filename: '[name]_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  mode
})

module.exports = (env, argv) => {
  const mode = argv.mode || 'development'

  return [
    // config({ dest: 'dist', source: 'src/index', mode }),
    config({ dest: 'samples/dist', source: 'samples/index', mode })
  ]
}
