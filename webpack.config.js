var path = require('path');

module.exports = {
    entry: {
        client: './client.js',
        server: './server.js'
    },
    output: {
        filename: '../../[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ],
    },
    resolve: {
        // Allow require('./blah') to require blah.jsx
        extensions: ['.js', '.jsx']
    },
};