const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: {
        authorization: __dirname + "/static/src/authorizationValidation.js",
        index: __dirname + "/static/src/script.js",
        registration: __dirname + "/static/src/registrationValidation.js",
        accountSettings: __dirname + "/static/src/AccountSettingValidation.js",
        //server: __dirname + "/server.js"
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
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
                        loader: 'css-loader',

                    }, {
                        loader: 'less-loader',

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
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "authorization.html",
            template: __dirname + "/static/public/authorization.html",
            inject: 'body',
            chunks: [ "authorization"]
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: __dirname + "/static/public/index.html",
            inject: 'body',
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            filename: "registration.html",
            template: __dirname + "/static/public/registration.html",
            inject: 'body',
            chunks: ["registration"]
        }),
        new HtmlWebpackPlugin({
            filename: "accountSettings.html",
            template: __dirname + "/static/public/accountSettings.html",
            inject: 'body',
            chunks: [ "accountSettings"]
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: __dirname + './dist',
        port: 7800,
        index: 'authorization.html'
    }
}
