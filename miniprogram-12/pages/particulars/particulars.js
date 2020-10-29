// pages/particulars/particulars.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc: ['1.jpg','2.jpg','3.jpg'],
    //是否采用衔接滑动
    circular: true,
    //是否显示画板指示点
    indicatorDots: false,
    //选中点的颜色
    indicatorcolor: "#000",
    //是否竖直
    vertical: false,
    //是否自动切换
    autoplay: false,
    //滑动动画时长毫秒
    duration: 100,
    //所有图片的高度
    imgheights: [],
    //图片宽度
    imgwidth: 750,
    //默认
    current:0,
    allComments:{},
    attention:{},
    collection:{},
    works:{},
    inputBoxShow: false,
    isScroll: true,
    replyBoxShow:false,
    replyScroll:true,
    // 文本
    textarea:'',
    // 点赞
    spot:'',
    wid:'',
    rep_uid:'',
    cid:'',
    reqwechat:'',
    messages:[

    ],
    message:[
   
  ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    var id = JSON.parse(options.id)
    var uid = JSON.parse(options.uid)
    console.log(id)
    console.log(uid)
    this.subscribeMessage()
    wx.request({
      url: 'http://123.57.81.190/travel/works/findWorkById', //仅为示例，并非真实的接口地址
      data: {
        //第一个作品id第二个用户id
       id:id,
       uid:app.globalData.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        if(res.data.collection==null){
          that.setData({
            spot:false,
          })
          
        }else{
          that.setData({
            spot:res.data.collection.spot,
            wid:res.data.collection.wid
          })
        }
        
        that.setData({
          allComments:res.data.allComments,
          attention:res.data.attention,
          collection:res.data.collection,
          works:res.data.works,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },  
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  // 宽高值比例
  imageLoad: function (e) {
    //获取图片真实宽度
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比
      ratio = imgwidth / imgheight;
    console.log(imgwidth, imgheight)
    //计算的高度值
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },
  bindchange: function (e) {
    console.log(e.detail.current)
    this.setData({ current: e.detail.current})
  },
  // 弹出评论框
  showInputBox: function () {
  
    this.setData({ inputBoxShow: true });
    this.setData({ isScroll: false });
    },
  invisible: function(){
    this.setData({ inputBoxShow: false });
    this.setData({ isScroll: true });
  },
  // 评论发送
  
  bindFormsubmit(e){
    console.log(e.detail.value.textarea)
    var that = this
    this.setData({ inputBoxShow: false });
    this.setData({ isScroll: true });

    wx.request({
      url: 'http://123.57.81.190/travel/comment/saveComments', //仅为示例，并非真实的接口地址
      data: {
        uid:app.globalData.id,
        c_content:e.detail.value.textarea,
        wid:that.data.works.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        that.setData({
          allComments:res.data
        })
        
      }
    })
    console.log(e)
    var head_img = app.globalData.head_img
    var username = app.globalData.username
    var openid = that.data.works.user.weChat
    app.globalData.goeasy.publish({
      channel: that.data.works.user.weChat,//e.target.dataset.openid
      message: head_img+' '+username+' '+'评论'+' '+openid,
      onSuccess: function () {
        that.setData({
          message: '评论'
        }); 
      console.log("send message success");
      },
      onFailed: function ( error) {
        that.unshiftMessage('发送失败，请检查您的appkey和host配置.');
      }
    });
  },
// 回复弹出
showreplay(e){
  console.log(e)
  this.setData({ replyBoxShow: true });
  this.setData({ replyScroll: false });
  console.log(e)
  this.setData({
    rep_uid:e.currentTarget.dataset.uid,
    cid:e.currentTarget.dataset.cid,
    reqwechat:e.currentTarget.dataset.wechat
  })
},
// 回复隐藏
invisiblereplay: function(){
  this.setData({ replyBoxShow: false });
  this.setData({ replyScroll: true });
},
// 回复接口
replysubmit(e){
  console.log(e)
  var that = this
  this.setData({ replyBoxShow: false });
  this.setData({ replyScroll: true });

  wx.request({
    url: 'http://123.57.81.190/travel/comment/saveReply', //仅为示例，并非真实的接口地址
    data: {
      uid:app.globalData.id,
      r_content:e.detail.value.textarea,
      cid:that.data.cid,
      rep_uid:that.data.rep_uid
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log(res.data)
      that.setData({
        allComments:res.data
      })
    }
  })
  
    console.log(e)

      console.log(that.data.message)
      var head_img = app.globalData.head_img
      var username = app.globalData.username
      var openid = that.data.reqwechat
      app.globalData.goeasy.publish({
        channel: openid,//e.target.dataset.openid
        message: head_img+' '+username+' '+'回复'+' '+openid,
        onSuccess: function () {
          that.setData({
            message: '回复'
          }); 
        console.log("send message success");
        },
        onFailed: function ( error) {
          that.unshiftMessage('发送失败，请检查您的appkey和host配置.');
        }
      });
      
},



  // 点赞
  dianzan:function(e){
    var that=this
    var fabulous='works.fabulous'
     wx.request({//点赞
      url: 'http://123.57.81.190/travel/interact/spotZan', //仅为示例，并非真实的接口地址
      data: {
        uid:app.globalData.id,
        wid:that.data.works.id,
        spot:that.data.spot
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
            that.setData({
            spot:res.data.spot,
            wid:res.data.wid,
            [fabulous]:res.data.fabulous
          })
      }
    })
    // websocket
    var likestate = !e.target.dataset.spot
    console.log(e.target.dataset)
    if (likestate==true) {
      console.log(that.data.message)
      var head_img = app.globalData.head_img
      var username = app.globalData.username
      var openid = e.target.dataset.openid
      app.globalData.goeasy.publish({
        channel: that.data.works.user.weChat,//e.target.dataset.openid
        message: head_img+' '+username+' '+'点赞'+' '+openid,
        onSuccess: function () {
          that.setData({
            message: '点赞'
          }); 
        console.log("send message success");
        },
        onFailed: function ( error) {
          that.unshiftMessage('发送失败，请检查您的appkey和host配置.');
        }
      });
    }       
  },
// 交互时间点
  unshiftMessage(content) {
    // 发送时间 和 发送的消息 
    var formattedTime = new Date().formatDate("hh:mm");
    var message = formattedTime +" "+ content; 
    var messages = this.data.messages;
    // 在数组开头添加一个新的元素 并返回新的数组长度
    messages.unshift(message);
    this.setData({
        messages: messages
        // 一个数组
    })
    // console.log(messages)
    wx.setStorageSync('messagelist', message);
    var messagelist = wx.getStorageSync('messagelist');
    app.globalData.messages = messagelist
    console.log(app.globalData.messages)
},
subscribeMessage() {//订阅消息
  // 另一个人的消息
  var that = this;
  console.log(app.globalData)
  app.globalData.goeasy.subscribe({
      channel: app.globalData.weChat,//app.globalData.weChat
      onMessage: function (message) {
          console.log(message)
          that.unshiftMessage(message.content);
      },
      onSuccess: function () {
      
      }
  });
},
})
// 点赞
