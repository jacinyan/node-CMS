const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
        new HtmlWebpackPlugin()
    ]
}