[TOC]	

# JavaScript Utils library

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) 

JavaScript 常用函数工具库，持续更新中...

编辑规范：本着不要重复造轮子的原则，新增工具函数不要和前端常用工具库重复，如 [loadsh](https://lodash.com/) 等。



## USAGE

**esm**

```javascript
import * as utils from 'javascript-utils'
import * as utils from 'javascript-utils/src/index.js'
```

**commonjs**

```javascript
const utils = require('javascript-utils')
const utils = require('javascript-utils/dist/index.js')
```

**link**

```html
<script src="javascript-utils/dist/index.js"></script>
```



## DOCS

### typeOf

> 类型检测，返回一个布尔值

**Targets**

web, node

**Arguments**

value (Any): 必选，检测对象

**Rturns**

(Boolean): 检测结果

**Example**

```javascript
typeOf([1,2,3,4,5,6]) === 'Array' // => true

typeOf('molvqingtai') === 'String' // => true

typeOf({name:'john'}) === 'Object' // => true
```



### isEmpty

> 空值检测，返回一个布尔值

**Targets**

web, node

**Arguments**

value (Any): 必选，检测对象

**Rturns**

(Boolean): 检测结果

**Example**


```javascript
isEmpty([]) // => true

isEmpty({}) // => true

isEmpty(null) // => true

isEmpty(undefined) // => true

isEmpty(0) // => false

isEmpty(true) // => false

isEmpty(false) // => false
```



### asyncLoopTimer

> 异步定时器，循环执行一个函数直到返回的值不为空，或超出设定时间

**Targets**

web

**Arguments**

function (Function): 必选，执行函数

timeout (Number): 可选，超时时间，默认为 Infinity

**Rturns**

(Promise): 循环执行函数的最后一次执行结果

**Example**

```javascript
const log = message => console.log(message)
asyncLoopTimer(() => log(+new Date()), 1000).then(res => log(`timeout: ${res}`))

// => 1573044921270
// => 1573044921286
// => 1573044921304
// => 1573044921319
// => 1000ms later...
// => timeout: undefined
```



### asyncQuerySelector

> 异步 css 选择器，返回一个被选择器匹配的元素数组，超时则返回一个空数组

**Targets**

web

**Arguments**

selector (String):必选， css 选择器

timeout (Number): 可选，超时时间，默认为 Infinity

**Rturns**

(Promise): 匹配结果

**Example**

```javascript
asyncQuerySelector('#button',Infinity).then(res => {
  const [button] = res
	button.click()
})

setTimeout(() => {
	const button = document.createElement('button')
	button.id = 'button'
	button.innerText = 'Async Button'
	button.onclick = e => console.log('hello! I\'m, async button.')
	document.body.appendChild(button)
},3000)

// => hello! I'm, async button.
```



### asyncQueryRegexor

> 异步 attribute 选择器，返回一个被正则匹配的元素数组，超时则返回一个空数组，默认超时为 Infinity

**Targets**

web

**Arguments**

attribute (String): 必选，属性名称

regexor (RegExp): 必选，匹配正则

timeout (Number): 可选，超时时间，默认为 Infinity

**Rturns**

(Promise): 匹配结果

**Example**

```javascript
asyncQueryRegexor('id',/button/,Infinity).then(res => {
  const [button] = res
	button.click()
})

setTimeout(() => {
	const button = document.createElement('button')
	button.id = 'button'
	button.innerText = 'Async Button'
	button.onclick = e => console.log('hello! I\'m, async button.')
	document.body.appendChild(button)
},3000)

// => hello! I'm, async button.
```



### fileToData

> 文件转换为数据，默认输出类型为 DataURL

**Targets**

web

**Arguments**

file (File,Blob): 必选，文件对象

type (String): 可选， 数据类型，默认为 DataURL

* Text
* DataURL
* ArrayBuffer
* BinaryString

**Rturns**

(Promise): 转换结果

**Example**

```javascript
const input = document.querySelector('input')
input.onchange = async e => {
  const dataURL = await fileToData(e.target.files[0])
  console.log(dataURL)
}

// => data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA...
```



### imageToFile

> 图片转换为文件，图片类型为 image/png 时，quality 参数将失效，默认输出 image/jpeg 类型；传入方向参数时，将自动校正图片方向

**Targets**

web

**Arguments**

image (HTMLImageElement,HTMLCanvasElement): 必选，图片或画布元素

option (Object): 可选，输出选项

* type(String) 图片类型，默认为 image/jpeg
* quality(Number) 图片质量 0～1，默认为 1
* orientation(Number) 图片方向 1～8，默认为 1

**Rturns**

(Promise): 转换结果

**Example**

```javascript
const image = document.querySelector('image')
const file = await imageToFile(image,0.5)
console.log(file)

// => File object
```



### urlToImage

> 链接转换为图片，跨域图片需设置 cors

**Arguments**

url (String): 必选，图片链接

cors (Boolean): 可选，是否跨域，默认为 false

**Rturns**

(Promise): 转换结果

**Example**

```javascript
const url = 'https://www.example.com/example.jpeg'
const image = await urlToImage(url, true)
console.log(image)

// => Image object
```



### jsonToExcel
> Json 数据转 Excel 文件

**Arguments**

sheets(Array): 必选，Excel Sheet 列表

download(String): 可选，下载 Excel 文件名称，如果有此参数将尝试客户端下载

**Rturns**

(ArrayBuffer||Url): 默认返回 ArrayBuffer，有 download 参数则返回 Blob Url

**Example**

```javascript
const sheets = [
  {
    name: 'sheet-1',
    body: [
      { '列1': 1, '列2': 2, '列3': 3 },
      { '列1': 4, '列2': 5, '列3': 6 }
    ]
  },
  {
    name: 'sheet-2',
    body: [
      { '列1': 1, '列2': 2, '列3': 3 },
      { '列1': 4, '列2': 5, '列3': 6 }
    ]
  }
]

jsonToExcel(sheets) // => ArrayBuffer
jsonToExcel(sheets,'file-name') // => file-name.xlsx 

```



### dingtalkSign

> 钉钉微应用授权

**Example**

```javascript
const userInfo = await dingtalk()
console.log(userInfo)
```

