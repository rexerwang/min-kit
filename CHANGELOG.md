## [0.3.3](https://github.com/rexerwang/min-kit/compare/v0.3.2...v0.3.3) (2023-12-27)

### Bug Fixes

- **extends:** fix request `ctx.replay` ([0448c96](https://github.com/rexerwang/min-kit/commit/0448c9646a7209553aaac5ab1d5b5a898b85437b))
- **helper:** fix UserConfigService require in cjs module ([2e8afd1](https://github.com/rexerwang/min-kit/commit/2e8afd1ec06d935f7920524189267ef153e245ca))

### Features

- **helper:** use presets in tailwind.config ([894a433](https://github.com/rexerwang/min-kit/commit/894a4334e45d317be69ee890e0346921a975fab1))

## [0.3.2](https://github.com/rexerwang/min-kit/compare/v0.3.1...v0.3.2) (2023-12-26)

### Bug Fixes

- **components:** fix exports name of components & styles ([2c1f8c1](https://github.com/rexerwang/min-kit/commit/2c1f8c15f6ad80382e0674e69af2ed2a17feebe3))
- **shared:** fix `Route.includes` ([4a1923d](https://github.com/rexerwang/min-kit/commit/4a1923d24a0f980cc1cc6043661fb2899accfa9d))

### Features

- **extends:** optimize Logger reporter ([3085076](https://github.com/rexerwang/min-kit/commit/308507634696683e89c4be0b14647b5aaed64226))
- **template:** add demos group by subPackage ([b4ff5f6](https://github.com/rexerwang/min-kit/commit/b4ff5f677abfd188ae96566c9af74904c110cb2b))

## [0.3.1](https://github.com/rexerwang/min-kit/compare/v0.3.0...v0.3.1) (2023-12-25)

### Bug Fixes

- **components:** fix navigation-bar style ([40e9466](https://github.com/rexerwang/min-kit/commit/40e9466894610667de991f998da4471f78bea02a))

### Features

- **template:** add NavigationBar example ([d72209d](https://github.com/rexerwang/min-kit/commit/d72209dd8466e74f898cab4905b288718e240b4d))

# [0.3.0](https://github.com/rexerwang/min-kit/compare/v0.2.0...v0.3.0) (2023-12-25)

### Bug Fixes

- **components:** fix modal style ([3df5865](https://github.com/rexerwang/min-kit/commit/3df586560e04eb774f76e397a3994c0142f21004))
- **extends:** fix `go` typings ([25d9db6](https://github.com/rexerwang/min-kit/commit/25d9db62e38a08b6343184bfb6554cb46b2297f8))
- **shared:** fix export const enum ([256a856](https://github.com/rexerwang/min-kit/commit/256a856952af48e0b0c7b10c2faca7847dd9a0cc))
- **template:** layout ([ed55cf6](https://github.com/rexerwang/min-kit/commit/ed55cf659ea7128ca96127dbd4d43be301788060))

### Features

- **components:** optimize `Modal` module & add `Modal.confirm` to replace `confirmModal` exports ([8d98828](https://github.com/rexerwang/min-kit/commit/8d988284172ab94e3f100691bab8d21670e24e94))
- **extends:** add `requestSubscription` for `requestSubscribeMessage` api wrapper ([79df64b](https://github.com/rexerwang/min-kit/commit/79df64b139222f116943f95c7833aa21fab8ba85))
- **template:** add usage examples of modal & request ([fbe0e9f](https://github.com/rexerwang/min-kit/commit/fbe0e9fd83209da3112e690c7dc3870781252f08))

# 0.2.0 (2023-12-24)

### Bug Fixes

- **components:** add taro platform deps & fix jsx transform ([93de33a](https://github.com/rexerwang/min-kit/commit/93de33aa801e6efc6a309a83252659c0318224c0))
- **components:** fix build config & fix style & type error ([38b4c0d](https://github.com/rexerwang/min-kit/commit/38b4c0da507e3a95d746bec37bb6b7844ae5787d))
- **extends:** fix `go` typings ([2cc91e1](https://github.com/rexerwang/min-kit/commit/2cc91e128ac3edba432a947bb7771302694e9725))
- **extends:** fix RewardedVideoAd.show & scene enum ([41ab1a8](https://github.com/rexerwang/min-kit/commit/41ab1a8ea67c7495d03f9d3a545779b6e4f7cb76))
- **hooks:** fix typings of Taro import ([786b252](https://github.com/rexerwang/min-kit/commit/786b25272f14f90d2d86cb17769b89a1745c416f))
- **shared:** downgrade query-string v7 ([77d335b](https://github.com/rexerwang/min-kit/commit/77d335b5639419bdd1f9e9f288e0af96e72f0962))
- **store:** fix zustand middleware typings with declare shims ([2dd8373](https://github.com/rexerwang/min-kit/commit/2dd837380c94adde6b23c98b8f6329fb7f5299ae))
- **template:** fix tsconfig & lint errors ([b3c01c5](https://github.com/rexerwang/min-kit/commit/b3c01c57be3298006a2de2b542a1896b98ef0a05))

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

## [0.1.2](https://github.com/rexerwang/min-kit/compare/v0.1.1...v0.1.2) (2023-12-24)

### Bug Fixes

- **extends:** fix `go` typings ([9d412a2](https://github.com/rexerwang/min-kit/commit/9d412a2438aab0a5474b80bd1a40ac5541310106))

### Features

- **template:** highlight code ([a35e78a](https://github.com/rexerwang/min-kit/commit/a35e78a2df7d6becdac84fc044434aec7e400384))
- **template:** optimize dir structure ([9f46b10](https://github.com/rexerwang/min-kit/commit/9f46b102cb2e065ffad4fe0c5602a29b66a682e1))

## [0.1.1](https://github.com/rexerwang/min-kit/compare/v0.1.0...v0.1.1) (2023-12-23)

### Bug Fixes

- **extends:** fix RewardedVideoAd.show & scene enum ([5e199a5](https://github.com/rexerwang/min-kit/commit/5e199a563c2e481303ac74e1e07a18a909c7b8f1))
- **template:** fix tsconfig & lint errors ([d54b4c0](https://github.com/rexerwang/min-kit/commit/d54b4c0577fbb92313eba668983a6381053ea38d))

### Features

- **helper:** optimize config exports & add ConfigChain.tabBar ([00595be](https://github.com/rexerwang/min-kit/commit/00595bef2bff52cda6ec61d3b18693f189869172))

# 0.1.0 (2023-12-22)

### Bug Fixes

- **components:** add taro platform deps & fix jsx transform ([728b8dd](https://github.com/rexerwang/min-kit/commit/728b8dd81028a1096534e8793d3d700a21db8155))
- **components:** fix build config & fix style & type error ([ae64340](https://github.com/rexerwang/min-kit/commit/ae6434047df2f2427410d9d4db4176c5faf22de3))
- **hooks:** fix typings of Taro import ([1baba22](https://github.com/rexerwang/min-kit/commit/1baba229e88bd2bfd32203cc05a9bb249b0dbae8))
- **shared:** downgrade query-string v7 ([0e8ce87](https://github.com/rexerwang/min-kit/commit/0e8ce87f48b3897ee32963ff73879ad7e0199715))
- **store:** fix zustand middleware typings with declare shims ([1213abf](https://github.com/rexerwang/min-kit/commit/1213abf494245ff6de2523f6e554105dd46f0639))

### Features

- **components:** the React components for miniapp via Tarojs ([00f855e](https://github.com/rexerwang/min-kit/commit/00f855efab6270b7727457c8a7516bb8e48acb1d))
- **components:** add debug & confirm-modal components & add tailwind in postcss ([d25e3e0](https://github.com/rexerwang/min-kit/commit/d25e3e073da82cef6ce12fc5bae37fd03573236d))
- **extends:** add `@min-kit/extends` for extends taro apis ([100b4bf](https://github.com/rexerwang/min-kit/commit/100b4bfab0e423e7084ec09de532d82c20aea8fc))
- **extends:** add `document` & `shareMenu` ([03bf568](https://github.com/rexerwang/min-kit/commit/03bf56816b1340a950bd0309ea8db2b25ffae453))
- **helper:** rename `taro-config` to `helper` & optimize exports ([ea22a43](https://github.com/rexerwang/min-kit/commit/ea22a43d1185b83f36141e3bb68cb9a145afd75c))
- **hooks:** add `@min-kit/hooks` ([3597d6b](https://github.com/rexerwang/min-kit/commit/3597d6bfc723234c397368f83494873c15950e5b))
- **miniapp:** examples ([2654cae](https://github.com/rexerwang/min-kit/commit/2654cae5491695d5c0acefc5ca586f009868be38))
- setup monorepo packages ([68e2d49](https://github.com/rexerwang/min-kit/commit/68e2d49f45772a2e15b24dd4cdd7ef2eb35a80d2))
- **shared:** add `@min-kit/shared` for utils & constants shared of [@min-kit](https://github.com/miniapp) packages ([17d0404](https://github.com/rexerwang/min-kit/commit/17d0404abbcbf26d770f717042f7e06751de4103))
- **shared:** add constants & optimize `qs` exports ([ff3d4ae](https://github.com/rexerwang/min-kit/commit/ff3d4ae85505e34f72483912c980faaf8178ed72))
- **shared:** add ui helper `depth` & `px` ([3e15e8b](https://github.com/rexerwang/min-kit/commit/3e15e8b85d2851f4ba890d29837036b45444d7a6))
- **shared:** re-export query-string ([cd0b008](https://github.com/rexerwang/min-kit/commit/cd0b0086bb023a1f98e093da5925119af46ff4e6))
- **taro-config:** enhance `taro-config` service ([6c94047](https://github.com/rexerwang/min-kit/commit/6c940474d246a2596a028b9028f2aad25ac3636c))
- **template:** add tailwind ([bfb2063](https://github.com/rexerwang/min-kit/commit/bfb2063d800f56355d3be730e5b6da2fa9d5c52b))
- **template:** examples ([3adfecb](https://github.com/rexerwang/min-kit/commit/3adfecb6cb5ba28e11b1138af9525c513a5548ff))
- **template:** modal examples ([00e3242](https://github.com/rexerwang/min-kit/commit/00e324258a432c17c33e930c9a0dcdb6efb27313))
