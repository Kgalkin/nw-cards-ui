const path = require('path');

module.exports = {
    entry: './src/main/js/app.js',
    output: {
        path: path.join(__dirname, 'src/main/resources/static'),
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
       //host: "192.168.0.104",
        contentBase: path.join(__dirname, 'src/main/resources/static/')
    }
};