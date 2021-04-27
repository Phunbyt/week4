import path from 'path';
import fs from 'fs';
/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
function analyseFiles(inputPaths: string[], outputPath: string) {
  interface Writeable {
    'valid-domains': string[];
    totalEmailsParsed: number;
    totalValidEmails: number;
    categories: Record<string, number>;
  }
  const myPath = path.resolve(__dirname, '..', inputPaths[0]);

  const stream = fs.createReadStream(myPath);
  stream.on('data', function (data: Buffer) {
    const chunk = data.toString();
    const splitChunk = chunk.split('\n');
    splitChunk.pop();
    splitChunk.shift();
    const writeObj: Writeable = {
      'valid-domains': [],
      totalEmailsParsed: 0,
      totalValidEmails: 0,
      categories: {},
    };

    const emailRegEx = /\S+@\S+\.\S+/;

    splitChunk.forEach((item: string) => {
      writeObj.totalEmailsParsed++;

      if (emailRegEx.test(item)) {
        writeObj.totalValidEmails++;
        const splitItem: string[] = item.split('@');
        const suffix: string = splitItem[1];
        writeObj.categories[suffix] = (writeObj.categories[suffix] || 0) + 1;
      }
    });

    writeObj['valid-domains'] = Object.keys(writeObj.categories);
    const outPath = path.resolve(__dirname, '..', outputPath);
    fs.writeFile(outPath, JSON.stringify(writeObj, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}

export default analyseFiles;
