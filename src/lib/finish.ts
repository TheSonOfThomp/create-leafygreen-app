import chalk from 'chalk';

export function finish() {
  console.log(chalk.bold('🥬 Done'));
  process.exit(0);
}
