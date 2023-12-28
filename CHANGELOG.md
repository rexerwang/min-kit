## [0.4.0](https://github.com/rexerwang/min-kit/compare/v0.3.3...v0.4.0) (2023-12-28)

### ⚠ BREAKING CHANGES

- **hooks:** drop `useScanLaunchTime`

### Features

- **components/debugger:** set debugger initial position to top-left ([8c64c39](https://github.com/rexerwang/min-kit/commit/8c64c398e62e475afbafcff531c89dbff2c668a1))
- **hooks:** add `useDidScan` for callback when launched by scanning qrcode ([5f8bcbc](https://github.com/rexerwang/min-kit/commit/5f8bcbc2d2760a78fa48167cc0d407bf05b5e650))
- **template:** component examples (`icon` `image` `debugger` ) ([098f1cc](https://github.com/rexerwang/min-kit/commit/098f1cc15ac0dd99e95475dca296be38a9c2b832))
- **template:** add `debugger` example & optimize layout ([bb9f2e0](https://github.com/rexerwang/min-kit/commit/bb9f2e0b803f11cd79abd7d51baf9a2a96e6aa7d))
- **template:** code styles ([1ebbc35](https://github.com/rexerwang/min-kit/commit/1ebbc3527cfbf04ceb76b9534fad911ee38a8780))
- **template:** component examples of `icon` ([6bd7118](https://github.com/rexerwang/min-kit/commit/6bd711814c3b7e3ed3077d2c5b74c91c72155f28))

### Bug Fixes

- **components/debugger:** fix options & filename ([b72a63e](https://github.com/rexerwang/min-kit/commit/b72a63e89be810a9a8bd0ecd1eb2d130f106dc77))
- **components/icon:** fix `MinIconFontProps` typings ([658b313](https://github.com/rexerwang/min-kit/commit/658b313c3d08dfaddb1e34c26e49ff6661b28c9a))
- **extends:** fix `requestSubscription` optional parameters ([52355e5](https://github.com/rexerwang/min-kit/commit/52355e515a9119e1f6bd4d5bbbed57f4a60b4502))
- **extends:** fix requestSubscription opts param ([19f6044](https://github.com/rexerwang/min-kit/commit/19f604435dbb40d67daf1a6e8c167cca8d8d1026))

## [0.3.3](https://github.com/rexerwang/min-kit/compare/v0.3.2...v0.3.3) (2023-12-27)

### Features

- **helper:** use presets in tailwind.config ([894a433](https://github.com/rexerwang/min-kit/commit/894a4334e45d317be69ee890e0346921a975fab1))

### Bug Fixes

- **extends:** fix request `ctx.replay` ([0448c96](https://github.com/rexerwang/min-kit/commit/0448c9646a7209553aaac5ab1d5b5a898b85437b))
- **helper:** fix UserConfigService require in cjs module ([2e8afd1](https://github.com/rexerwang/min-kit/commit/2e8afd1ec06d935f7920524189267ef153e245ca))

## [0.3.2](https://github.com/rexerwang/min-kit/compare/v0.3.1...v0.3.2) (2023-12-26)

### Features

- **extends:** optimize Logger reporter ([3085076](https://github.com/rexerwang/min-kit/commit/308507634696683e89c4be0b14647b5aaed64226))
- **template:** add demos group by subPackage ([b4ff5f6](https://github.com/rexerwang/min-kit/commit/b4ff5f677abfd188ae96566c9af74904c110cb2b))

### Bug Fixes

- **components:** fix exports name of components & styles ([2c1f8c1](https://github.com/rexerwang/min-kit/commit/2c1f8c15f6ad80382e0674e69af2ed2a17feebe3))
- **shared:** fix `Route.includes` ([4a1923d](https://github.com/rexerwang/min-kit/commit/4a1923d24a0f980cc1cc6043661fb2899accfa9d))

## [0.3.1](https://github.com/rexerwang/min-kit/compare/v0.3.0...v0.3.1) (2023-12-25)

### Features

- **template:** add NavigationBar example ([d72209d](https://github.com/rexerwang/min-kit/commit/d72209dd8466e74f898cab4905b288718e240b4d))

### Bug Fixes

- **components:** fix navigation-bar style ([40e9466](https://github.com/rexerwang/min-kit/commit/40e9466894610667de991f998da4471f78bea02a))

## [0.3.0](https://github.com/rexerwang/min-kit/compare/v0.2.0...v0.3.0) (2023-12-25)

### Features

- **components:** optimize `Modal` module & add `Modal.confirm` to replace `confirmModal` exports ([8d98828](https://github.com/rexerwang/min-kit/commit/8d988284172ab94e3f100691bab8d21670e24e94))
- **extends:** add `requestSubscription` for `requestSubscribeMessage` api wrapper ([79df64b](https://github.com/rexerwang/min-kit/commit/79df64b139222f116943f95c7833aa21fab8ba85))
- **template:** add usage examples of modal & request ([fbe0e9f](https://github.com/rexerwang/min-kit/commit/fbe0e9fd83209da3112e690c7dc3870781252f08))

### Bug Fixes

- **components:** fix modal style ([3df5865](https://github.com/rexerwang/min-kit/commit/3df586560e04eb774f76e397a3994c0142f21004))
- **extends:** fix `go` typings ([25d9db6](https://github.com/rexerwang/min-kit/commit/25d9db62e38a08b6343184bfb6554cb46b2297f8))
- **shared:** fix export const enum ([256a856](https://github.com/rexerwang/min-kit/commit/256a856952af48e0b0c7b10c2faca7847dd9a0cc))
- **template:** layout ([ed55cf6](https://github.com/rexerwang/min-kit/commit/ed55cf659ea7128ca96127dbd4d43be301788060))

## [0.2.0](https://github.com/rexerwang/min-kit/compare/c1d7a4ef6ff6b367235f35da42348b483e6821a2...v0.2.0) (2023-12-24)

### Features

- **components:** the React components for miniapp via Tarojs ([7b49167](https://github.com/rexerwang/min-kit/commit/7b49167b8b5bf72cb97fae8da4718be19cee36f0))
- **components:** add debug & confirm-modal components & add tailwind in postcss ([9c2980d](https://github.com/rexerwang/min-kit/commit/9c2980dbaf1de3f1504d643b374e1359e4e695b3))
- **components:** optimize components exports & name prefix with 'min' ([827375e](https://github.com/rexerwang/min-kit/commit/827375e7778f7693912b35b064d2c43f18e59755))
- **extends:** add `@miniapp/extends` for extends taro apis ([5bd7fee](https://github.com/rexerwang/min-kit/commit/5bd7fee768cd79b1e7280828dcd32d1db5aed945))
- **extends:** add `document` & `shareMenu` ([500955e](https://github.com/rexerwang/min-kit/commit/500955efaa2f3911ab6fa0f45c6225bea7291194))
- **helper:** optimize config exports & add ConfigChain.tabBar ([d319d0e](https://github.com/rexerwang/min-kit/commit/d319d0e692eeabcde4a3fb6fc428e1f7b50d8183))
- **helper:** rename `taro-config` to `helper` & optimize exports ([b41aa0e](https://github.com/rexerwang/min-kit/commit/b41aa0e26526eed8a229da5610a8f175c3230267))
- **hooks:** add `@miniapp/hooks` ([3108937](https://github.com/rexerwang/min-kit/commit/3108937c0d1dc5f26b1abb5073dbf026fa0658b6))
- **miniapp:** examples ([234e382](https://github.com/rexerwang/min-kit/commit/234e382ba0ccc63a443a1e47cd4437503044e647))
- setup monorepo packages ([c1d7a4e](https://github.com/rexerwang/min-kit/commit/c1d7a4ef6ff6b367235f35da42348b483e6821a2))
- **shared:** add `@miniapp/shared` for utils & constants shared of [@miniapp](https://github.com/miniapp) packages ([c50a5f0](https://github.com/rexerwang/min-kit/commit/c50a5f0d4bfa19c9b0254f0458d55be303fe59e1))
- **shared:** add constants & optimize `qs` exports ([8d0c441](https://github.com/rexerwang/min-kit/commit/8d0c441c27e7cb62f9490086d88dbf1843eee104))
- **shared:** add ui helper `depth` & `px` ([9c7502f](https://github.com/rexerwang/min-kit/commit/9c7502f87c81ed3a37e9f417d9515ac5017b2e22))
- **shared:** re-export query-string ([88b3d60](https://github.com/rexerwang/min-kit/commit/88b3d604fc7c1e34777f8ec1f10359c7cfe6b270))
- **taro-config:** enhance `taro-config` service ([0dbb653](https://github.com/rexerwang/min-kit/commit/0dbb653eb4100dc2014a0e8890fae9a9d565ab26))
- **template:** add tailwind ([d829248](https://github.com/rexerwang/min-kit/commit/d8292483dc05bc0647c9682af4c81f1f017df749))
- **template:** examples ([5d1bbf5](https://github.com/rexerwang/min-kit/commit/5d1bbf5f9e94eb5e3af6960146b426ae50807488))
- **template:** highlight code ([a25b943](https://github.com/rexerwang/min-kit/commit/a25b943eb57532fa21f55120d9e6dda6b4fa5907))
- **template:** modal examples ([6162b23](https://github.com/rexerwang/min-kit/commit/6162b2330c02df9542b62d3b9cb2e5a74c067a97))
- **template:** optimize dir structure ([b6455cd](https://github.com/rexerwang/min-kit/commit/b6455cda2906d38167f3489a82583b2f0315da6d))

### Bug Fixes

- **components:** add taro platform deps & fix jsx transform ([93de33a](https://github.com/rexerwang/min-kit/commit/93de33aa801e6efc6a309a83252659c0318224c0))
- **components:** fix build config & fix style & type error ([38b4c0d](https://github.com/rexerwang/min-kit/commit/38b4c0da507e3a95d746bec37bb6b7844ae5787d))
- **extends:** fix `go` typings ([2cc91e1](https://github.com/rexerwang/min-kit/commit/2cc91e128ac3edba432a947bb7771302694e9725))
- **extends:** fix RewardedVideoAd.show & scene enum ([41ab1a8](https://github.com/rexerwang/min-kit/commit/41ab1a8ea67c7495d03f9d3a545779b6e4f7cb76))
- **hooks:** fix typings of Taro import ([786b252](https://github.com/rexerwang/min-kit/commit/786b25272f14f90d2d86cb17769b89a1745c416f))
- **shared:** downgrade query-string v7 ([77d335b](https://github.com/rexerwang/min-kit/commit/77d335b5639419bdd1f9e9f288e0af96e72f0962))
- **store:** fix zustand middleware typings with declare shims ([2dd8373](https://github.com/rexerwang/min-kit/commit/2dd837380c94adde6b23c98b8f6329fb7f5299ae))
- **template:** fix tsconfig & lint errors ([b3c01c5](https://github.com/rexerwang/min-kit/commit/b3c01c57be3298006a2de2b542a1896b98ef0a05))
