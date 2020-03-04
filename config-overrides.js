const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
  'default-src': "'none'",
  'base-uri': "'self'",
  'frame-src': "'none'",
  'img-src ': "'self' data:;",
  'font-src': "'self' data:;",
  'manifest-src': "'self'",
  'object-src': "'none'",
  'connect-src': 'https://explorata.io/service-worker.js',
  'script-src': ["'self'"],
  'style-src': ["'self'"]
};
function addCspHtmlWebpackPlugin(config) {
  if(process.env.NODE_ENV === 'production') {
      config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));
  }

  return config;
}
module.exports = override(
  addCspHtmlWebpackPlugin,
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#8F00FF',
      '@link-color': '#8F00FF',
      '@font-size-base': '18px'
    },
  }),
);