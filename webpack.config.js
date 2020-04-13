const path = require("path");

module.exports = {
    mode: "development",
    devtool: "source-map",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "main-bundle.js"
    },
    devServer: {
        historyApiFallback: true,
        contentBase: "./dist",
        compress: true,
        port: 8000,
        allowedHosts: [
            "localhost:9000"
        ]
    },
    entry: path.join(__dirname, "src", "main", "resources", "static", "js", "main.jsx"),
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, "src", "main", "resources", "static", "js"),
            path.join(__dirname, "node_modules")
        ]
    },
};
