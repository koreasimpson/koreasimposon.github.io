const path = require('path')
const webpack = require('webpack')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
	mode: 'development',
	entry: {
		app: './src/main/js/main.js'
	},
	output: {
		path: path.resolve('./dist/main'),
		filename: '[name].js'
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
		new HtmlWebpackPlugin({
			template: './src/main/index.html',
			templateParameters: {
				env: process.env.NODE_ENV === 'production' ? '배포용' : '개발용'
			}
		}),
		...(process.env.NODE_ENV === 'production'
			? [new MiniCssExtractPlugin({ filename: '[name].css' })]
			: [])
	]
}
