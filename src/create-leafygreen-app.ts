import fs from 'fs-extra'
import path from 'path';
import ora from 'ora';
import { Command } from 'commander';
import chalk from 'chalk'
import gradient from 'gradient-string';
import packageJson from '../package.json';
import { checkAppName } from './checkAppName';
import { exec, execSync, spawn, spawnSync } from 'child_process';
import fetch from 'node-fetch';
import peerDependencies from './peerDependencies.json'
import ignorePackages from './package.ignore.json'
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
`

export function init() {
  const program = new Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-directory>')
    .action(name => {
      projectName = name;
    })
    .parse(process.argv);

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
    checkAppName(projectName)

    console.log(gradient('lightgreen', 'green')(lg))

    createApp(projectName);   
}

function createApp(name: string){
  if(fs.pathExistsSync(`./node_modules/.bin/create-react-app/`)) {
    const appPath = path.resolve(name);

    if (!fs.pathExistsSync(appPath)) {
      console.log(`${chalk.blue('Creating React App')}`)
      const spinner = ora({text: 'Creating React App', stream: process.stdout}).start()
      const cra = spawn(`./node_modules/.bin/create-react-app/`, [name, `--template`, `typescript`])
      cra.stdout.on('data', data => {
        spinner.text = data.toString()
      })
      cra.stderr.on('data', logWarning)
      cra.on('close', () => {
        spinner.stop()
        installLeafyGreen(appPath)
      })

    } else {
      console.error(`\n${chalk.bold('Could not create new app')}`);
      console.log(`Folder ${chalk.green(`/${name}`)} already exists\n`)
    }
  } else {
    console.error(`Could not find ${chalk.inverse('create-react-app')}`);
  }
}

function installLeafyGreen(appPath: string) {
  console.log(chalk.green('Installing Leafygreen & peer dependencies'));
  const spinner = ora('Fetching Leafygreen dependencies').start();
  const npmsUrl = "https://api.npms.io/v2/search/?q=scope:leafygreen-ui&size=250";
  fetch(npmsUrl)
    .then(data => data.json())
    .then(({results}) => {
      spinner.text = 'Installing Leafygreen packages'
      const lgPackages = results
        .filter((result: any) => !(ignorePackages as Array<string>).includes(result.package.name))
        .map((result: any) => `${result.package.name}@^${result.package.version}`)
      const peerPackages = Object.entries(peerDependencies).map(([pkg, version]) => `${pkg}@${version}`)
      const packages = [...peerPackages, ...lgPackages]
      const install = spawn(`yarn`, [`add`, ...packages], {cwd: appPath})

      install.stdout.on('data', data => {
        spinner.text = data.toString()
      })

      install.stderr.on('data', logWarning)

      install.on('close', () => {
        spinner.stop()
        updateAppFiles(appPath)
      })
    })
}

function updateAppFiles(appPath: string){
  console.log(chalk.greenBright('Updating app files'))
  fs.removeSync(path.resolve(appPath, 'src/index.css'))
  fs.removeSync(path.resolve(appPath, 'src/App.css'))
  fs.removeSync(path.resolve(appPath, 'src/logo.svg'))

  replaceTemplateFile('App.tsx', 'src')
  replaceTemplateFile('index.tsx', 'src')
  replaceTemplateFile('favicon.ico', 'public')
  replaceTemplateFile('logo192.png', 'public')
  replaceTemplateFile('logo512.png', 'public')
  replaceTemplateFile('manifest.json', 'public')

  finish()

  function replaceTemplateFile(fileName: string, appDirectory: string) {
    fs.copyFileSync(path.resolve(__dirname, 'templates', fileName), path.resolve(appPath, appDirectory, fileName))
  }
}

function finish() { 
  console.log(chalk.bold('🥬 Done'));
  
  process.exit(0)
}

function logWarning(data: any){
  console.warn(' ' + chalk.yellowBright(data.toString()))
}

