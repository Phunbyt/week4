# 1 JavaScript - FileTree Bug

## Introduction

Here is a part of an application that creates a file tree data structure from JSON input. However, there are one or more bugs in this code. It seems that for some data sets this code creates an incorrect tree structure.

Another developer was able to isolate the bug and wrote a test case that simulates the bug. See `__tests__/app.spec.js` for test case details. You can run the test to see which tests are failing.

## Problem Statement

Your job is to find the bug and fix it. The only file that should be changed is `src/app.js`. You can always build the project to see if your solution works.

# Setup

1. `npm install` or `Yarn` – install dependencies
2. `npm test` or `Yarn test`– run all tests once (this will be used to evaluate your solutions)
3. `npm run test:watch` or `yarn test --w` - run all tests in _watch mode_ (optionally, you can use it locally if you prefer)


# 2 Typescript - File Update

### Setup
1. `yarn tsc` - to transpile to js lib/app
2. `yarn serve` - to start the server

## Problem Description:

Create A basic node application, that makes a CRUD operation (create, read, update, delete) into a file database.json.

## How will I complete this project?

- Use the folder ./server and work there.
- Your application should use basic bare bone node and typescript
- Your aplication should be able to perform.
  - `GET` Request which returns all the data in your database.json data
  - `POST` Request which adds data to your database.json file (Note: If there is no database.json on post, create one dynamically).
  - `PUT` Request which updates fields of a particular data using the id in database.json
  - `DELETE` Request which removes a particular data from your database.json using the id
- Data format example:

```
[
    {
    organization: "node ninja",
    createdAt: "2020-08-12T19:04:55.455Z",
    updatedAt: "2020-08-12T19:04:55.455Z",
    products: ["developers","pizza"],
    marketValue: "90%",
    address: "sangotedo",
    ceo: "cn",
    country: "Taiwan",
    id: 2,
    noOfEmployees:2,
    employees:["james bond","jackie chan"]
    }
]
```
