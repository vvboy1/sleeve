/**
 * @作者 sun
 * @创建时间 2021/1/17 12:18
 */

'use strict'

import {Paging} from "../utils/paging"

class SpuPaging {
  static getLatestPaging(){
    return new Paging({
      url: `spu/latest`
    },3,0)
  }
}

export {
  SpuPaging
}