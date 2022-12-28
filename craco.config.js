const sassResourcesLoader = require('craco-sass-resources-loader');

const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: ['./src/assets/styles/main.scss'],
      },
    },
  ],
};
