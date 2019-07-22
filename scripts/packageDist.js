#!/usr/bin/env node

const fs = require('fs');
const { pick } = require('lodash');
const pkg = require('../package.json');

const pkgDist = pick(pkg, [
  'author',
  'bin',
  'dependencies',
  'description',
  'keywords',
  'license',
  'main',
  'name',
  'repository',
  'version',
]);

fs.writeFileSync('dist/package.json', JSON.stringify(pkgDist, null, 2));
