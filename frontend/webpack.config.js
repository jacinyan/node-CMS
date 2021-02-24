const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')


module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'app.js'
    },
    // plug-ins & loaders
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './public/index.html'),
            filename: 'app.html',
            inject: true
        }),
        new CopyPlugin(
            {
                patterns:
                    [{
                        from: path.join(__dirname, './public/*.ico'),
                        to: path.join(__dirname, './dist/'),
                    }]
            }
        )
    ],
    // server
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 9000
    }
}