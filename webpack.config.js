const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

process.env.NODE_ENV = process.env.NODE_ENV || "development"

module.exports = {
	mode: "development",
	entry: {
		"index": "./src/js/index.js",
	},
	output: {
		path: path.resolve(__dirname),
		filename: "[name].js"
	},
	devServer: {
		contentBase: path.join(__dirname),
		publicPath: "/",
		overlay: true,
		stats: "errors-only"
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: [
					process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.js$/,
				use: ["babel-loader"],
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				loader: "url-loader",
				options: {
					name: "[name].[ext]?[hash]",
					limit: 10000 // 10Kb
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/view/index.html",
			filename: "index.html",
			templateParameters: {
				env: process.env.NODE_ENV === "production" ? "배포" : "개발"
			},
			chunks: ["index"]
		}),
		...(process.env.NODE_ENV === "production"
			? [new MiniCssExtractPlugin({ filename: "[name].css" })]
			: [])
	]
}
