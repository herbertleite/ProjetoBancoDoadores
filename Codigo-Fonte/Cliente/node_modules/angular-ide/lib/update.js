const path = require('path');
const jju = require('jju');
const chalk = require('chalk');
const Q = require('q');
const winston = require('winston');
const fs = require('fs-extra');
const moment = require('moment');
const slashes = require('slashes');

function updatePackage(updateOptions) {
  const date = moment().format('YYYYMMDD');
  const packageBackupFilename = `package.json.ng-update.${date}.bak`;

  try {
    fs.copySync(path.resolve('package.json'), packageBackupFilename);    
  } catch (e) {
    winston.error('[package.json] Error while backing up package.json');
    throw e;
  }

  const packageContent = fs.readFileSync(path.resolve('package.json')).toString('utf8');
  const parsedJSON = jju.parse(packageContent, { mode: 'json' });
  
  //update dependencies
  depsUpdates = {  
    '@angular/*': '^4.0.0',
    'rxjs': '^5.1.0',
    'zone.js': '^0.8.4',
    'ts-helpers': null,
  }

  const depsV4Filter = [
    '@angular/animations',
    '@angular/common',
    '@angular/compiler',
    '@angular/compiler-cli',
    '@angular/core',
    '@angular/forms',
    '@angular/http',
    '@angular/language-service',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/platform-server',
    '@angular/platform-webworker',
    '@angular/platform-webworker-dynamic',
    '@angular/router',
    '@angular/tsc-wrapped',
    '@angular/upgrade',
  ];

  devDepsUpdate = {
    '@angular/*' : "^4.0.0",
    '@angular/compiler-cli' : "^4.0.0",
    '@angular/cli' : "1.0.0",
    'angular-cli': null,
    "@types/jasmine": "2.5.38",
    "@types/node": "~6.0.60",
    "codelyzer": "~2.0.0",
    "jasmine-core": "~2.5.2",
    "jasmine-spec-reporter": "~3.2.0",
    "karma": "~1.4.1",
    "karma-chrome-launcher": "~2.0.0",
    "karma-cli": "~1.0.1",
    "karma-jasmine": "~1.1.0",
    "karma-jasmine-html-reporter": "^0.2.2",
    "karma-coverage-istanbul-reporter": "^0.2.0",
    "protractor": "~5.1.0",
    "ts-node": "~2.0.0",
    "tslint": "~4.5.0",
    "typescript": "~2.2.0",
    'karma-remap-istanbul': null,
  }
  
  touchedDeps = new Set();
  
  updateDeps(parsedJSON, devDepsUpdate, "peerDependencies", false);
  updateDeps(parsedJSON, depsUpdates, "peerDependencies", false);
  
  updateDeps(parsedJSON, depsUpdates, "dependencies", true);
  updateDeps(parsedJSON, devDepsUpdate, "devDependencies", true);
  
  function updateDeps(parsedJSON, toUpdate, name, add) {
    if (typeof parsedJSON[name] !== 'undefined') {
      var curDeps = parsedJSON[name];
      Object.keys(toUpdate).forEach(function(dep) {
        if (toUpdate[dep]) {
          var newVersion = toUpdate[dep];
          if (dep.endsWith("*")) {
            var toMatch = dep.substring(0, dep.length - 1);
            Object.keys(curDeps).forEach((curDep) => {
              if (curDep.match('@angular/') && depsV4Filter.indexOf(curDep) !== -1 && !toUpdate.hasOwnProperty(curDep)) {
                const currentVersion = curDeps[curDep];
                if (currentVersion !== newVersion) {
                  winston.info(`[package.json] [${name}] Updating ${curDep}@${currentVersion} => ${newVersion}`);
                  curDeps[curDep] = newVersion;
                  touchedDeps.add(curDep);
                }
              }
            });
          } else {
              const currentVersion = curDeps[dep];
              if (currentVersion !== newVersion) {
                if (currentVersion == undefined) {
                  if (add && !touchedDeps.has(dep)) {
                    winston.info(`[package.json] [${name}] Adding ${dep}@${newVersion}`);
                    curDeps[dep] = newVersion;
                    touchedDeps.add(dep);
                  }
                } else {
                  winston.info(`[package.json] [${name}] Updating ${dep}@${currentVersion} => ${newVersion}`);
                  curDeps[dep] = newVersion;
                  touchedDeps.add(dep);
                }
              }
          }
        } else if (curDeps[dep]) {
          delete curDeps[dep];
          touchedDeps.add(dep);
          winston.info(`[package.json] [${name}] Removing ${dep}@${curDeps[dep]}`);
        }
      });
    } else {
      winston.info(`[package.json] [${name}] Doesn't exists, doing nothing`);
    }
  }
  
  //update scripts
  if (parsedJSON.scripts) {
    const scripts = parsedJSON.scripts; 
    if (scripts["lint"] === "tslint \"src/**/*.ts\" --project src/tsconfig.json --type-check && tslint \"e2e/**/*.ts\" --project e2e/tsconfig.json --type-check") {
          winston.info(`[package.json] [scripts] Updating lint to "ng lint"`);
          scripts["lint"] = "ng lint";
    }
    if (scripts["e2e"] === "protractor") {
      winston.info(`[package.json] [scripts] Updating e2e to "ng e2e"`)
      scripts["e2e"] = "ng e2e";

      winston.info(`[package.json] [scripts] Deleting pree2e`)
      delete scripts["pree2e"];
    }
    if (!scripts["build"]) {
      winston.info(`[package.json] [scripts] Adding build with "ng build"`);
      scripts["build"] = "ng build";
    }
  }
  
  const finalPackageContent = jju.update(packageContent, parsedJSON, { mode: 'json' });

  if (!updateOptions.dryRun) {
    fs.writeFileSync(path.resolve('package.json'), finalPackageContent);
  } else {
    winston.info('[package.json]', finalPackageContent);
  }
}


