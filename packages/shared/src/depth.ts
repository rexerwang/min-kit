export const MAX_Z_DEPTH = 999999
export const MIN_Z_DEPTH = 999

let zDepth = MIN_Z_DEPTH - 1
export const getZDepth = () => ++zDepth
