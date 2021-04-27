#!/usr/bin/env node

/* eslint-disable no-var */
'use strict';

// validate that used node version is supported
var semver = require('semver');
var path = require('path');

var ver = process.versions.node;
ver = ver.split('-')[0];

var dirPath = null;

if (semver.satisfies(ver, '>=12.0.0')) {
  dirPath = path.join(__dirname, '..', 'lib');
} else {
  console.log(require('chalk').red('Node version ' + ver + ' is not supported, please use Node.js 12.0 or higher.'));
  process.exit(1);
}

// load v8-compile-cache
if (semver.satisfies(ver, '>=5.7.0')) {
  require('v8-compile-cache');
}

var cliPath = path.join(dirPath, 'cli');
module.exports = require(cliPath);
