/* eslint-disable functional/immutable-data */
import { spawn } from 'child_process';

import chalk from 'chalk';
import fetch from 'node-fetch';
import ora from 'ora';

import ignorePackages from './package.ignore.json';
import peerDependencies from './peerDependencies.json';
import { logWarning } from './utils';

/**
 * Installs all the latest leafygreen packages at the provided path
 * @param appPath: the path of the app to install the leafygreen packages.
 * @returns Promise
 */
export function installLeafyGreen(appPath: string): Promise<boolean> {
  console.log(chalk.green('Installing Leafygreen & peer dependencies'));
  const spinner = ora('Fetching Leafygreen dependencies').start();
  const npmsUrl = 'https://api.npms.io/v2/search/?q=scope:leafygreen-ui&size=250';

  return new Promise((resolve, reject) => {
    return fetch(npmsUrl)
    .then((data) => data.json())
    .then(({ results }) => {
      spinner.text = 'Installing Leafygreen packages';
      const lgPackages = results
        .filter(
          (result: any) =>
            !(ignorePackages as ReadonlyArray<string>).includes(
              result.package.name
            )
        )
        .map(
          (result: any) => `${result.package.name}@^${result.package.version}`
        );
      const peerPackages = Object.entries(peerDependencies).map(
        ([pkg, version]) => `${pkg}@${version}`
      );
      const packages = [...peerPackages, ...lgPackages];
      const install = spawn(`yarn`, [`add`, ...packages], { cwd: appPath });

      install.stdout.on('data', (data) => {
        spinner.text = data.toString();
      });

      install.stderr.on('data', logWarning);

      install.on('close', () => {
        spinner.stop();
        console.log('Installed Leafygreen packages')
        resolve(true)
      });

      install.on('error', (err) => {
        spinner.stop()
        reject(err)
      })
    })
    .catch(err => {
      reject(err)
    })
  })

}