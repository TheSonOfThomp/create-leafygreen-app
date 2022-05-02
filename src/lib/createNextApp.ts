/* eslint-disable functional/immutable-data */
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

import chalk from 'chalk';
import ora from 'ora';

import { installLeafyGreen } from './installLeafyGreen';
import { logWarning } from './utils';

/**
 * Creates a new Next app using `create-next-app`
 * with the provided name.
 * @param name: the name of the new NextJS app
 */
export function createNextApp(name: string): Promise<boolean> {
  const appPath = path.resolve(name);

  return new Promise((resolve) => {
    if (!fs.existsSync(appPath)) {
      console.log(`${chalk.blue('Creating Next App')}`);
      const spinner = ora({
        text: 'Creating Next App',
        stream: process.stdout,
      }).start();
      const cra = spawn(`npx`, [
        'create-next-app',
        name,
        `--ts`
      ]);
      cra.stdout.on('data', (data) => {
        spinner.text = data.toString();
      });
      cra.stderr.on('data', logWarning);
      cra.on('close', () => {
        spinner.stop();
        
        installLeafyGreen(appPath)
        .then(() => updateNextApp(appPath))
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
 * Updates a relevant create-next-app files at the provided directory
 * @param appPath 
 */
 export function updateNextApp(appPath: string) {
  console.log(chalk.greenBright('Updating app files'));
  removeAppFile('styles/globals.css');
  removeAppFile('styles/Home.module.css');
  removeAppFile('public/vercel.svg');

  replaceTemplateFile('next_index.tsx', 'pages', 'index.tsx');
  replaceTemplateFile('favicon.ico', 'public');
  replaceTemplateFile('logo192.png', 'public');
  replaceTemplateFile('logo512.png', 'public');
  replaceTemplateFile('manifest.json', 'public');

  /**
   * Replaces (or creates) a file in appDirectory/(fileName|newName)
   * @param fileName 
   * @param appDirectory 
   * @param newName 
   */
  function replaceTemplateFile(fileName: string, appDirectory: string, newName?: string) {
    fs.copyFileSync(
      path.resolve(__dirname, 'templates', fileName),
      path.resolve(appPath, appDirectory, newName || fileName)
    );
  }

  /**
   * Removes the file
   * @param fileName 
   */
  function removeAppFile(fileName: string) {
    fs.unlinkSync(path.resolve(appPath, fileName))
  }
}