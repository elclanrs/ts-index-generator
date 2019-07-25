import fs from 'fs';
import path from 'path';
import glob from 'glob';
import _ from 'lodash';

export interface IndexFile {
  path: string;
  export: string;
}

export interface IndexOptions {
  ignore: string[];
}

export function clearIndexes(rootPath: string): void {
  const indexes = glob.sync(`${rootPath}/**/index.ts`);
  indexes.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  });
}

export function getIndexes(rootPath: string, { ignore = [] }: IndexOptions): IndexFile[] {
  const files = glob.sync(`${rootPath}/**/*.ts`, {
    nodir: true,
    ignore: ['**/index.ts', ...ignore],
  });
  return _(files)
    .flatMap(file => {
      const filename = path.basename(file).split('.').slice(0, -1).join('.');
      const parents = path.relative(rootPath, path.dirname(file)).split(path.sep);
      const contents = fs.readFileSync(file, 'utf8').trim();
      if (contents.startsWith('// no-export')) {
        return [];
      }
      return _(parents)
        .map((_0, idx) => {
          const before = parents.slice(0, -idx);
          const after = parents.slice(-idx);
          if (before.length === 0) {
            return {
              export: `export * from './${filename}';`,
              path: path.join(rootPath, after.join('/'), 'index.ts'),
            };
          }
          return {
            export: `export * from './${after[0]}/index';`,
            path: path.join(rootPath, before.join('/'), 'index.ts'),
          };
        })
        .compact()
        .uniqWith(_.isEqual)
        .value();
    })
    .uniqWith(_.isEqual)
    .value();
}
