import * as common from './common.js'
import * as logOutput from './logoutput.js'

export class ConsoleOutput extends logOutput.LogOutput {
	public log(
		level: common.Level,
		name: string,
		message: string,
		...extra: Array<any>
	): void {
		console[level == common.Level.ERROR ? 'error' : 'log'](
			this.genLogLine(level, name, message),
			JSON.stringify(extra)
		);
	}

	protected genLogLine(
		level: common.Level,
		name: string,
		message: string
	): string {
		return (
			`${new Date().toISOString()} - ${name} - [${common.levelToString(level).padEnd(7)}]: ${message} `
		);
	}
}
