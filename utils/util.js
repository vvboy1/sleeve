// promisic 接收了函数func 和 返回用来接收外部参数的函数，
// 返回的调用函数：因为返回出去，可以用来接收外部参数，还有最后返回promise
// 接收的函数func：可以用来接收微信api,然后内部调用，参数来自上面
// 最后内部把微信api返回参数封装承promise返回

// 代理模式
const promisic = function (func) {
  return function (params = {}) {

    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          reject(error)
        }
      })
      func(args)
    })

  }
}

const px2rpx = function (pxNumber) {
  const {screenWidth} = wx.getSystemInfoSync()
  const rpxNumber = (750 / screenWidth) * pxNumber
  return rpxNumber
}
//
// export {
//   promisic,
//   px2rpx
// };