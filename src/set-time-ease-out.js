/**
 * 缓冲定时器
 * @param  {function} func       [回调方法]
 * @param  {number}   delay      [循环时长，默认 10000ms]
 * @param  {number}   startSpeed [开始速度，默认 100ms]
 * @param  {number}   endSpeed   [结束速度，默认 1000ms]
 * @return {promise<number>}     timestamp  [结束时间戳]
 */
const setTimeEaseOut = (func, options = {}) =>
  new Promise((resolve, reject) => {
    let { delay = 10000, startSpeed = 100, endSpeed = 1000 } = options
    const startTime = performance.now()
    const render = (endTime) => {
      cancelAnimationFrame(requestID)
      if (endTime - startTime < delay) {
        const timeoutID = setTimeout(() => {
          clearTimeout(timeoutID)
          try {
            func()
          } catch (error) {
            reject(error)
            return
          }
          startSpeed = ((endTime - startTime) / delay) * endSpeed
          requestID = requestAnimationFrame(render)
        }, startSpeed)
      } else {
        resolve(+new Date())
      }
    }
    let requestID = requestAnimationFrame(render)
  })

export default setTimeEaseOut
