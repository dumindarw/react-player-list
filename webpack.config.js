const webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');

var isProd = process.env.NODE_ENV === 'production'; //true or false
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

const path = require("path");

module.exports = {

    entry : {
        app: './src/index.js',
        bootstrap: bootstrapConfig
    },
    output : {
        path : __dirname + '/dist/',
        filename: '[name].bundle.js'
    },
    module:{
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" 
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ 'css-loader', 'sass-loader'],
                    publicPath: '/dist'
                })
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&name=fonts/[name].[ext]',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader?name=fonts/[name].[ext]',
            },
            {
                test: /\.(pdf|jpg|png|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'url-loader'
                    },
                ]
            },
            { 
                test: /bootstrap-sass\/assets\/javascripts\//, 
                use: 'imports-loader?jQuery=jquery' 
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only"
    },
    plugins : [new htmlWebpackPlugin({
        title: 'Player List',
        hash: true,
        template: './src/index-tmpl.html'
    }),
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery'
    }),
    new ExtractTextPlugin({
        filename: '[name].css',
        disable: false,
        allChunks:true
    }),]

}