# min-kit

[![](https://img.shields.io/github/actions/workflow/status/rexerwang/min-kit/ci.yml?style=for-the-badge)](https://github.com/rexerwang/min-kit/actions/workflows/ci.yml)
[![](https://img.shields.io/codecov/c/github/rexerwang/min-kit?style=for-the-badge)](https://codecov.io/gh/rexerwang/min-kit)
[![](https://img.shields.io/github/repo-size/rexerwang/min-kit?style=for-the-badge)](https://github.com/rexerwang/min-kit)
[![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://github.com/rexerwang/min-kit)
[![](https://img.shields.io/badge/React-Tarojs-007ACC?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=20232A)](https://github.com/NervJS/taro)

Toolkit for miniapp based on Tarojs/React

## Packages

List of all public packages in monorepo:

| package                                      | npm                                                                                                               | desc                                                                              |
| :------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| [@min-kit/components](./packages/components) | [![](https://img.shields.io/npm/v/%40min-kit/components?style=for-the-badge)](https://npm.im/@min-kit/components) | React components for miniapp                                                      |
| [@min-kit/extends](./packages/extends)       | [![](https://img.shields.io/npm/v/%40min-kit/extends?style=for-the-badge)](https://npm.im/@min-kit/extends)       | Tarojs apis extends for miniapp                                                   |
| [@min-kit/hooks](./packages/hooks)           | [![](https://img.shields.io/npm/v/%40min-kit/hooks?style=for-the-badge)](https://npm.im/@min-kit/hooks)           | React Hooks for miniapp                                                           |
| [@min-kit/store](./packages/store)           | [![](https://img.shields.io/npm/v/%40min-kit/store?style=for-the-badge)](https://npm.im/@min-kit/store)           | React store kit based on [Zustand](https://github.com/pmndrs/zustand) for miniapp |
| [@min-kit/shared](./packages/shared)         | [![](https://img.shields.io/npm/v/%40min-kit/shared?style=for-the-badge)](https://npm.im/@min-kit/shared)         | Utils & constants shared of @min-kit packages                                     |
| [@min-kit/helper](./packages/helper)         | [![](https://img.shields.io/npm/v/%40min-kit/helper?style=for-the-badge)](https://npm.im/@min-kit/helper)         | Plugins & configs of Tarojs for miniapp                                           |

### Install

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

## Examples

- [examples/app-min-kit](./examples/app-min-kit)
