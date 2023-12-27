import { attempt, getTag } from '@min-kit/shared'
import { getStorageInfoSync, getStorageSync } from '@tarojs/taro'

export enum StorageType {
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  Array = 'Array',
  Object = 'Object',
  Date = 'Date',
  Null = 'Null',
  Unknown = 'Unknown',
}

export interface IStorageData {
  key: string
  value: any
  valueString: string
  type: StorageType
}

export interface IStorageInfo extends Pick<Taro.getStorageInfoSync.Option, 'currentSize' | 'limitSize'> {
  data: IStorageData[]
}

export class StorageService {
  static typing(value: any) {
    const supports = Object.values(StorageType)
    const tag = getTag(value)

    return supports.find((i) => tag.includes(i)) || StorageType.Unknown
  }

  static stringify(value: any) {
    let valueString = ''

    const type = StorageService.typing(value)
    switch (type) {
      case StorageType.String:
      case StorageType.Number:
      case StorageType.Boolean:
      case StorageType.Date:
        valueString = value.toString()
        break
      case StorageType.Array:
      case StorageType.Object:
        try {
          valueString = JSON.stringify(value)
        } catch (_) {}
        break
      case StorageType.Null:
        valueString = 'null'
        break
    }

    return { type, valueString }
  }

  static get(key: string): IStorageData {
    const value = attempt(getStorageSync, key)

    if (value === undefined) {
      return { key, value: '', valueString: '', type: StorageType.Unknown }
    }

    return { key, value, ...StorageService.stringify(value) }
  }

  static parse(valueString: string, type: StorageType) {
    switch (type) {
      case StorageType.String:
        return valueString
      case StorageType.Number:
      case StorageType.Date:
        const n = Number(valueString)
        if (!Number.isNaN(n)) return type === StorageType.Number ? n : new Date(n)
        break
      case StorageType.Boolean:
        if (valueString === 'true') return true
        else if (valueString === 'false') return false
        break

      case StorageType.Array:
      case StorageType.Object:
        try {
          return JSON.parse(valueString)
        } catch (_) {}
        break
      case StorageType.Null:
        return null
    }
  }

  static info(): IStorageInfo {
    const { keys, currentSize, limitSize } = getStorageInfoSync()

    const data = keys.map(StorageService.get)

    return { data, currentSize, limitSize }
  }
}
