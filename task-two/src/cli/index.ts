import { Command } from 'commander';
import { sync } from 'glob';
import chalk from 'chalk';
import path from 'path';

import { analysis, validation } from '..';

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { version } = require('../../package.json');

const program = new Command();

program.version(version, '-v, --version');

program
  .command('analysis <input> <output>', { isDefault: true })
  .description(
    'Analyse emails to determine their tlds and report duplicates if any',
  )
  .action(analyseEmails);

program
  .command('validate <input> <output>')
  .description(
    'Validate email addresses and report which emails have an invalid tld or are not formatted correctly',
  )
  .action(validateEmails);

program.parse(process.argv);

function onlyCSVsInPath(paths: string[]) {
  const files = paths.map((filePath) => path.parse(filePath));

  return files.every((parsedPath) => parsedPath.ext === '.csv');
}

/* eslint-disable no-process-exit */

function validateEmails(input: string, output: string) {
  const inputFiles = sync(input);

  if (!inputFiles.length) {
    console.log(chalk.red('Please provide a valid csv file as input'));

    process.exit(1);
  }

  if (!onlyCSVsInPath(inputFiles)) {
    console.log(chalk.red('All input files must have be a csv file'));

    process.exit(1);
  }

  const outputFile = path.resolve(output);

  validation(inputFiles, outputFile);
}

function analyseEmails(input: string, output: string) {
  const inputFiles = sync(input);

  if (!inputFiles.length) {
    console.log(chalk.red('Please provide a valid csv file as input'));

    process.exit(1);
  }

  if (!onlyCSVsInPath(inputFiles)) {
    console.log(chalk.red('All input files must have be a csv file'));

    process.exit(1);
  }

  const outputFile = path.resolve(output);

  analysis(inputFiles, outputFile);
}
