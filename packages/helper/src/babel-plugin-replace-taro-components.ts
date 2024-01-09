/* eslint no-console: 0  */

import * as Babel from '@babel/core'

export default function plugin(babel: typeof Babel, options: Record<string, string> = {}): Babel.PluginObj {
  const t = babel.types
  const replacement = Object.entries(options)
  const source = '@tarojs/components'

  return {
    name: 'babel-plugin-replace-taro-components',
    visitor: {
      ImportDeclaration(ast) {
        if (ast.node.source.value !== source) return

        ast.node.specifiers.forEach((node) => {
          if (t.isImportSpecifier(node) && t.isIdentifier(node.imported)) {
            for (const [target, replacer] of replacement) {
              if (target === node.imported.name) {
                node.imported.name = replacer
                break
              }
            }
          }
        })
      },
    },
  }
}
