Component({
  properties: {
    data: Object
  },
  observers:{
    data:function(data){
      if (!data){
        return
      }
      if (!data.tags){
        return
      }
      const tags = data.tags.split('$')
      this.setData({
        tags
      })
    }
  },
  data: {
    tags: Array
  },
  methods: {
    onImgLoad(event){
      // 得到图片真实宽高，单位px
      const {width,height} = event.detail
      // 已知图片宽设置340rpx,求高h
      // width/height = 340rpx/h
      this.setData({
        w:340,
        h:340*height/width
      })
    }
  }
})
