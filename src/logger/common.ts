export enum Level {
  DUMP,
  DEBUG,
  INFO,
  WARNING,
  ERROR,
  FATAL,
  ACCESS,
}

export const levelToString = function (level: Level): string {
  switch (level) {
    case Level.DUMP:
      return 'DUMP';
    case Level.DEBUG:
      return 'DEBUG';
    case Level.INFO:
      return 'INFO';
    case Level.WARNING:
      return 'WARNING';
    case Level.ERROR:
      return 'ERROR';
    case Level.FATAL:
      return 'FATAL';
    case Level.ACCESS:
      return 'ACCESS';
  }
};

export const stringToLevel = function (level: string | undefined): Level {
  if (!level) {
    return Level.INFO;
  }

  switch (level.toLowerCase().trim()) {
    case 'dump':
      return Level.DUMP;
    case 'debug':
      return Level.DEBUG;
    case 'info':
      return Level.INFO;
    case 'warning':
      return Level.WARNING;
    case 'error':
      return Level.ERROR;
    case 'fatal':
      return Level.FATAL;
    case 'access':
      return Level.ACCESS;
  }

  return Level.INFO;
};

export const fetchStringByLevel = function (level: number): (string | Level)[] {
  return Object.values(Level).filter((v) => isNaN(Number(v))).slice(level);
}
