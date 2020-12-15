import typeOf from './type-of.js'

/**
 * 绘制图片
 * @param  {[type]} image       [description]
 * @param  {[type]} orientation [description]
 * @return {[type]}             [description]
 */
const drawImage = (image, orientation) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const { naturalWidth: width, naturalHeight: height } = image
  new Map([
    // 0°
    [
      1,
      () => {
        canvas.width = width
        canvas.height = height
        ctx.drawImage(image, 0, 0, width, height)
      }
    ],
    // 水平翻转
    [
      2,
      () => {
        canvas.width = width
        canvas.height = height
        ctx.transform(-1, 0, 0, 1, 0, 0)
        ctx.drawImage(image, 0, 0, width, height)
      }
    ],
    // 180°
    [
      3,
      () => {
        canvas.width = width
        canvas.height = height
        ctx.transform(-1, 0, 0, -1, 0, 0)
        ctx.drawImage(image, -width, -height, width, height)
      }
    ],
    // 垂直翻转
    [
      4,
      () => {
        canvas.width = width
        canvas.height = height
        ctx.transform(1, 0, 0, -1, 0, 0)
        ctx.drawImage(image, -width, -height, width, height)
      }
    ],
    // 顺时针90° + 水平翻转
    [
      5,
      () => {
        canvas.width = height
        canvas.height = width
        ctx.transform(0, -1, -1, 0, 0, 0)
        ctx.drawImage(image, 0, -height, width, height)
      }
    ],
    // 顺时针90°
    [
      6,
      () => {
        canvas.width = height
        canvas.height = width
        ctx.transform(0, 1, -1, 0, 0, 0)
        ctx.drawImage(image, 0, -height, width, height)
      }
    ],
    // 顺时针90°+垂直翻转
    [
      7,
      () => {
        canvas.width = height
        canvas.height = width
        ctx.transform(0, 1, -1, 0, 0, 0)
        ctx.drawImage(image, -width, 0, width, height)
      }
    ],
    // 逆时针90°
    [
      8,
      () => {
        canvas.width = height
        canvas.height = width
        ctx.transform(0, -1, 1, 0, 0, 0)
        ctx.drawImage(image, -width, 0, width, height)
      }
    ]
  ]).get(orientation)()
  return canvas
}

/**
 * 图片转换为文件
 * @param  {Element}  image  [图片源]
 * @param  {Object}  option [输出选项]
 * @return {Promise}        [输出文件]
 */
const imageToFile = async (image, option) => {
  const { quality, type, orientation } = {
    type: 'image/jpeg',
    quality: 1,
    orientation: 1,
    ...option
  }
  return new Promise((resolve, reject) => {
    typeOf(image) !== 'HTMLImageElement' &&
      typeOf(image) !== 'HTMLCanvasElement' &&
      reject(new Error('Image must be a element.'))
    typeOf(quality) !== 'Number' && reject(new Error('Quality must be a number.'))
    typeOf(type) !== 'String' && reject(new Error('Quality must be a string.'))
    typeOf(orientation) !== 'Number' && reject(new Error('Orientation must be a number.'))
    try {
      drawImage(image, orientation).toBlob((blob) => resolve(blob), type, quality)
    } catch (e) {
      reject(e)
    }
  })
}

export default imageToFile
