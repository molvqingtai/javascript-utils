/**
 * 类型检测
 * @param  {Any} value [检测对象]
 * @return {String}       [检测类型]
 */
const typeOf = value => Object.prototype.toString.call(value).match(/\s(\w+)/)[1]

export default typeOf
