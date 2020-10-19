# ts-monorepo-playground
A playground for testing a TypeScript + React Monorepo


## Context
I'm having trouble getting [React Cosmos](https://github.com/react-cosmos/react-cosmos) to work in a TypeScript *monorepo*.

Though light, [their instructions](https://github.com/react-cosmos/react-cosmos/tree/master/docs#compilation) work fine for TypeScript in a *single package*, but as soon as I try to use code from another TypeScript package in the monorepo it complains that it doesn't understand the type syntax (clearly it's not transpiling the shared files).

To demonstrate the problem simply, I have a minimal TypeScript monorepo ([here](https://github.com/codeandcats/ts-monorepo-playground)) with two packages:

- packages/client (@mono/client)
- packages/shared (@mono/shared)

The client renders a single page with a simple `<Greeting firstName="Joe" />` component in it. The greeting component uses a `getGreeting` function from the shared package and renders its output to screen. I use parcel to serve the page and it compiles it fine. However if I try to use React Cosmos I get this error:

```sh
[Cosmos] Using default cosmos config
[Cosmos] See you at http://localhost:5000
[Cosmos] Using default webpack config
[Cosmos] Building webpack...
webpack built f4d924ce19e1768283e9 in 1628ms
✖ ｢wdm｣: assets by status 2.6 MiB [cached] 1 asset
runtime modules 24.8 KiB 13 modules
modules by path ../../node_modules/ 2.3 MiB 243 modules
modules by path ./src/components/greeting/*.tsx 424 bytes
  ./src/components/greeting/index.fixture.tsx 182 bytes [built] [code generated]
  ./src/components/greeting/index.tsx 242 bytes [built] [code generated]
../shared/src/greeter.ts 39 bytes [built] [code generated] [1 error]
ws (ignored) 15 bytes [optional] [built] [code generated]

ERROR in ../shared/src/greeter.ts
Module build failed (from ../../node_modules/babel-loader/lib/index.js):
SyntaxError: /ts-monorepo-playground/packages/shared/src/greeter.ts: Unexpected token, expected "," (1:32)

> 1 | export function getGreeting(name: string) {
    |                                 ^
  2 |   return `Hello ${name}`;
  3 | }
  4 |
```

### Some more info
- Cosmos version: 5.5.0
- Cosmos config: None
- Webpack version: 5.1.3
- Webpack config: None
- Babel config:

`packages/client/.babelrc`

```json
{
  "presets": [
    "@babel/preset-react",
    [
      "@babel/preset-typescript",
      {
        "isTSX": true,
        "allExtensions": true
      }
    ]
  ],
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./"],
        "alias": {
          "@mono/shared": "../shared/src"
        }
      }
    ]
  ]
}
```

I do not wish to do any pre-compilation of shared packages before running cosmos, cosmos should be able to use babel to compile everything it needs on the fly, so hot reloading can work.

It's like React Cosmos/Babel is not respecting my babel config for files in other packages.
