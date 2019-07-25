# ts-index-generator

Generate index.ts files to autoexport all modules in your TypeScript project.

Files with the `// no-export` comment at the very top of the file will not be exported in the index.

For example, given the following project:

```
my-project
├── a
│   ├── a1
│   │   ├── a1x.ts
│   │   ├── a1y.ts
│   │   └── a2
│   │       ├── a2x.ts
│   │       └── a2y.ts
│   ├── ax.ts
│   └── ay.ts
└── b
    ├── b1
    │   ├── b1x.ts
    │   ├── b1y.ts
    │   └── b2
    │       ├── b2x.ts
    │       └── b2y.ts
    ├── bx.ts
    └── by.ts
```

It will generate indexes exporting all files (and other indexes) at each folder level:

```
test/root/
├── a
│   ├── a1
│   │   ├── a1x.ts
│   │   ├── a1y.ts
│   │   ├── a2
│   │   │   ├── a2x.ts
│   │   │   ├── a2y.ts
│   │   │   └── index.ts <--
│   │   └── index.ts <--
│   ├── ax.ts
│   ├── ay.ts
│   └── index.ts <--
├── b
│   ├── b1
│   │   ├── b1x.ts
│   │   ├── b1y.ts
│   │   ├── b2
│   │   │   ├── b2x.ts
│   │   │   ├── b2y.ts
│   │   │   └── index.ts <--
│   │   └── index.ts <--
│   ├── bx.ts
│   ├── by.ts
│   └── index.ts <--
└── index.ts <--
```

## Usage

>**Note:** if you don't provide a `path` the root will be the folder where the comand is run

```sh
ts-index-generator [options...] [path]
```

### Options:

Option | Description | Example
--- | --- | ---
`-i, --ignore` | Ignored file patterns | `-i '**/*.spec.ts','**/test.ts'`

### Examples:

```sh
ts-index-generator path/to/root
```

```sh
cd path/to/root
ts-index-generator
```
