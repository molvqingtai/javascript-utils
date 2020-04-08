import typeOf from './type-of.js'

/**
 * 空值检测
 * by: 墨绿青苔 2019-8-16
 * @param  {Any} value [检测对象]
 * @return {Boolean}   [是否为空]
 */
const typesMap = new Map([
  ['Null', value => true],
  ['Date', value => false],
  ['Math', value => false],
  ['Number', value => false],
  ['RegExp', value => false],
  ['Symbol', value => false],
  ['Boolean', value => false],
  ['Function', value => false],
  ['Undefined', value => true],
  ['String', value => !value],
  ['Set', value => !value.size],
  ['Map', value => !value.size],
  ['Array', value => !value.length],
  ['Object', value => !Object.entries(value).length]
])

const isEmpty = value => !(value instanceof Element) ? typesMap.get(typeOf(value))(value) : false

export default isEmpty
