'use strict'
// 业务对象
// theme,banner,sku,spu,address,user等是业务对象，home不是

import {Http} from "../utils/http"

class Theme {

  static locationA = 't-1'
  static locationE = 't-2'
  static locationF = 't-3'
  static locationH = 't-4'

  themes = []

  async getThemes(){// 获取一组主题
    const names = `${Theme.locationA},${Theme.locationE},
    ${Theme.locationF},${Theme.locationH}`

    this.themes = await Http.request({
      url: `theme/by/names`,
      data: {
        names
      }
    })
  }

  // 为什么要static，后面有不用静态的方法就知道了
  // 用业务比较强的命名不合适，如果这里以后不是sale，就不合适了
  getHomeLocationA() {
    return this.themes.find(t=>t.name===Theme.locationA)
  }

  getHomeLocationE() {
    return this.themes.find(t=>t.name===Theme.locationE)
  }

  getHomeLocationF() {
    return this.themes.find(t=>t.name===Theme.locationF)
  }

  getHomeLocationH() {
    return this.themes.find(t=>t.name===Theme.locationH)
  }
  // async只是保证返回promise，这里肯定返回就没必要加了
  // await等待promise结果
  getHomeLocationESpu(){
    console.log(this.getThemeSpuByName(Theme.locationE))
    return this.getThemeSpuByName(Theme.locationE)
  }
  // 看数据是否保存状态来考虑是否需要static
  // 如果是一次性的获取，就考虑用static
  async getThemeSpuByName(name){
    return await Http.request({
      url: `theme/name/${name}/with_spu`
    })
  }
}


export {
  Theme
}

