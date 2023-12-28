import { createContext } from 'react'

import type { MinDebuggerOptions } from '../types'

export const OptionsContext = createContext<MinDebuggerOptions>({})
