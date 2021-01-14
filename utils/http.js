import {config} from "../config/config"
import {promisic} from "../miniprogram_npm/lin-ui/utils/util"

class Http {

  // 函数加上async一定返回promise,哪怕是返回123也会封装成promise
  // 函数内部出现await，这个函数必须加上async
  // 异步函数前面加上await,使用await前提是这个函数调用返回结果,就算返回的不是promise
  // 但是如果返回的不是promise，加上await没有意义
  static async request({
                         url,
                         data,
                         method = 'GET'
                       }) {
    // 把微信api的[回调函数方式]封装成返回promise
    const res = await promisic(wx.request)({
      // 模板字符串 ES6
      url: `${config.apoBaseUrl}${url}`,
      method,
      data,
      header: {
        appKey: config.appKey
      }
    })

    return res.data
  }
}

// 处理异步三种形式
// callback
// promise
// async await


export {
  Http
}