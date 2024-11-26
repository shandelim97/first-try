const path = require('path')

module.exports = {
    target: 'node',
    mode: 'production',
    entry: './index.ts',

    // // https://stackoverflow.com/questions/41692643/webpack-and-express-critical-dependencies-warning
    // externals: {
    //     express: "require('express')"
    // },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}
