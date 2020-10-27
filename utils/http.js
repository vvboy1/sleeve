import {config} from "../config/config"
import {promisic} from "./util"

class Http {

  static request({url,data,callback,method='GET'}){

    // promisic()接收wx.request作为参数，wx.request不要加()，不然就是调用了
    // promisic(wx.request)返回一个函数，然后在后面加()调用，如：
    // promisic(wx.request)(),还有wx.request本来要接收的参数如下传入：
    // promisic(wx.request)({
    //   url:'',
    //   data:data
    // })

    wx.request({
      // 模板字符串 ES6
      url:`${config.apoBaseUrl}${url}`,
      method,
      data,
      header: {
        appKey:config.appKey
      },
      // 箭头函数 this指向问题
      success:res=>{
        // console.log(res)
        callback(res.data)
        // this.setData({
        //   topTheme:res.data[0]
        // })
      }
    })

  }
}

export {
  Http
}