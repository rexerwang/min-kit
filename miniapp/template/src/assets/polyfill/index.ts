// Polyfill `promise.finally` on iOS
if (typeof Promise.prototype.finally !== 'function') {
  Promise.prototype.finally = function (onfinally) {
    return this.then((value: any) => this.constructor.resolve(onfinally?.()).then(() => value)).catch((reason: any) =>
      this.constructor.resolve(onfinally?.()).then(() => {
        throw reason
      }),
    )
  }
}

// Polyfill `Math.trunc`
if (typeof Math.trunc !== 'function') {
  Math.trunc = function (x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x)
  }
}

// Polyfill `Array.at`
if (typeof Array.prototype.at !== 'function') {
  Array.prototype.at = function (index) {
    index = Math.trunc(index) || 0
    if (index < 0) index += this.length
    if (index < 0 || index >= this.length) return undefined
    return this[index]
  }
}
