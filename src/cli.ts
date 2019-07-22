#!/usr/bin/env node

import fs from 'fs';
import { clearIndexes, getIndexes } from './helpers';

const rootPath = process.argv[2] || process.cwd();

clearIndexes(rootPath);

getIndexes(rootPath).forEach(index => {
  fs.appendFileSync(index.path, `${index.export}\n`);
});
