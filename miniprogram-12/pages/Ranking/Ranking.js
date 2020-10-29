// pages/Ranking/Ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pursue:[
     {
      id:'1',
      Image:'../main/1.jpg',
      describe:'美好的一天，开始了 美好的一天，开始了',
      type:'海边',
      place:'北京'
     },
     {
      id:'2',
      Image:'../main/1.jpg',
      describe:'美好的一天，开始了 美好的一天，开始了',
      type:'海边',
      place:'北京'
     },
     {
      id:'3',
      Image:'../main/1.jpg',
      describe:'美好的一天，开始了 美好的一天，开始了',
      type:'海边',
      place:'北京'
     },
     {
      id:'4',
      Image:'../main/1.jpg',
      describe:'美好的一天，开始了 美好的一天，开始了',
      type:'海边',
      place:'北京'
     },
     {
      id:'5',
      Image:'../main/1.jpg',
      describe:'美好的一天，开始了 美好的一天，开始了',
      type:'海边',
      place:'北京'
     },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this
    wx.request({
      url: 'http://123.57.81.190/travel/rank/gain', 
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data) 
        that.setData({
          pursue:res.data.sort(that.compare('like'))
        })
      }
    })
    setInterval(() => {
      wx.request({
        url: 'test.php', //仅为示例，并非真实的接口地址
        // 这里接口地址没确定没加 
        // 注意 注意
        data: {
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data) 
          var arr = res.data
          that.setData({
            pursue:that.data.pursue.sort(that.compare('fabulous'))
          })
        }
      })
      console.log(res.data)
    }, 3600*1000);

  },
  compare:function(){
    return function(a,b){
      var value1 = a['fabulous']
      var value2 = b['fabulous']
      console.log(a)
      console.log(b)
      return value2-value1
    }
  },
  
  // 跳转详情页
  particulars:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../particulars/particulars?id=' +e.currentTarget.dataset.id +'&uid='+e.currentTarget.dataset.uid +'&spot='+ e.currentTarget.dataset.spot,
      success: function(res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'json' })
      }
    })
  }
})