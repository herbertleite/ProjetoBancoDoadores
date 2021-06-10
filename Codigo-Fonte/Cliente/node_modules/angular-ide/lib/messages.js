const Messages = {
  INSTALL_COMMAND_DESCRIPTION: 'Installs Angular IDE in the specified path.',
  OPEN_COMMAND_DESCRIPTION: 'Open or connect to the Angular IDE and open the given file, importing the containing project if needed.',
  UPDATE_COMMAND_DESCRIPTION: 'Updates the Angular CLI project to 4.',
  NO_INSTALLATIONS_DETECTED: 'No installs found of the Angular IDE. Use "ngide install" or https://www.genuitec.com/products/angular-ide/.',
  NOT_ANGULAR_PROJECT: 'No angular-cli project found in the current directory or parents.',
  INSTALLING_ANGULAR: 'Installing Angular IDE in:',
  INSTALL_REQUIRES_PATH: 'ngide install requires a path argument.',
  OPEN_REQUIRES_PATH: 'ngide open requires a valid file path argument.',
  OPENING_ANGULAR_IDE: 'Opening the Angular IDE for:',
  STARTING_ANGULAR_IDE: 'Starting Angular IDE...',
  ANGULAR_IDE_NOT_STARTED: 'The Angular IDE did not start correctly.',
  ANGULAR_IDE_HAS_BEEN_INSTALLED: 'The Angular IDE has been installed.',
  ANGULAR_IDE_DOWNLOAD_NOT_AVAILABLE: 'The Angular IDE is not available,',
  VALIDATING_PROJECT: 'Validating project in workspace…',
  NODE_VERSION_REQUIRED_ERROR: 'The angular-ide is not compatible with the current version of node.\nTo continue, first upgrade to node',
};

module.exports = Messages;
