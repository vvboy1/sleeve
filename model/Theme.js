/**
 * @作者 sun
 * @创建时间 2020/10/27 0:40
 */

'use strict'
// 业务对象
// theme,banner,sku,spu,address,user等是业务对象，home不是

import {config} from "../config/config"
import {Http} from "../utils/http"

class Theme {
  // 为什么要static，后面有不用静态的方法就知道了
  // 用业务比较强的命名不合适，如果这里以后不是sale，就不合适了
  static getHomeLocationA(callback){
    Http.request({
      url: `theme/by/names`,
      data: {
        names: 't-1'
      },
      callback:data=>{
        callback(data)
      }
    })
  }
}


export {
  Theme
}

