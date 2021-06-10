'use strict';

var path 	= require('path');
var os 		= require('os');

/* 
	workaround for a misbehaviour encountered in node v0.11.12 on the windows platform
	Discussion at: https://github.com/joyent/node/issues/7031

 */

function applyPathPatch() {

	if (path.resolve.IS_PATCHED) {
		return;
	}

	if (!os.platform().match(/^win/)) {
		// not needed for other platforms
		return;
	}

	var old = path.resolve;

	path.resolve = function pathResolvePath() {
		// execute original function
		var result = old.apply(path, arguments);

		// lowercase the drive letter
		result = result[0].toUpperCase() + result.substr(1);	
		return result;
	};

	path.resolve.IS_PATCHED = true;
}

module.exports = applyPathPatch;