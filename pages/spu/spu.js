import {Http} from "../../utils/http"

Page({
  data: {
    state: 'unselect',
    selectSku:[]
  },
  onLoad: async function (options) {

    const data = await Http.request({
      url: `spu/id/2/detail `
    })
    const sku_list = data.sku_list

    this.data.list = this.getViewList(sku_list)

    const unselectSku = this.getNotSelectSku()
    const selectSku = this.getSelectSku()

    this.setData({
      list:this.data.list,
      sku_list,
      skuTitle:sku_list[0],
      unselectSku,
      selectSku
    })
  },
  /**
   * 转换数据结构
   */
  getViewList(sku_list){
    const map = new Map()
    for (const sku of sku_list) {
      for (const specsItem of sku.specs){
        if(map.has(specsItem.key)){
          if(map.get(specsItem.key).every(t=>t.value_id!==specsItem.value_id)){
            map.get(specsItem.key).push(Object.assign(specsItem,{'state':'unselect'}))
          }
        }else {
          map.set(specsItem.key,[Object.assign(specsItem,{'state':'unselect'})])
        }
      }
    }
    const list = []
    map.forEach((v,k)=>{
      list.push({
        'key':k,
        'value':v
      })
    })
    return list
  },
  /**
   * 点击事件
   * @param {} e 
   */
  select(e){
    const selectObjec =  e.currentTarget.dataset.selectObjec
    // 如果是禁用状态，就不显示了
    if(selectObjec.state === 'disable'){
      return
    }
    // 输入需要改变状态的选中对象
    this.Change(selectObjec)

    this.OtherChanges(selectObjec);

    const unselectSku = this.getNotSelectSku()
    const selectSku = this.getSelectSku()

    const skuTitle = this.changeTitle()

    console.log(skuTitle)

    if(skuTitle){
      this.setData({
        list:this.data.list,
        selectSku,
        unselectSku,
        skuTitle
      })
    }else{
      this.setData({
        list:this.data.list,
        unselectSku,
        selectSku
      })
    }
  },
  changeTitle(){

    let selectList = this.getSelectSku()

    for(let item of this.data.sku_list){
      // 每个item.specs都是一组sku
      let count = 0
      for(let i of item.specs){
        // 循环一组sku，看看选中的sku有多少个和这组一样
        const d = selectList.findIndex(select=>{
          return select.value_id===i.value_id
        })
        if(d!==-1){
          count++
        }
      }
      if(selectList.length===count&&count===this.data.sku_list[0].specs.length){
        // console.log(this.data.sku_list.specs.length+"-"+count)
        return item
      }
    }
    return null
  },
  getNotSelectSku(){
    const selectList = this.getSelectSku()

    let resList = []
    this.data.list.forEach((item,index1)=>{
      const s = selectList.findIndex(t=>t.key===item.key)
      if(s===-1){
        resList.push(item.key)
      }
    })

    return resList
  },
  /**
   * 获取selectObjec和已选按钮组合的sku
   * @param {*} selectObjec 
   */
  getSelectSku(selectObjec=null){

    let resList = []

    if(selectObjec!=null){
      resList.push(selectObjec)
      this.data.list.forEach((item,index1)=>{
        item.value.forEach((i,index2)=>{
          if(i.state==='select'&&i.value_id!==selectObjec.value_id&&i.key_id!=selectObjec.key_id){
            resList.push(i)
          }
        })
      })
    }else{
      this.data.list.forEach((item,index1)=>{
        item.value.forEach((i,index2)=>{
          if(i.state==='select'){
            resList.push(i)
          }
        })
      })
    }

    return resList
  },
  /**
   * 判断selectList的sku组合是否被包含
   * @param {*} selectList 
   */
  include(selectList){
    for(let item of this.data.sku_list){
      // 每个item.specs都是一组sku
      let count = 0
      for(let i of item.specs){
        // 循环一组sku，看看选中的sku有多少个和这组一样
        const d = selectList.findIndex(select=>{
          return select.value_id===i.value_id
        })
        if(d!==-1){
          count++
        }
      }
      if(selectList.length===count){
        return true
      }
    }
    return false
  },
  OtherChanges(onlin){
    this.data.list.forEach((item,index1)=>{
      item.value.forEach((i,index2)=>{
        if(i.state!=='select'&&i.value_id!==onlin.value_id){
          let dsku = this.getSelectSku(i)
          if(this.include(dsku)){
            this.data.list[index1].value[index2].state =  'unselect'
          }else{
            this.data.list[index1].value[index2].state = 'disable'
          }
        }
      })
    })
  },
  // 改变选中对象行的状态
  Change(onlin){
    this.data.list.forEach((item,index1)=>{
      if(item.key===onlin.key){
          item.value.forEach((i,index2)=>{
          if(i.key_id===onlin.key_id){
            if(i.value===onlin.value){
              if(onlin.state === 'select'){
                this.data.list[index1].value[index2].state = 'unselect'
              }else{
                this.data.list[index1].value[index2].state = 'select'
              }
            }
            else{
              if(onlin.state === 'unselect'&&this.data.list[index1].value[index2].state!=='disable'){
                this.data.list[index1].value[index2].state = 'unselect'
              }
            }
          } 
        })
      }
    })
  }
})