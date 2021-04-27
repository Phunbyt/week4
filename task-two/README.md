# Email Analysis

This repo contains a CLI tool that allows you use the command line to pass information to your program.

## Running the program

```bash
yarn # Install dependencies
```

The program is written in Typescript, it would need to be compiled _the first time_ and everytime you make changes. A `compile` and `compile:watch` script have been added to help with that. Open a new terminal windown and run

```bash
yarn compile
# yarn compile:watch # Run this to compile when any change is made.
```

The cli tool is `email-analysis` and is documented below.

```bash
yarn link # Make the cli tool available in your path.
email-analysis --help
```

Note: This is only available after running `yarn link` above.

The script takes two arguments, `input` and `output`

`input` should be a list of csv files to be provided to your program. This can be a glob
`output` should be the path where a JSON file of your report should be written.

### To run an analysis on a set of files

```bash
email-analysis fixtures/inputs/small-sample.csv report-analysis.json
```

```bash
email-analysis 'fixtures/inputs/*.csv' report-analysis.json
```

## To validate emails.

```bash
email-analysis validate fixtures/inputs/small-sample.csv report-validation.csv
```

```bash
email-analysis validate 'fixtures/inputs/*.csv' report-validation.csv
```
