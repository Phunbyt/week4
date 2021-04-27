import path from 'path';
import fs from 'fs';

import validation from '../src/validation';

const fixturesInputDirectory = path.join(__dirname, '../', 'fixtures/inputs');
const testOutputDirectory = path.join(__dirname, '../', 'tests-validation');

beforeAll(() => {
  try {
    fs.mkdirSync(testOutputDirectory);
  } catch {}
});

afterAll(() => {
  require('rimraf').sync(testOutputDirectory);
});

describe('validation tests', () => {
  test('Works for a single input', () => {
    const inputFile = path.join(fixturesInputDirectory, 'small-sample.csv');
    const outputFile = path.join(testOutputDirectory, 'small-sample.csv');

    // Add additional mocks and your own tests.

    // expect(() => validation([inputFile], outputFile));
  });

  test('Works for a multiple inputs', () => {
    const input1 = path.join(fixturesInputDirectory, 'small-sample.csv');
    const input2 = path.join(fixturesInputDirectory, 'medium-sample.csv');
    const outputFile = path.join(testOutputDirectory, 'combined.csv');

    // Add additional mocks and your own tests.

    // expect(() => validation([input1, input2], outputFile));
  });
});
