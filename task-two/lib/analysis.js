"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
function analyseFiles(inputPaths, outputPath) {
    const myPath = path_1.default.resolve(__dirname, '..', inputPaths[0]);
    const stream = fs_1.default.createReadStream(myPath);
    stream.on('data', function (data) {
        const chunk = data.toString();
        const splitChunk = chunk.split('\n');
        splitChunk.pop();
        splitChunk.shift();
        const writeObj = {
            'valid-domains': [],
            totalEmailsParsed: 0,
            totalValidEmails: 0,
            categories: {},
        };
        const emailRegEx = /\S+@\S+\.\S+/;
        splitChunk.forEach((item) => {
            writeObj.totalEmailsParsed++;
            if (emailRegEx.test(item)) {
                writeObj.totalValidEmails++;
                const splitItem = item.split('@');
                const suffix = splitItem[1];
                writeObj.categories[suffix] = (writeObj.categories[suffix] || 0) + 1;
            }
        });
        writeObj['valid-domains'] = Object.keys(writeObj.categories);
        const outPath = path_1.default.resolve(__dirname, '..', outputPath);
        fs_1.default.writeFile(outPath, JSON.stringify(writeObj, null, 2), (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
}
exports.default = analyseFiles;
