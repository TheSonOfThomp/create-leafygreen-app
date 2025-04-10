import { execSync } from 'child_process';

import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';


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

const deprecationWarning = 
`\`create-leafygreen-app\` is deprecated. 
Please create an app using a separate template generator (like \`create-next-app\`), install \`@lg-tools/cli\`, and run \`lg install\` to install the latest LeafyGreen components to the project.
`

export async function init() {
  const program = new Command(`create-leafygreen-app`)
    .parse(process.argv);

  program.parse(process.argv);

  console.log(chalk.green(lg));
  console.warn(
    chalk.yellow(deprecationWarning),
  );
  
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'installPackages',
      message: 'Would you like to install packages using `lg install` in the current directory?',
      default: true
    }
  ]);

  if (answer.installPackages) {
    console.log(chalk.blue('Running lg install...'));
    try {
      execSync('npx @lg-tools/cli install', { stdio: 'inherit' });
      console.log(chalk.green('Packages installed successfully!'));
    } catch (error) {
      console.error(chalk.red('Failed to install packages:'), error);
    }
  }
}
