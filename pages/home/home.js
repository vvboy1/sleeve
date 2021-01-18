// pages/home/home.js
import {Theme} from "../../model/theme"
import {Banner} from "../../model/banner"
import {Category} from "../../model/category"
import {Activity} from "../../model/activity"
import {SpuPaging} from "../../model/spu-paging"

Page({
  /**
   * 纯数据字段是仅仅被记录在this.data中,不参与任何界面渲染过程,可以用于提升页面更新性能。
   */
  options: {
    pureDataPattern: /^_/ // 指定所有_开头的数据字段为纯数据字段
  },

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    bannerB: null,
    gridC: [],
    activityD: null,
    themeE: null,
    themeESpu: [],
    themeF: null,
    themeH: null,
    bannerG: null,

    loadingType: 'loading',

    _spuPaging: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.initAllData()
    this.initBottomSpuList()
  },

  async initBottomSpuList(){
    const paging = SpuPaging.getLatestPaging()
    // 把paging对象保存下来，不可能触发下滑的时候new一个新的paging
    this.data._spuPaging = paging

    const data = await this.data._spuPaging.getMoreData()
    if (!data){
      return
    }
    // 传入数组数据,linUi自动把每个元素传入spu-preview
    // 第二个参数是否清空累加数据
    wx.lin.renderWaterFlow(data.items)

  },

  // 小程序自动生成的函数是ES5语法，这里定义是ES6语法
  async initAllData() {

    // 1.函数添加上async(异步)之后 返回值即成为了promise对象
    // ,如果不加速await，没啥作用
    // 2.await(等待)更多的是放一个返回promise 对象的表达式，它等待的是promise 对象的执行完毕，并返回结果(resolve值)
    // 清楚await是promise的语法糖呀！就相当于.then

    // 不加await返回的是promise对象
    const theme = new Theme()
    await theme.getThemes()
    // name = t-1
    // for(let theme of themes){
    //   if (theme.name=t-1)
    // }
    // 集合,函数式编程
    // find/filter/map/some/reduce

    // try {
    //   await xxx
    //   await xxx
    //   await xxx
    // } catch(e) {
    //   console.log(e)
    // }

    const themeA = theme.getHomeLocationA()
    const themeE = theme.getHomeLocationE()
    let themeESpu = []
    if (themeE.online) {
      const data = await theme.getHomeLocationESpu()
      if (data) {
        // list.slice(0,8)=>list[0,7]
        themeESpu = data.spu_list.slice(0, 8)
      }
    }
    const themeF = theme.getHomeLocationF()
    const themeH = theme.getHomeLocationH()

    const bannerB = await Banner.getHomeLocationB()
    const bannerG = await Banner.getHomeLocationG()

    const gridC = await Category.getHomelocationC()
    const activityD = await Activity.getHomelocationD()

    this.setData({
      themeA,
      bannerB,
      gridC,
      activityD,
      themeE,
      themeESpu,
      themeF,
      themeH,
      bannerG
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const data = await this.data._spuPaging.getMoreData()
    if(!data){
      return
    }
    wx.lin.renderWaterFlow(data.items)
    if(!data.moreData){
      this.setData({
        loadingType: 'end'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})