import chalk from 'chalk';
import { Command } from 'commander';
import gradient from 'gradient-string';

import { checkAppName } from './checkAppName';
import { createNextApp } from './createNextApp';
import { createReactApp } from './createReactApp';
import { finish } from './finish';
import { installLeafyGreen } from './installLeafyGreen';
// eslint-disable-next-line functional/no-let
let projectName: string;

const lg = `
 _             __                                             _ 
| |           / _|                                           (_)
| | ___  __ _| |_ _   _  __ _ _ __ ___  ___ _ __ ______ _   _ _ 
| |/ _ \\/ _\` |  _| | | |/ _\` | '__/ _ \\/ _ \\ '_ \\______| | | | |
| |  __/ (_| | | | |_| | (_| | | |  __/  __/ | | |     | |_| | |
|_|\\___|\\__,_|_|  \\__, |\\__, |_|  \\___|\\___|_| |_|      \\__,_|_|
                   __/ | __/ |                                  
                  |___/ |___/                                   
`;

export function init() {
  const program = new Command(`create-leafygreen-app`)
    // .version(packageJson.version)
    .arguments('[project-directory]')
    .option('--next', 'Build a Next app. Defaults to React app', false)
    .option('-p, --packages-only', 'Install leafygreen packages only to the current directory', false)
    .option('-v, --verbose', 'Verbose mode', false)
    .action((name) => {
      projectName = name;
    })
    .parse(process.argv);

  const options = program.opts()

  if (options.verbose) {
    console.log(options);
  }

  if (options.packagesOnly) {
    installLeafyGreen(process.cwd())
    .then(() => finish())
  } else {
    if (typeof projectName === 'undefined') {
      console.error('Please specify the project directory:');
      console.log(
        `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
      );
      console.log();
      console.log('For example:');
      console.log(
        `  ${chalk.cyan(program.name())} ${chalk.green('my-react-app')}`
      );
      process.exit(1);
    }
  
    checkAppName(projectName);
  
    console.log(gradient('lightgreen', 'green')(lg));

    if (options.next) {
      createNextApp(projectName)
      .then(() => {
        finish()
      });
    } else {
      createReactApp(projectName)
      .then(() => {
        finish()
      });
    }
  
    
  }

}
