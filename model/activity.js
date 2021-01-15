/**
 * @作者 sun
 * @创建时间 2021/1/14 18:03
 */

'use strict'


import {Http} from "../utils/http"

class Activity{

  static locationD = 'a-2'

  static getHomelocationD(){
    return Http.request({
      url:`activity/name/${Activity.locationD}`
    })
  }

}

export {
  Activity
}