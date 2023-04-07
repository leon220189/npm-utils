import * as common from './common.js';
import * as logOutput from './logoutput.js';

export class Logger {
  protected static instance: Logger;

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  protected level: common.Level;
  protected name: string;
  protected outputs: Array<logOutput.LogOutput>;
  protected extras: Array<any>;
  public record: boolean = false;
  public filePath: string = '';

  protected constructor() {
    this.name = 'unknown';
    this.level = common.Level.INFO;
    this.outputs = new Array<logOutput.LogOutput>();
    this.extras = [];
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public getLevel(): common.Level {
    return this.level;
  }

  public setLevel(level: common.Level): void {
    this.level = level;
  }

  public setExtras(extras: Array<any>): void {
    this.extras = extras;
  }

  public addOutput(output: logOutput.LogOutput): void {
    this.outputs.push(output);
  }

  public log(level: common.Level, message: string, ...extra: Array<any>): void {
    if (level < this.level) {
      return;
    }
  
    for (const output of this.outputs) {
      extra.push({ timestamp: new Date().toISOString() });
      output.log(level, this.name, message, this.record, this.filePath, this.extras.concat(...extra));
    }
  }
}
