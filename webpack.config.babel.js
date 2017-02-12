module.exports = {
  output: {
    publicPath: "./public/js/",
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
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.css$/,
        loader: "css-loader",
      }
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
