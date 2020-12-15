import isEmpty from './is-empty.js'

/**
 * 帧定时器
 * @param  {Funct} func     [回调方法]
 * @param  {Number} timeout [超时时间]
 * @return {Promise}
 */
const asyncLoopTimer = (func, timeout = Infinity) => {
  return new Promise((resolve) => {
    let timerId = null
    const startTime = +new Date()
    const timer = async () => {
      const nowTime = +new Date()
      const data = await func()
      if (!isEmpty(data) || nowTime - startTime > timeout) {
        window.cancelAnimationFrame(timerId)
        resolve(data)
      } else {
        window.cancelAnimationFrame(timerId)
        timerId = window.requestAnimationFrame(timer)
      }
    }
    timerId = window.requestAnimationFrame(timer)
  })
}

export default asyncLoopTimer
