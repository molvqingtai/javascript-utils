/**
 * 类型检测
 * @param  {Any} value [检测对象]
 * @return {String}       [检测类型]
 */
const typeOf = value => Object.prototype.toString.call(value).slice(8, -1)

export default typeOf
