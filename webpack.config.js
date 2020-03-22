const path = require('path')
const webpack = require('webpack')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
	mode: 'development',
	entry: {
		'intro/intro': './src/js/intro.js',
		'main/main': './src/js/main.js'
	},
	output: {
		// path: path.resolve('./dist/main'),
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	devServer: {
		overlay: true,
		stats: 'errors-only'
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: [
					process.env.NODE_ENV === 'production'
						? MiniCssExtractPlugin.loader
						: 'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				loader: 'url-loader',
				options: {
					name: '[name].[ext]?[hash]',
					limit: 10000 // 10Kb
				}
			}
		]
	},
	plugins: [
		// new CleanWebpackPlugin(),
		...(process.env.NODE_ENV === 'production'
			? [new MiniCssExtractPlugin({ filename: '[name].css' })]
			: [])
	]
}
