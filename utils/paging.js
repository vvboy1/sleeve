/**
 * @作者 sun
 * @创建时间 2021/1/17 19:51
 */

'use strict'

import {Http} from "./http"

class Paging{

  start
  count
  req
  // true为锁住
  locker = false
  url
  moreData = true
  accumulator = []

  constructor(req,count=10,start=0) {
    this.start = start
    this.count = count
    this.req = req
    this.url = req.url
  }

  async getMoreData() {
    if(!this.moreData){
      return
    }
    // 获取不到锁
    if (!this._getLocker()) {
      return
    }

    const data = await this._actualGetData()

    this._releaseLocker()

    return data
  }

  // 发起请求
  async _actualGetData() {
    // 数据结构
    // return {
    //   empty: boolean, // 是否为空
    //   items: [],      // 当前分页数据
    //   moreData: boolean,// 是否还有更多数据
    //   accumulator: []  // 累加数据
    // }

    const req = this._getCurrentReq()
    let paging = await Http.request(req)
    if (!paging) {
      return null
    }
    if (paging.total === 0) {
      return {
        empty: true,
        items: [],
        moreData: false,
        accumulator: []
      }
    }

    this.moreData = Paging._moreData(paging.total_page, paging.page)

    if (this.moreData) {
      this.start += this.count
    }

    this._accumulator(paging.items)

    return {
      empty: false,
      items: paging.items,
      moreData: this.moreData,
      accumulator: []
    }

  }

  _accumulator(items){
    this.accumulator = this.accumulator.concat(items)
  }

  static _moreData(totalPage,pageNum){
    // pageNum从0开始
    return pageNum < totalPage-1
  }

  // 可以不拼接，把参数放到data
  _getCurrentReq(){
    let url = this.url
    const params = `start=${this.start}&count=${this.count}`
    // url = v1/spu/latest + '?' + params
    // url = v1/spu/latest?other=abc + '&' + params
    if(url.includes('?')){//url.indexOf('?')!==-1
      url += '&' + params
    }else {
      url += '?' + params
    }
    // 可以Object.assign({},this.req,{url})，不需要多创建成员变量url
    this.req.url = url
    return this.req
  }

  // locker为false才能获取到锁，返回true
  _getLocker(){
    // 编程原则：多用return提前结束函数。少用else
    if(this.locker){
      return false
    }
    this.locker = true
    return true
  }
  _releaseLocker(){
    this.locker = false
  }
}

export {
  Paging
}