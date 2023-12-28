import { useMinDebugger } from './hooks/useMinDebugger'
import Debugger from './ui/debugger'

export const MinDebugger = Object.assign(Debugger, { use: useMinDebugger })
export type * from './types'
