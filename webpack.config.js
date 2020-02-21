const path = require('path');

module.exports = {
    entry: './src/main/js/app.js',
    output: {
        path: path.join(__dirname, 'src/main/resources/static/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};