import path from 'path';
import fs from 'fs';

import analysis from '../src/analysis';

const fixturesInputDirectory = path.join(__dirname, '../', 'fixtures/inputs');
const testOutputDirectory = path.join(__dirname, '../', 'tests');

beforeAll(() => {
  try {
    fs.mkdirSync(testOutputDirectory);
  } catch {}
});

afterAll(() => {
  require('rimraf').sync(testOutputDirectory);
});

describe('Analysis tests', () => {
  test('Works for a single input', () => {
    const inputFile = path.join(fixturesInputDirectory, 'small-sample.csv');
    const outputFile = path.join(testOutputDirectory, 'file.json');

    // Add additional mocks and your own tests.

    // expect(() => analysis([inputFile], outputFile));
  });

  test('Works for a multiple inputs', () => {
    const input1 = path.join(fixturesInputDirectory, 'small-sample.csv');
    const input2 = path.join(fixturesInputDirectory, 'medium-sample.csv');
    const outputFile = path.join(testOutputDirectory, 'file.json');

    // Add additional mocks and your own tests.

    // expect(() => analysis([input1, input2], outputFile));
  });
});