function updateTSLint(updateOptions, angularCliJSONPath) {
  const date = moment().format('YYYYMMDD');
  const tsLintBackupFilename = `tslint.json.ng-update.${date}.bak`;

  try {
    fs.copySync(path.resolve('tslint.json'), tsLintBackupFilename);    
  } catch (e) {
    winston.error('[tslint.json] Error while backing up tslint.json');
    throw e;
  }

  const tsLintConfigPath = path.resolve('tslint.json');
  const tslintContent = fs.readFileSync(tsLintConfigPath).toString('utf8');
  const tslintParsed = jju.parse(tslintContent, {
    mode : 'json'
  });

  const angularCliContent = fs.readFileSync(angularCliJSONPath);
  const angularCliJSON = jju.parse(angularCliContent);

  const componentPrefix = angularCliJSON.apps[0].prefix;

  const rulesUpdate = {
    'no-duplicate-key' : null,
    'no-unreachable' : null,
    'label-undefined' : null,
    'directive-selector-prefix' : null,
    'directive-selector-name' : null,
    'directive-selector-type' : null,
    'component-selector-type' : null,
    'component-selector-prefix' : null,
    'component-selector-name' : null,
    'callable-types' : true,
    'import-blacklist' : [ true, 'rxjs' ],
    'import-spacing' : true,
    'interface-over-type-literal' : true,
    'no-empty-interface' : true,
    'no-string-throw' : true,
    'prefer-const' : true,
    'typeof-compare' : true,
    'unified-signatures' : true,
    'directive-selector' : [ true, 'attribute', componentPrefix, 'camelCase' ],
    'component-selector' : [ true, 'element', componentPrefix, 'kebab-case' ],
    "no-access-missing-member": true,
    "templates-use-public": true,
    "invoke-injectable": true
  };

  Object.keys(rulesUpdate).forEach((key) => {
    if (rulesUpdate[key]) {
      if (typeof tslintParsed.rules[key] === 'undefined') {
        winston.info(`[TSLint] [rules] Adding "${key}"`);
        tslintParsed.rules[key] = rulesUpdate[key];
      }
    } else if (tslintParsed.rules[key]) {
      winston.info(`[TSLint] [rules] Removing "${key}"`);
      delete tslintParsed.rules[key];
    }
  });

  const finalTSLintContent = jju.update(tslintContent, tslintParsed, {
    mode : 'json'
  });

  if (!updateOptions.dryRun) {
    return Q.nfcall(fs.writeFile, tsLintConfigPath, finalTSLintContent);
  } else {
    winston.info(finalTSLintContent);
  }
}

