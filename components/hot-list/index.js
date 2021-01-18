Component({
  properties: {
    banner:Object
  },
  // 监听器
  observers:{
    // 可监听多个属性：'banner,theme':function(banner,theme)
    'banner':function(banner){
      if(!banner){
        return
      }
      if(banner.items.length === 0){
        return
      }

      const left = banner.items.find(i=>i.name==='left')
      const rightTop = banner.items.find(i=>i.name==='right-top')
      const rightBottom = banner.items.find(i=>i.name==='right-bottom')

      this.setData({
        left,
        rightTop,
        rightBottom
      })
    }
  },
  data: {},
  methods: {}
})
