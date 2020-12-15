import typeOf from './type-of.js'

/**
 * 空值检测
 * by: 墨绿青苔 2019-8-16
 * @param  {Any} value [检测对象]
 * @return {Boolean}   [是否为空]
 */
const typesMap = new Map([
  ['Null', () => true],
  ['Date', () => false],
  ['Math', () => false],
  ['Number', () => false],
  ['RegExp', () => false],
  ['Symbol', () => false],
  ['Boolean', () => false],
  ['Function', () => false],
  ['Undefined', () => true],
  ['String', (value) => !value],
  ['Set', (value) => !value.size],
  ['Map', (value) => !value.size],
  ['Array', (value) => !value.length],
  ['Object', (value) => !Object.entries(value).length],
  ['FormData', (value) => ![...value.keys()].length],
  ['File', () => false],
  ['Blob', () => false],
  ['Response', () => false],
  ['Request', () => false]
])

const isEmpty = (value) => (value instanceof Element ? typesMap.get(typeOf(value))(value) : false)

export default isEmpty
