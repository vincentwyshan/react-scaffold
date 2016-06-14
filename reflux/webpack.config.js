var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: [
        './main.jsx',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: "babel?presets[]=es2015,presets[]=react"},
            {test: /\.html$/, loader: "file?name=[name].[ext]", },

            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
        ]
    }
};
