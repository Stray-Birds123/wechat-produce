var app=getApp();
Page({

  data: {
   
  },

  onLoad:function(options){
  },

  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo',this)
    this.videoContext.requestFullScreen({direction:0})
  },

  videometa:function (e) {
    var that = this;
    //获取系统信息
    wx.getSystemInfo({
      success (res) {
        //视频的高
        var height = e.detail.height;
        
        //视频的宽
        var width = e.detail.width;
 
        //算出视频的比例
        var proportion = height/ width;
 
        //res.windowWidth为手机屏幕的宽。
        var windowWidth = res.windowWidth;
 
        //算出当前宽度下高度的数值
        height = proportion * windowWidth;
        that.setData({
          height,
          width:windowWidth
        });
      }
    })
  },
  gotoMain:function(){
    wx.switchTab({
      url: '../main/main',
    })
   
  }
})

