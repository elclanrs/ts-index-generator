#!/usr/bin/env node

import fs from 'fs';
import program from 'commander';
import { clearIndexes, getIndexes } from './helpers';

const pkg = require('../package.json'); // eslint-disable-line @typescript-eslint/no-var-requires

program
  .version(pkg.version)
  .option('-i, --ignore [patterns...]', 'Ignored file patterns', s => s.split(','), [])
  .arguments('<path>')
  .action(rootPath => {
    clearIndexes(rootPath);
    getIndexes(rootPath, { ignore: program.ignore }).forEach(index => {
      fs.appendFileSync(index.path, `${index.export}\n`);
    });
  })
  .parse(process.argv);
