import * as log from './index.js';

declare var process: {
  env: {
      LOG_LEVEL: string,
      ENV: string,
  }
};

let logLevel = 'info';
// process.env.LOG_LEVEL = 'error'
if (!process.env.LOG_LEVEL) {
    log.warning('Log level is not defined, using default value \'info\'.');
} else {
    logLevel = process.env.LOG_LEVEL;
}

log.initEnv('log-test', undefined, true, true);
// log.initEnv('log-test', undefined, true, ['dev'], '/log-config/level');

log.debug(`Testing logger debug`);
log.info(`Testing logger info ${ JSON.stringify({logLevel: logLevel, LOG_LEVEL: process.env.LOG_LEVEL})}`);
log.warning(`Testing logger warning`);
log.error(`Testing logger error`);
log.fatal(`Testing logger fatal`);
log.access(`Testing logger access`);