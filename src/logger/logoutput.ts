import * as common from './common.js'

export abstract class LogOutput {
	public abstract log(
		level: common.Level,
		name: string,
		message: string,
		...extra: Array<any>
	): void;
}
