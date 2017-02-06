const path = require('path');

module.exports = {
    entry: {
        characters: "./src/characters.jsx",
        equips: "./src/equips.jsx",
        materials: "./src/materials.jsx",
    },
    output: {
        path: "bundles",
        filename: "[name]-bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js.?/,
                loader: "babel",
                include: path.join(__dirname, "src"),
            }
        ]
    }
};