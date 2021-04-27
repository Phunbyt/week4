"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const glob_1 = require("glob");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const __1 = require("..");
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { version } = require('../../package.json');
const program = new commander_1.Command();
program.version(version, '-v, --version');
program
    .command('analysis <input> <output>', { isDefault: true })
    .description('Analyse emails to determine their tlds and report duplicates if any')
    .action(analyseEmails);
program
    .command('validate <input> <output>')
    .description('Validate email addresses and report which emails have an invalid tld or are not formatted correctly')
    .action(validateEmails);
program.parse(process.argv);
function onlyCSVsInPath(paths) {
    const files = paths.map((filePath) => path_1.default.parse(filePath));
    return files.every((parsedPath) => parsedPath.ext === '.csv');
}
/* eslint-disable no-process-exit */
function validateEmails(input, output) {
    const inputFiles = glob_1.sync(input);
    if (!inputFiles.length) {
        console.log(chalk_1.default.red('Please provide a valid csv file as input'));
        process.exit(1);
    }
    if (!onlyCSVsInPath(inputFiles)) {
        console.log(chalk_1.default.red('All input files must have be a csv file'));
        process.exit(1);
    }
    const outputFile = path_1.default.resolve(output);
    __1.validation(inputFiles, outputFile);
}
function analyseEmails(input, output) {
    const inputFiles = glob_1.sync(input);
    if (!inputFiles.length) {
        console.log(chalk_1.default.red('Please provide a valid csv file as input'));
        process.exit(1);
    }
    if (!onlyCSVsInPath(inputFiles)) {
        console.log(chalk_1.default.red('All input files must have be a csv file'));
        process.exit(1);
    }
    const outputFile = path_1.default.resolve(output);
    __1.analysis(inputFiles, outputFile);
}
