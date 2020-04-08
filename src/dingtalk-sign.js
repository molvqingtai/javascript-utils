import axios from 'axios'
import { isDingTalk } from 'dingtalk-javascript-env'
import dingtalk from 'dingtalk-javascript-sdk'

// 微应用 ID
const appCorpId = new URL(location).searchParams.get('appCorpId')

// 获取授权信息
const getAuthInfo = params => axios('http://sjs.dajiaok.com/winup-main/web/auth/jsAuth', { params }).then(res => res.data.content.data)
// 获取用户信息
const getUserInfo = params => axios('http://sjs.dajiaok.com/winup-main/web/auth/dingUser', { params }).then(res => res.data.content.data)

// 获取免登授权码
const getAuthCode = corpId => new Promise((resolve, reject) => {
  dingtalk.ready(() => dingtalk.apis.runtime.permission.requestAuthCode({
    corpId,
    onSuccess: ({ code }) => resolve(code),
    onFail: err => reject(err)
  }))
})

export default async () => {
  if (!isDingTalk) throw new Error('请在钉钉 APP 中打开！')
  if (!appCorpId) throw new Error('未识别到应用 ID！')
  const authInfo = await getAuthInfo({ appCorpId, url: location.href })
  if (!authInfo) throw new Error('获取授权信息失败！')
  const authCode = await getAuthCode(authInfo.dingCorpId)
  if (!authCode) throw new Error('获取授权码失败！')
  const userInfo = await getUserInfo({ corpId: appCorpId, code: authCode })
  if (!userInfo) throw new Error('获取用户信息失败！')
  return userInfo
}
