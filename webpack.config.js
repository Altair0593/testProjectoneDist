const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: {
        scriptTable: __dirname + "/static/src/script.js",
        autorization: __dirname + "/static/src/autorizationValidation.js",
        login: __dirname + "/static/src/login.js",
        server: __dirname + "/server.js"
    }, // webpack entry point. Module to start building dependency graph
    output: {
        path: __dirname + '/dist', // Folder to store generated bundle
        filename: '[name].js',  // Name of generated bundle after build
        publicPath: '/' // public URL of the output directory when referenced in a browser
    },
    module: {  // where we defined file patterns and their loaders
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS

                    }, {
                        loader: 'less-loader', // compiles Less to CSS

                    }]

            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [  // Array of plugins to apply to build chunk
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: __dirname + "/static/public/index.html",
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: "authorization.html",
            template: __dirname + "/static/public/authorization.html",
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: "registration.html",
            template: __dirname + "/static/public/registration.html",
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {  // configuration for webpack-dev-server
        contentBase: './dist',  //source of static assets
        port: 7700, // port to run dev-server
    }
}
