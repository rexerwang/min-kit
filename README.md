# min-kit · [![ci](https://github.com/rexerwang/min-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/rexerwang/min-kit/actions/workflows/ci.yml) [![codecov](https://codecov.io/gh/rexerwang/min-kit/graph/badge.svg?token=GA6N52QSGY)](https://codecov.io/gh/rexerwang/min-kit)

Toolkit for miniapp based on Tarojs/React

## packages

List of all packages:

| package                                                | npm                                                                                           | desc                                                                              |
| :----------------------------------------------------- | :-------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| [@min-kit/components](./packages/components/README.md) | [![](https://img.shields.io/npm/v/%40min-kit/components)](https://npm.im/@min-kit/components) | React components for miniapp                                                      |
| [@min-kit/extends](./packages/extends/README.md)       | [![](https://img.shields.io/npm/v/%40min-kit/extends)](https://npm.im/@min-kit/extends)       | extends apis of Taro                                                              |
| [@min-kit/hooks](./packages/hooks/README.md)           | [![](https://img.shields.io/npm/v/%40min-kit/hooks)](https://npm.im/@min-kit/hooks)           | React Hooks for miniapp                                                           |
| [@min-kit/store](./packages/store/README.md)           | [![](https://img.shields.io/npm/v/%40min-kit/store)](https://npm.im/@min-kit/store)           | React store kit based on [Zustand](https://github.com/pmndrs/zustand) for miniapp |
| [@min-kit/shared](./packages/shared/README.md)         | [![](https://img.shields.io/npm/v/%40min-kit/shared)](https://npm.im/@min-kit/shared)         | utils & constants shared of @min-kit packages                                     |
| [@min-kit/helper](./packages/helper/README.md)         | [![](https://img.shields.io/npm/v/%40min-kit/helper)](https://npm.im/@min-kit/helper)         | plugin and config helper for Taro                                                 |

See more details [here](./packages).

### install

Using npm:

```sh
npm i -S @min-kit/components @min-kit/extends @min-kit/hooks @min-kit/store @min-kit/share
npm i -D @min-kit/helper
```

Using pnpm:

```sh
pnpm add @min-kit/components @min-kit/extends @min-kit/hooks @min-kit/store @min-kit/share
pnpm add -D @min-kit/helper
```

Using yarn:

```sh
yarn add @min-kit/components @min-kit/extends @min-kit/hooks @min-kit/store @min-kit/share
yarn add -D @min-kit/helper
```

## template

[miniapp/template](./miniapp/template) is a template project for miniapp based on `@min-kit` + `Taro` + `React` + `Typescript`,
which includes usage examples of the `@min-kit/*`.
