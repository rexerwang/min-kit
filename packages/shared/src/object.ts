export const getTag = (o: any): string => Object.prototype.toString.call(o)

export function defineProperty<T>(o: T, prop: keyof T, attrs: PropertyDescriptor) {
  return Object.defineProperty(o, prop, {
    enumerable: true,
    ...attrs,
  })
}

export const defineProperties = Object.defineProperties
