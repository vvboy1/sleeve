/**
 * @作者 sun
 * @创建时间 2020/11/3 12:51
 */

'use strict'

import {Http} from "../utils/http"

class Category {
  static async getGridCategory(){
    return await Http.request({
      url:`category/grid/all`
    })
  }
}

export {
  Category
}