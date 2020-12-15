import typeOf from './type-of.js'

/**
 * 链接转图片
 * @param  {String}  url          [图片链接]
 * @param  {Boolean} [cors=false] [跨域选项]
 * @return {[type]}               [输出图片]
 */
const urlToImage = (url, cors = false) => {
  return new Promise((resolve, reject) => {
    typeOf(url) !== 'String' && reject(new Error('Url must be a string.'))
    typeOf(cors) !== 'Boolean' && reject(new Error('Url must be a boolean.'))

    const image = new Image()
    cors && (image.crossOrigin = 'Anonymous')
    image.src = url
    image
      .decode()
      .then(() => resolve(image))
      .catch((e) => reject(e))
  })
}

export default urlToImage
