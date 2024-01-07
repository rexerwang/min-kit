/* eslint no-console: 0  */

/**
 * @param {import('@babel/core')} babel
 * @returns {import('@babel/core').PluginObj}
 */
function plugin(babel) {
  const t = babel.types

  console.log(
    '\n[babel-plugin-transform-root-portal]',
    process.env.TARO_ENV,
    '\n🎯 replace `import { RootPortal } from "@tarojs/components"` to `import { View } from "@tarojs/components"`',
  )

  return {
    name: 'babel-plugin-transform-root-portal',
    visitor: {
      ImportDeclaration(ast) {
        if (ast.node.source.value !== '@tarojs/components') return

        ast.node.specifiers.forEach((node) => {
          if (t.isImportSpecifier(node) && t.isIdentifier(node.imported) && node.imported.name === 'RootPortal') {
            node.imported.name = 'View'
          }
        })
      },
    },
  }
}

module.exports = plugin
