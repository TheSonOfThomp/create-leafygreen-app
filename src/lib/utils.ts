import chalk from 'chalk';

export function logWarning(data: any) {
  console.warn(' ' + chalk.yellowBright(data.toString()));
}