function writeUpdateReference(referenceFilePath) {
  const referenceFileContent = `

# Upgrading to Angular 4
Congratulations! You are well on your way to having this project updated to use Angular 4. Angular IDE helps get you a lot of the way there, though check out the steps below for other notes that may be important for you to follow.

## Tasks Completed
Tasks below have been performed during the upgrade. In some cases, tasks may have been skipped if already ready for Angular 4.
1. Update package.json to use Angular 4 modules
2. Download dependences of packages via npm
3. Use @angular/cli instead of the earlier angular-cli
4. Rename angular-cli.json to .angular-cli.json
5. Add $schema property to .angular-cli.json
6. Update polyfills, envronments & linting configuraton
7. Update tslint.json with new rules
8. Update lifecycle methods such as OnInit to be implements
9. Change \`\`<template>\`\` to \`\`<ng-template>\`\` in template files

## Tasks Remaining
Tasks below can be completed though not all are required. More details can be found online at:
https://github.com/angular/angular-cli/wiki/stories-1.0-update

### a. Update Generator Defaults in .angular-cli.json
You can now list the flags as they appear on the generator command:

	"defaults": {
	  "styleExt": "css",
	  "component": {
	    "inlineTemplate": false,
	    "spec": true
	  }
	}

See more here https://github.com/angular/angular-cli/wiki/generate-component

### b. Switch to one tsconfig.json per application
Optionally, split the tsconfigs into multiple files:

* src/tsconfig.app.json: configuration for the Angular app.
* src/tsconfig.spec.json: configuration for the unit tests. Defaults to the Angular app config.
* e2e/tsconfig.e2e.json: configuration for the e2e tests.

There is an additional root-level tsconfig.json that is used for editor integration.

See more here https://github.com/angular/angular-cli/wiki/stories-1.0-update#one-tsconfig-per-app

### c. Update karma.conf.js
This files needs to get updated to use the new Angular CLI package name (@angular/cli) plus some
minor changes on the reporters config.

See more here https://github.com/angular/angular-cli/wiki/stories-1.0-update#karmaconfjs

### d. Update protractor.conf.js
To make Protractor to play well with the changes, protractor.conf.js needs to get updated to use
the new tsconfigs described in _Switch to one tsconfig.json per application_.

See more here https://github.com/angular/angular-cli/wiki/stories-1.0-update#protractorconfjs
...

`;

  winston.info('[update-reference] Writing update reference file');
  return Q.nfcall(fs.writeFile, referenceFilePath, referenceFileContent);
}

function updateAngularCLIConfig(updateOptions, angularCliJSONPath) {
  const date = moment().format('YYYYMMDD');
  const angularCliBackupFilename = `.angular-cli.json.ng-update.${date}.bak`;

  try {
    fs.copySync(path.resolve('.angular-cli.json'), angularCliBackupFilename);    
  } catch (e) {
    winston.error('[.angular-cli.json] Error while backing up .angular-cli.json');
    throw e;
  }

  const angularCliContent = fs.readFileSync(angularCliJSONPath).toString();
  const angularCliJSON = jju.parse(angularCliContent);

  if (!angularCliJSON['$schema']) {
    winston.debug(`[.angular-cli.json] Adding $schema`);
    angularCliJSON['$schema'] = './node_modules/@angular/cli/lib/config/schema.json';
  }

  if (angularCliJSON.apps[0]) {
    const app = angularCliJSON.apps[0];
    if (app.environmentSource === undefined) {
      winston.debug(`[.angular-cli.json] [apps[0]] Adding "environmentSource"`);
      app.environmentSource = 'environments/environment.ts';
  
      winston.debug(`[.angular-cli.json] [apps[0]] Removing deprecated "environments.source"`);
      delete app.environments.source;
    }
  
    if (app.polyfills === undefined) {
      winston.debug(`[.angular-cli.json] [apps[0]] Adding "polyfills"`);
      app.polyfills = 'polyfills.ts';
    }
    
    if (app.mobile !== undefined) {
      winston.debug(`[.angular-cli.json] [apps[0]] Removing deprecated "mobile" entry`);
      delete app.mobile;
    }
  }
  if (angularCliJSON.addons !== undefined) {
    winston.debug(`[.angular-cli.json] Removing deprecated "addons" object.`);
    delete angularCliJSON.addons;
  }
  
  if (angularCliJSON.packages !== undefined) {
    winston.debug(`[.angular-cli.json] Removing deprecated "packages" object.`);
    delete angularCliJSON.packages;
  }
  
  if (angularCliJSON.project && angularCliJSON.project.version) {
    winston.debug(`[.angular-cli.json] [project] Removing deprecated "version" specification.`);
    delete angularCliJSON.project.version;
  }
  
  if (angularCliJSON.lint === undefined) {
    var lint = angularCliJSON.lint = [];

    if (!(tryAdding('src/tsconfig.app.json') || tryAdding('src/tsconfig.spec.json'))) {
        // Try to support legacy location of a config file
      tryAdding('src/tsconfig.json');
    }
    
    if (!tryAdding('e2e/tsconfig.e2e.json')) {
        // Try to support legacy location of a config file
      tryAdding('e2e/tsconfig.json');
    }
    
    function tryAdding(name) {
      try {
        fs.statSync(path.resolve(name));
        lint.push({ project: name});
        winston.debug(`[.angular-cli.json] [lint] Adding linting configuration for ${name}`);
        return true;
      } catch (e) {
      return false;
      }
    }
  }

  const finalAngularCLIConfig = jju.update(angularCliContent, angularCliJSON, { mode: 'json' });
  if (!updateOptions.dryRun) {
    return Q.nfcall(fs.writeFile, angularCliJSONPath, finalAngularCLIConfig);
  } else {
    winston.info(finalAngularCLIConfig);
  }
}

