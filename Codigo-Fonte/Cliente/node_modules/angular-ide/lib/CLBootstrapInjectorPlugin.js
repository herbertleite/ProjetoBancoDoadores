const CLEnablementStatusManager = require('./CLEnablementStatusManager').CLEnablementStatusManager;

function CLBootstrapInjectorPlugin(options) {
  this.options = options;
}

CLBootstrapInjectorPlugin.prototype.apply = function(compiler) {
  const options = this.options;
  
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      if (CLEnablementStatusManager.getStatus()) {
        htmlPluginData.html = htmlPluginData.html.replace('</body>', `<script>window._CLPort = ${options.port};</script><script src="http://${options.host}:${options.port}/ngcl/ngcl-assets/bundle.js"></script></body>`);
      }

      callback(null, htmlPluginData);
    });
  });
};

module.exports = CLBootstrapInjectorPlugin;