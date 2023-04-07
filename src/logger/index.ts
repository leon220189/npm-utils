import fs from 'fs';
import path from 'path';

import * as common from './common.js';
import * as logger from './logger.js';
import * as consoleOutput from './consoleoutput.js';

const AWS_REGION: string | undefined = process.env.AWS_REGION;

export class LogsUtils {
  constructor() {}

  initEnv(
    componentName: string,
    level?: string,
    console?: boolean,
    record?: boolean,
    extras?: Array<any>,
  ): void {
    logger.Logger.getInstance().setName(componentName);

    logger.Logger.getInstance().setLevel(
      common.stringToLevel(level ? level : 'info'),
    );

    if (!extras) {
      extras = [];
    }
    if (AWS_REGION) {
      extras.push({ AWS_REGION });
    }
    logger.Logger.getInstance().setExtras(extras);

    if (console) {
      logger.Logger.getInstance().addOutput(new consoleOutput.ConsoleOutput());
    }

    if (record) {
      const levelFilePath: string = this.getFilePath('level');
      this.checkFilePath(
        levelFilePath,
        common.stringToLevel(level ? level : 'info'),
      );
      logger.Logger.getInstance().record = true;
      logger.Logger.getInstance().filePath = levelFilePath;
    }
  }

  dump(message: string, ...extra: Array<any>): void {
    logger.Logger.getInstance().log(common.Level.DUMP, message, ...extra);
  }

  debug(message: string, ...extra: Array<any>): void {
    logger.Logger.getInstance().log(common.Level.DEBUG, message, ...extra);
  }

  info(message: string, ...extra: Array<any>): void {
    logger.Logger.getInstance().log(common.Level.INFO, message, ...extra);
  }

  warning(message: string, ...extra: Array<any>): void {
    logger.Logger.getInstance().log(common.Level.WARNING, message, ...extra);
  }

  error(message: string, ...extra: Array<any>): void {
    logger.Logger.getInstance().log(common.Level.ERROR, message, ...extra);
  }

  fatal(message: string, ...extra: Array<any>): void {
    logger.Logger.getInstance().log(common.Level.FATAL, message, ...extra);
  }

  access(message: string, ...extra: Array<any>): void {
    logger.Logger.getInstance().log(common.Level.ACCESS, message, ...extra);
  }

  getFilePath (file: string): string {
    const __dirname = process.cwd(); // get current location project
    const date = new Date().toJSON().slice(0, 10);
    return path.join(__dirname + '/log-config/', date, file);
  };
  
  checkFilePath (levelFilePath: string, level: number) {
    const arrayLogLevel = common.fetchStringByLevel(level);
  
    // create path
    if (!fs.existsSync(levelFilePath)) {
      fs.mkdirSync(levelFilePath, { recursive: true });
      // create files
      for (let i = 0; i < arrayLogLevel.length; i++) {
        fs.writeFileSync(levelFilePath + `/${arrayLogLevel[i]}`, '');
      }
    }
  };
}