module.exports = function update(updateOptions) {
    let logFilePath = updateOptions.logFile ? updateOptions.logFile : 'angular-cli-update.log';
    if (process.platform === 'win32') {
      logFilePath = slashes.add(logFilePath);
    }

    logFilePath = path.resolve(logFilePath);

    const logStream = fs.createWriteStream(logFilePath, { flags: 'w' });
    winston.add(winston.transports.File, { stream: logStream, json: false });

    let updateReferenceFilePath = updateOptions.updateReferenceFile ? updateOptions.updateReferenceFile : 'angular-cli-update.md';
    if (process.platform === 'win32') {
      updateReferenceFilePath = slashes.add(updateReferenceFilePath);
    }

    updateReferenceFilePath = path.resolve(updateReferenceFilePath);

    const filesNeededForUpdate = [ 'tslint.json', 'package.json' ];

    const filesNeededPromises = filesNeededForUpdate.map((file) => {
      const filePath = path.resolve(file);
      return Q.Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK, (fileExistanceError) => {
          if (fileExistanceError) {
            reject(`[update] File doesn't exists ${file}`);
          } else {
            resolve(file);
          }
        });
      });
    });

    const angularCliJSONPath = path.resolve('.angular-cli.json');
    const oldAngularCliJSONPath = path.resolve('angular-cli.json');

    Q.all(filesNeededPromises)
    .then(() => {
      // Renaming angular-cli.json if needed      
      return Q.Promise((resolve, reject) => {
        fs.access(angularCliJSONPath, fs.constants.R_OK | fs.constants.W_OK, (angularCliExistanceError) => {
          if (angularCliExistanceError) {
            fs.access(oldAngularCliJSONPath, fs.constants.R_OK | fs.constants.W_OK, (oldAngularCliExistanceError) => {
              if (!oldAngularCliExistanceError) {
                fs.renameSync(oldAngularCliJSONPath, angularCliJSONPath);
                winston.info('[.angular-cli.json] Renaming angular-cli.json to .angular-cli.json');
                resolve();
              } else {
                reject('[.angular-cli.json] No angular-cli.json found!');
              }
            });
          } else {
            resolve();
          }
        });
      });
    })
    .then(() => {
      try {
        updatePackage(updateOptions);
      } catch (e) {
        winston.error(chalk.red('Error when trying to update package.json'));
        throw e;
      }
    })
    .then(() => {
        return updateAngularCLIConfig(updateOptions, angularCliJSONPath);
    })
    .then(() => {
      return updateTSLint(updateOptions, angularCliJSONPath);
    })
    .then(() => {
      return writeUpdateReference(updateReferenceFilePath);
    })
    .catch((e) => {
      winston.error(chalk.red(e));
      logStream.end();
      process.exit(-1)
    })
    .fin(() => {
        logStream.end();

      process.exit();
    });  
};
