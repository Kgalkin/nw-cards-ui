const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/main/js/index.js'],
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'src/main/resources/static/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        //host: "192.168.0.101",
        contentBase: path.join(__dirname, 'src/main/resources/static/'),
        port: 9090,
    }
};