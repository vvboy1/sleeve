/**
 * @作者 sun
 * @创建时间 2020/10/27 22:47
 */

'use strict'

import {Http} from "../utils/http"

class Banner {

  static locationB = 'b-1'
  static locationG = 'b-2'

  static getHomeLocationB(){
    return Http.request({
      url:`banner/name/${Banner.locationB}`
    })
  }
  static getHomeLocationG(){
    return Http.request({
      url:`banner/name/${Banner.locationG}`
    })
  }
}

export {
  Banner
}