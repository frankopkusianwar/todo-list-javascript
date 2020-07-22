// It is handy to not have those transformations while we developing
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    plugins: [
      /* eslint-disable */
      require('autoprefixer'),
      require('cssnano'),
      /* eslint-enable */
      // More postCSS modules here if needed
    ],
  };
}
