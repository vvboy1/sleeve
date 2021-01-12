// pages/home/home.js
import {Theme} from "../../model/theme"
import {Banner} from "../../model/banner"
import {Category} from "../../model/category"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    bannerB: null,
    grid: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.initAllData()
  },

  // 小程序自动生成的函数是ES5语法，这里定义是ES6语法
  async initAllData(){

    // 1.函数添加上async(异步)之后 返回值即成为了promise对象
    // ,如果不加速await，没啥作用
    // 2.await(等待)更多的是放一个返回promise 对象的表达式，它等待的是promise 对象的执行完毕，并返回结果(resolve值)
    // 清楚await是promise的语法糖呀！就相当于.then

    // 不加await返回的是promise对象
    const themeA = await Theme.getHomeLocationA()
    // try {
    //   await xxx
    //   await xxx
    //   await xxx
    // } catch(e) {
    //   console.log(e)
    // }

    const bannerB = await Banner.getHomeLocationB()
    const grid = await Category.getGridCategory()


    this.setData({
      themeA:themeA[0],
      bannerB,
      grid
    })
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})