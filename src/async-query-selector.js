import asyncLoopTimer from './async-loop-timer.js'

/**
 * css 异步选择器
 * @param  {String} selector [CSS选择器]
 * @param  {Number} timeout  [超时时间]
 * @return {Promise}         [Array]
 */
const asyncQuerySelector = (selector, timeout) => {
  return asyncLoopTimer(() => {
    return [...document.querySelectorAll(selector)]
  }, timeout)
}

export default asyncQuerySelector
