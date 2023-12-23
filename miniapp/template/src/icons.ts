import { Icon } from '@min-kit/components'
import { logger } from '@min-kit/extends'

const r = require.context('./assets/icons', false, /\.(svg|png|jpg)$/, 'sync')

Icon.load(
  r.keys().reduce((cache, key) => {
    const name = key.slice(2).replace(/\.(svg|png|jpg)$/, '')
    cache[name] = r(key)
    return cache
  }, {}),
)

logger.debug('#icons', Icon.configs)
