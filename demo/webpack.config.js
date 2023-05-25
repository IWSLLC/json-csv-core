const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = ({ dest, source, mode }) => {

	const htmlWebpackPluginInstance = new HtmlWebpackPlugin({template: path.join(__dirname, './src/index.html')})
	const prodMode = mode === 'production'

	let devtool; let sourceMapLoader
	if (!prodMode) {
		devtool = 'source-map'
		sourceMapLoader = {
			test: /\.js$/,
			enforce: 'pre',
			use: ['source-map-loader']
		}
	}  
	const config = {
		entry: { [path.basename(source)]: path.resolve(__dirname, `${source}.js`) },
		mode,
		...({ devtool }),
		output: {
			path: path.resolve(__dirname, dest),
			filename: '[name]_bundle.js'
		},
		devServer: {
			hot: !prodMode,
			historyApiFallback: true,
			host: '0.0.0.0',
			// static: {
			// 	directory: path.join(__dirname, './src/public')
			// },
			compress: true,
			port: process.env.PORT || 3000
		},
		"plugins": [
			htmlWebpackPluginInstance
		]
		,
		module: {
			rules: [
				{
					test: /\.(js)$/,
					exclude: /node_modules/,
					use: 'babel-loader'
				}
			]
		}
	}
	if (sourceMapLoader) config.module.rules.push(sourceMapLoader)

	return config
}

module.exports = (env, argv) => {
	const mode = argv.mode || 'development'

	return [
		// config({ dest: 'dist', source: 'src/index', mode }),
		config({ dest: './dist', source: 'src/index', mode })
	]
}
