import fs from 'fs';
import path from 'path';
import glob from 'glob';
import _ from 'lodash';

export interface IndexFile {
  path: string;
  export: string;
}

export function clearIndexes(rootPath: string): void {
  const indexes = glob.sync(`${rootPath}/**/index.ts`);
  indexes.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  });
}

export function getIndexes(rootPath: string): IndexFile[] {
  const files = glob.sync(`${rootPath}/**/*.ts`, {
    nodir: true,
    ignore: ['**/index.ts'],
  });
  return _(files)
    .flatMap(file => {
      const filename = path.basename(file).split('.').slice(0, -1);
      const parents = path.dirname(file).replace(`${process.cwd()}/`, '').split(path.sep);
      const contents = fs.readFileSync(file, 'utf8').trim();
      if (contents.startsWith('// no-export')) {
        return [];
      }
      return _(parents)
        .map((_0, idx) => {
          const before = parents.slice(0, -idx);
          const after = parents.slice(-idx);
          if (before.length === 0) {
            const out: IndexFile = {
              path: path.join(after.join(path.sep), 'index.ts'),
              export: `export * from './${filename}';`,
            };
            return out;
          }
          if (after.length === 1) {
            const out: IndexFile = {
              path: path.join(before.join(path.sep), 'index.ts'),
              export: `export * from './${after.join('/')}/index';`,
            };
            return out;
          }
          return null;
        })
        .compact()
        .value();
    })
    .uniqBy('export')
    .value();
}
