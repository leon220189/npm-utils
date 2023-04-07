import fs from 'fs';

import * as common from './common.js';
import * as logOutput from './logoutput.js';

export class ConsoleOutput extends logOutput.LogOutput {
  public log(
    level: common.Level,
    name: string,
    message: string,
    record: boolean,
    filePath: string,
    ...extra: Array<any>
  ): void {
    console[level == common.Level.ERROR ? 'error' : 'log'](
      this.genLogLine(level, name, message),
      JSON.stringify(extra),
    );
    if (record && filePath) {
      this.recordLogsTofile(level, name, message, filePath);
    }
  }

  protected genLogLine(
    level: common.Level,
    name: string,
    message: string,
  ): string {
    return `${new Date().toISOString()} - ${name} - [${common
      .levelToString(level)
      .padEnd(7)}]: ${message} `;
  }

  private recordLogsTofile(
    level: common.Level,
    name: string,
    message: string,
    filePath: string,
  ) {
    try {
      const log = `${this.genLogLine(level, name, message)}\n`;
      const levelName: any = common.levelToString(level);
      const path = filePath + `/${levelName}`;

      if (fs.existsSync(path)) {
        fs.appendFileSync(path, log);
      } else {
        console.log('path not found');
        return;
      }
    } catch (err) {
      return;
    }
  }
}
