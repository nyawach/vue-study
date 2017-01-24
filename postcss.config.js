module.exports = {
  plugins: [
    require('postcss-easy-import'),
    require('postcss-extend'),
    require('postcss-sassy-mixins'),
    require('postcss-nested'),
    require('postcss-advanced-variables'),
    require('postcss-assets')({
      loadPaths: [ 'images/' ],
      basePath: './docs/',
      relative: './docs/',
    }),
    require('postcss-calc'),
    require('postcss-strip-inline-comments'),
    require('css-mqpacker'),
    require('autoprefixer')({
      browsers: [
        'ie >= 10',
        'ios >= 8.0',
        'android >= 4.2'
      ]
    }),
  ],
  syntax: require('postcss-scss'),
};
