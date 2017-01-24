module.exports = {
  output: {
    publicPath: "./docs/js/",
    filename: "script.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: "es2015",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ]
  },

  resolve: {
    extensions: ["", ".js", ".vue"],
    alias: {
      "vue": "vue/dist/vue",
      "vue-router": "vue-router/dist/vue-router",
    },
  },

};
