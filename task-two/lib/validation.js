"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dns_1 = __importDefault(require("dns"));
/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
function validateEmailAddresses(inputPath, outputFile) {
    const myPath = path_1.default.resolve(__dirname, '..', inputPath[0]);
    const stream = fs_1.default.createReadStream(myPath);
    const outPath = path_1.default.resolve(__dirname, '..', outputFile);
    stream.on('data', function (data) {
        const chunk = data.toString();
        const splitChunk = chunk.split('\n');
        splitChunk.pop();
        splitChunk.shift();
        const emailRegEx = /\S+@\S+\.\S+/;
        splitChunk.forEach((item) => {
            if (emailRegEx.test(item)) {
                const splitItem = item.split('@');
                const suffix = splitItem[1];
                dns_1.default.resolve(suffix, 'MX', (err, domain) => {
                    if (err) {
                        console.log('invalid address or network error');
                    }
                    else if (domain && domain.length > 0) {
                        console.log('domain is valid');
                        fs_1.default.appendFileSync(outPath, `${JSON.stringify(item)}\n`);
                    }
                });
            }
        });
    });
}
exports.default = validateEmailAddresses;
