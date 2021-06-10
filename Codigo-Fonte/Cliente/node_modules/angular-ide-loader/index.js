const path = require('path');
const util = require('util');
const slashes = require('slashes');

const ts = require('typescript');

const getNGCLIManifest = require('angular-ide/lib/CLUtils').getNGCLIManifest;
const getNGCLIPath = require('angular-ide/lib/CLUtils').getNGCLIPath;

const ngCLIPKG = getNGCLIManifest();

const ngCLIPKGName = ngCLIPKG.name;
const ngCLIPath = getNGCLIPath(ngCLIPKGName);

const costru = 148;
const classKeyword = 73;

const CliConfig = require(`${ngCLIPath}/models/config.js`).CliConfig;

const CLEnablementStatusManager = require('angular-ide/lib/CLEnablementStatusManager').CLEnablementStatusManager;

module.exports = function (source, map) {
  if (CLEnablementStatusManager.getStatus()) {
    const sourceFile = ts.createSourceFile(path.basename(this.resourcePath), source, ts.ScriptTarget.ES6, true);
    const base = path.basename(this.resourcePath);
    const dirName = path.dirname(this.resourcePath);
    let defPos = null;
    let holaPos = null;
    let templateUrl = null;
    let styleUrls = [];

    let configPath = CliConfig.fromProject()._configPath;
    let configApp = CliConfig.fromProject()._config.apps[0];
    let indexFile = path.normalize(path.join(path.dirname(configPath),  configApp.root, configApp.index));
    /**/
    if (this.resourcePath === indexFile && this.query.host && this.query.port) {
      return source.replace('</body>', `<script>window._CLPort = ${this.query.port};</script><script src="http://${this.query.host}:${this.query.port}/ngcl/ngcl-assets/bundle.js"></script></body>`);
    }

    function extractMetadata(node) {
      if (node.kind === ts.SyntaxKind.StringLiteral) {
        //html
        if (node.text.match(/\.html$/)) {
          templateUrl = node.text;
        }
        //styles
        if (node.text.match(/\.css$/)) {
          styleUrls.push(node.text);
        }
      }
      ts.forEachChild(node, extractMetadata);
    }

    if (base.indexOf('component')) {
      let classFound = false;
      let constructorFound = false;

      explore(sourceFile);

      function explore(node) {

        switch(node.kind) {
          //Class declaration
          case ts.SyntaxKind.ClassDeclaration:
            report(node);
            break;

          //get metadata
          case ts.SyntaxKind.Decorator:
            var code = source.substring(node.pos, node.end).trim();
            if (code.match(/^@Component/)) {
              extractMetadata(node);
            }
            break;
        }

        ts.forEachChild(node, explore);

        function report(node) {
          let children = node.getChildren();
          let endPositin = null;

          children.forEach(child => {
            if (child.kind === ts.SyntaxKind.ClassKeyword) { //73
              classFound = true;
            }

            if (child.kind === ts.SyntaxKind.OpenBraceToken && classFound) { //15
              const childPosition = sourceFile.getLineAndCharacterOfPosition(child.getStart());
              defPos = child.end+1;
            }
          });
        }
      }

      if (defPos) {
        let templateUrlPath = null;
        if(templateUrl) {
          templateUrlPath = path.normalize(path.join(dirName, templateUrl));
        }

        let styleUrlsPaths = [];
        styleUrls.forEach(style => {
          let stylePath = path.normalize(path.join(dirName, style));
          styleUrlsPaths.push(stylePath);
        });

        const metadataToInject = {
            componentPath: this.resourcePath,
            styleUrls: styleUrlsPaths,
            templateUrl: templateUrlPath,
        };

        const textToInject = `__clMeta = ${JSON.stringify(metadataToInject)}`;
        source = [source.slice(0, defPos - 1), textToInject, source.slice(defPos - 1)].join('');
      }
    }

  }  
  return source;
};
