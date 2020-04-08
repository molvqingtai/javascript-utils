import asyncLoopTimer from './async-loop-timer.js'

/**
 * regex 异步选择器
 * @param  {String} attribute [属性名称]
 * @param  {RegExp} regex     [匹配正则]
 * @param  {Number} timeout   [超时时间]
 * @return {Promise}          [Array]
 */
const asyncQueryRegexor = (attribute, regex, timeout) => {
  return asyncLoopTimer(() => {
    return [...document.querySelectorAll(`[${attribute}]`)].filter(element => regex.test(element.getAttribute(attribute)))
  }, timeout)
}

export default asyncQueryRegexor
