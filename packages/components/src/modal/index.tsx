import confirm from './confirm'
import Drawer from './drawer'
import { withOpen } from './with'

const Modal = Object.assign(Drawer, { with: withOpen, confirm })

export { Modal }
export type * from './types'
