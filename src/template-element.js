import typeOf from './type-of'

/**
 * 字符串模板创建元素
 * @param {String} template [元素模板]
 * @return {Element} 元素对象
 */
const templateElement = template => {
  typeOf(template) !== 'String' && new Error('Template must be a string.')
  return new Range().createContextualFragment(template).firstElementChild
}

export default templateElement
