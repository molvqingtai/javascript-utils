import isEmpty from './is-empty.js'

/**
 * 帧定时器
 * @param  {Funct} func     [回调方法]
 * @param  {Number} timeout [超时时间]
 * @return {Promise}
 */
const asyncLoopTimer = (func, timeout = Infinity) => {
  const startTime = performance.now()
  return new Promise((resolve) => {
    const timer = async (nowTime) => {
      const data = await func()
      console.log(isEmpty(data))

      if (!isEmpty(data) || nowTime - startTime > timeout) {
        window.cancelAnimationFrame(timerId)
        resolve(data)
      } else {
        window.cancelAnimationFrame(timerId)
        timerId = window.requestAnimationFrame(timer)
      }
    }
    let timerId = window.requestAnimationFrame(timer)
  })
}

export default asyncLoopTimer
