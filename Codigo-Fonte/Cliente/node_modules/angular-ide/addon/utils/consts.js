'use strict';

const NGEventType = {
  BUILD_ERROR: 'build-error',
  NG_SERVER_STATUS: 'ng-server-status',
  BUILD_STATUS: 'build-status',
};

const BuildStatus = {
  NOT_READY: 'not-ready',
  BUILD_STARTED: 'build-started',
  BUILD_FINISHED: 'build-finished',
};

const NGServerStatus = {
  STARTING: 'starting',
  RUNNING: 'running',
};

module.exports.NGEventType = NGEventType;
module.exports.BuildStatus = BuildStatus;
module.exports.NGServerStatus = NGServerStatus;
