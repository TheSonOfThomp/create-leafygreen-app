/* eslint-disable functional/immutable-data */
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

import chalk from 'chalk';
import ora from 'ora';

import { installLeafyGreen } from './installLeafyGreen';
import { logWarning } from './utils';

/**
 * Creates a new React App using `create-react-app`
 * with the provided name.
 * @param name: the name of the new react app
 */
export function createReactApp(name: string): Promise<boolean> {
  const appPath = path.resolve(name);

  return new Promise((resolve) => {
    if (!fs.existsSync(appPath)) {
      console.log(`${chalk.blue('Creating React App')}`);
      const spinner = ora({
        text: 'Creating React App',
        stream: process.stdout,
      }).start();
      const cra = spawn(`npx`, [
        'create-react-app',
        name,
        `--template`,
        `typescript`,
      ]);
      cra.stdout.on('data', (data) => {
        spinner.text = data.toString();
      });
      cra.stderr.on('data', logWarning);
      cra.on('close', () => {
        spinner.stop();
        console.log('Successgully installed');
        
        installLeafyGreen(appPath)
        .then(() => updateReactApp(appPath))
        .then(() => resolve(true))
      });
    } else {
      console.error(`\n${chalk.bold('Could not create new app')}`);
      console.log(`Folder ${chalk.green(`/${name}`)} already exists\n`);
      resolve(false)
    }
  })
}

/**
 * Updates a relevant create-react-app files at the provided directory
 * @param appPath 
 */
export function updateReactApp(appPath: string) {
  console.log(chalk.greenBright('Updating app files'));
  fs.unlinkSync(path.resolve(appPath, 'src/index.css'));
  fs.unlinkSync(path.resolve(appPath, 'src/App.css'));
  fs.unlinkSync(path.resolve(appPath, 'src/logo.svg'));

  replaceTemplateFile('App.tsx', 'src');
  replaceTemplateFile('index.tsx', 'src');
  replaceTemplateFile('favicon.ico', 'public');
  replaceTemplateFile('logo192.png', 'public');
  replaceTemplateFile('logo512.png', 'public');
  replaceTemplateFile('manifest.json', 'public');

  function replaceTemplateFile(fileName: string, appDirectory: string) {
    fs.copyFileSync(
      path.resolve(__dirname, 'templates', fileName),
      path.resolve(appPath, appDirectory, fileName)
    );
  }
}