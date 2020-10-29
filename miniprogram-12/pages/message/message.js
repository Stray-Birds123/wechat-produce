// pages/message/message.js
var app=getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    messages:[

    ],
    message:[
   
  ],
  guanzhu:{},
  xihuan:{},
  xtactive:1,
  ffavtive:0,
  fgactive:0,
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    // console.log(app.globalData.messages)
    // var that =this
    // var arr=app.globalData.messages.split(' ')
    // console.log(arr)
    // var add = new Object()
    // add.time = arr[0]  
    // add.headimg = arr[1]
    // add.nickname = arr[2]
    // add.messagetype = arr[3]
    // add.openid = arr[4]
    // console.log(add)
      
    // that.data.message.unshift(add);
      
    // console.log(that.data.message)
    // that.setData({
    //   message:that.data.message
    // })
    // console.log(arr)
  },

  findsystem(e){
    var that=this
    that.setData({
      xtactive:1, 
      fgactive:0,
      ffactive:0,
    })
  },
  // 关注自己的人
  findGuan(e){
    var that = this
    console.log(app.globalData.id)
    wx.request({
      url: 'http://123.57.81.190/travel/interact/findAttentionGuan', //仅为示例，并非真实的接口地址
      // 这里接口地址没确定没加 
      // 注意 注意
      data: {
        userId:app.globalData.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data) 
        that.setData({
          guanzhu:res.data.AttentionUsers
        })
      }
    })
    that.setData({
      xtactive:0,
      fgactive:1,
      ffactive:0,
    })
  },
  findFen(e){
    var that = this
    wx.request({
      url: 'http://123.57.81.190/travel/interact/findAttentionFen', //仅为示例，并非真实的接口地址
      // 这里接口地址没确定没加 
      // 注意 注意
      data: {
        userId:app.globalData.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data) 
        that.setData({
          xihuan:res.data.AttentionUsers
        })
      }
    })
    that.setData({
      xtactive:0,
      fgactive:0,
      ffactive:1,
    })
  },
  // 跳转详情页
  particulars:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../particulars/particulars?id=' +e.currentTarget.dataset.id,
      success: function(res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'json' })
      }
    })
  },
  
  onShow(){
    // 为保证主页的点赞和关注可以同步加入页面监听
    var that = this
    console.log(app.globalData.id)
    wx.request({
      url: 'http://123.57.81.190/travel/interact/findAttentionGuan', 
      data: {
        userId:app.globalData.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data) 
        that.setData({
          guanzhu:res.data.AttentionUsers
        })
      }
    })

    wx.request({
      url: 'http://123.57.81.190/travel/interact/findAttentionFen', 
      data: {
        userId:app.globalData.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data) 
        that.setData({
          xihuan:res.data.AttentionUsers
        })
      }
    })
    console.log('a')
    console.log(app.globalData.messages)
    var that =this
    if(app.globalData.messages==''){

    }else{
      var arr=app.globalData.messages.split(' ')
      console.log(arr)
      var add = new Object()
      add.time = arr[0]  
      add.headimg = arr[1]
      add.nickname = arr[2]
      add.messagetype = arr[3]
      add.openid = arr[4]
      console.log(add)
      
      that.data.message.unshift(add);
        
      console.log(that.data.message)
      that.setData({
        message:that.data.message
      })
      app.globalData.messages=''
    }
    console.log(arr)
  }
  
})