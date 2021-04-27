import path from 'path';
import fs from 'fs';
import dns from 'dns';
import { domain } from 'process';

/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
function validateEmailAddresses(inputPath: string[], outputFile: string) {
  const myPath = path.resolve(__dirname, '..', inputPath[0]);

  const stream = fs.createReadStream(myPath);
  const outPath = path.resolve(__dirname, '..', outputFile);

  stream.on('data', function (data: Buffer) {
    const chunk = data.toString();
    const splitChunk = chunk.split('\n');
    splitChunk.pop();
    splitChunk.shift();

    const emailRegEx = /\S+@\S+\.\S+/;

    splitChunk.forEach((item: string) => {
      if (emailRegEx.test(item)) {
        const splitItem: string[] = item.split('@');
        const suffix: string = splitItem[1];
        dns.resolve(suffix, 'MX', (err, domain) => {
          if (err) {
            console.log('invalid address or network error');
          } else if (domain && domain.length > 0) {
            console.log('domain is valid');
            fs.appendFileSync(outPath, `${JSON.stringify(item)}\n`);
          }
        });
      }
    });
  });
}

export default validateEmailAddresses;
