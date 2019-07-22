import test from 'ava';
import { getIndexes } from '../src/helpers';

test('getIndexes', t => {
  const actual = getIndexes('test/root');
  const expected = [
    {
      path: 'test/root/a/a1/index.ts',
      export: 'export * from \'./a1x\';',
    },
    {
      path: 'test/root/a/index.ts',
      export: 'export * from \'./a1/index\';',
    },
    {
      path: 'test/root/a/a1/index.ts',
      export: 'export * from \'./a1y\';',
    },
    {
      path: 'test/root/a/a1/a2/index.ts',
      export: 'export * from \'./a2x\';',
    },
    {
      path: 'test/root/a/a1/index.ts',
      export: 'export * from \'./a2/index\';',
    },
    {
      path: 'test/root/a/a1/a2/index.ts',
      export: 'export * from \'./a2y\';',
    },
    {
      path: 'test/root/a/index.ts',
      export: 'export * from \'./ay\';',
    },
    {
      path: 'test/root/index.ts',
      export: 'export * from \'./a/index\';',
    },
    {
      path: 'test/root/b/b1/index.ts',
      export: 'export * from \'./b1x\';',
    },
    {
      path: 'test/root/b/index.ts',
      export: 'export * from \'./b1/index\';',
    },
    {
      path: 'test/root/b/b1/index.ts',
      export: 'export * from \'./b1y\';',
    },
    {
      path: 'test/root/b/b1/b2/index.ts',
      export: 'export * from \'./b2x\';',
    },
    {
      path: 'test/root/b/b1/index.ts',
      export: 'export * from \'./b2/index\';',
    },
    {
      path: 'test/root/b/b1/b2/index.ts',
      export: 'export * from \'./b2y\';',
    },
    {
      path: 'test/root/b/index.ts',
      export: 'export * from \'./bx\';',
    },
    {
      path: 'test/root/index.ts',
      export: 'export * from \'./b/index\';',
    },
    {
      path: 'test/root/b/index.ts',
      export: 'export * from \'./by\';',
    },
  ];
  t.deepEqual(actual, expected);
});
