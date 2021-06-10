/* jshint node: true */
/* global config */
'use strict';

const getNGCLIManifest = require('./lib/CLUtils').getNGCLIManifest;
const getNGCLIPath = require('./lib/CLUtils').getNGCLIPath;
const ngCLIPKG = getNGCLIManifest();

const ngCLIPKGName = ngCLIPKG.name;
const ngCLIPath = getNGCLIPath(ngCLIPKGName);

const Serve = require('./addon/commands/serve');

const angularCliAddon = require(`${ngCLIPath}/addon/index.js`);

const origIncludedCommands = angularCliAddon.includedCommands;

angularCliAddon.includedCommands = function() {
  var superCommands = origIncludedCommands();
  superCommands.serve = Serve;
  // Inject if the init commmand if not included
  if (!superCommands.init) {
    try {
      superCommands.init = require('../@angular/cli/commands/init').default;
    } catch (e) {
      console.log('[angular-ide] Error when registering "init" command');
    };
  }

  return superCommands;
}

module.exports = angularCliAddon;
module.exports.overrideCore = true;
