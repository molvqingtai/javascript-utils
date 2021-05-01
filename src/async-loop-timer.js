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
      cancelAnimationFrame(requestID)
      const data = await func()
      if (!isEmpty(data) || nowTime - startTime > timeout) {
        resolve(data)
      } else {
        requestID = requestAnimationFrame(timer)
      }
    }
    let requestID = requestAnimationFrame(timer)
  })
}

export default asyncLoopTimer
