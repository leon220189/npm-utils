import fs from 'fs';
import path from 'path';

import * as common from './common.js';
import * as logger from './logger.js';
import * as consoleOutput from './consoleoutput.js';

const AWS_REGION: string | undefined = process.env.AWS_REGION ? process.env.AWS_REGION : 'dev';

export const getFilePath = function (file: string): string | undefined {
	return path.join('/log-config/', file);
};

export const readFile = function (file: string, def: string): string {
	try {
		const filePath: string | undefined = getFilePath(file);

		if (filePath === undefined) {
			console.error("File path is undefined");
			return def;
		}
		return fs.readFileSync(filePath).toString();
	} catch (error) {
		console.warn(`Error reading file path '${file}'. ${error}. Returning default value '${def}'`);
		return def;
	}
};

export const initEnv = function (componentName: string, level?: string, console?: boolean, extras?: Array<any>) : void {
	logger.Logger.getInstance().setName(componentName);

	logger.Logger.getInstance().setLevel(
		common.stringToLevel(level ? level : readFile('level', 'info'))
	);

	if(!extras){
		extras = [];
	}
	if(AWS_REGION){
		extras.push({AWS_REGION});
	}
	logger.Logger.getInstance().setExtras(extras);

	if (console || readFile('console', 'false') === 'true') {
		logger.Logger.getInstance().addOutput(new consoleOutput.ConsoleOutput());
	}

	if (!level) {
		const levelFilePath: string | undefined = getFilePath('level');

		if (levelFilePath === undefined) {
			return;
		}

		fs.watchFile(
			levelFilePath,
			{
				persistent: false,
				interval: 10000
			},
			() => {
				const oldLevel = logger.Logger.getInstance().getLevel();
				const newLevel = common.stringToLevel(readFile('level', 'info'));

				logger.Logger.getInstance().log(
					common.Level.INFO,
					`Changing log level from ${common.levelToString(
						oldLevel
					)} to ${common.levelToString(newLevel)}`
				);

				logger.Logger.getInstance().setLevel(newLevel);
			}
		);
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