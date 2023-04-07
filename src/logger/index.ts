import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import * as common from './common.js';
import * as logger from './logger.js';
import * as consoleOutput from './consoleoutput.js';

const AWS_REGION: string | undefined = process.env.AWS_REGION;

export const getFilePath = function (file: string): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const date = new Date().toJSON().slice(0, 10);
  return path.join(__dirname + '/log-config/', date, file);
};

export const checkFilePath = function (levelFilePath: string, level: number) {
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

export const initEnv = function (
  componentName: string,
  level?: string,
  console?: boolean,
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

  if (true) {
    const levelFilePath: string = getFilePath('level');
    checkFilePath(levelFilePath, common.stringToLevel(level ? level : 'info'));
    logger.Logger.getInstance().record = true;
    logger.Logger.getInstance().filePath = levelFilePath;
  }
};

export const dump = function (message: string, ...extra: Array<any>): void {
  logger.Logger.getInstance().log(common.Level.DUMP, message, ...extra);
};

export const debug = function (message: string, ...extra: Array<any>): void {
  logger.Logger.getInstance().log(common.Level.DEBUG, message, ...extra);
};

export const info = function (message: string, ...extra: Array<any>): void {
  logger.Logger.getInstance().log(common.Level.INFO, message, ...extra);
};

export const warning = function (message: string, ...extra: Array<any>): void {
  logger.Logger.getInstance().log(common.Level.WARNING, message, ...extra);
};

export const error = function (message: string, ...extra: Array<any>): void {
  logger.Logger.getInstance().log(common.Level.ERROR, message, ...extra);
};

export const fatal = function (message: string, ...extra: Array<any>): void {
  logger.Logger.getInstance().log(common.Level.FATAL, message, ...extra);
};

export const access = function (message: string, ...extra: Array<any>): void {
  logger.Logger.getInstance().log(common.Level.ACCESS, message, ...extra);
};

export { Level } from './common.js';

export const getCurrentLevel = function (): common.Level {
  return logger.Logger.getInstance().getLevel();
};
