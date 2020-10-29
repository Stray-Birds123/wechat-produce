const app = getApp()
Page({
  onLoad() {   
    var that = this;
    console.log(app.globalData.weChat)
    this.subscribeMessage()
    if(app.globalData.weChat==''){//判断是符登录
      wx.showToast({
        title: '你还没有登录',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.reLaunch({
           url: '../personcenter/person'
        }) 
      },2000)
    }
    var a = 'order[0].sea'
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })
    // 加载传输
   
      wx.request({
        url: 'http://123.57.81.190/travel/works/findAll', //仅为示例，并非真实的接口地址
        data: {
          type:"海边",
          id:app.globalData.id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(app.globalData.id)
         console.log(res.data)//我吐了我前面没写数据啊
         for(var i in res.data.works){
            
            for(var j in res.data.collections){
              
              if(res.data.works[i].id==res.data.collections[j].wid){
              // Object.assign(res.data.works[i],res.data.collections[j])
                res.data.works[i].wid = res.data.collections[j].wid
                res.data.works[i].spot = res.data.collections[j].spot
                
              }
            
            }

            for(var z in res.data.attentions){
              
              if(res.data.works[i].user.id==res.data.attentions[z].user2_id){
               
                var user1_id = 'works['+i+'].user1_id'
                var user2_id = 'works['+i+'].user2_id'
                var attentionstates ='works['+i+'].attentionstates'

                that.setData({
                  [user1_id]:res.data.attentions[z].user1_id,
                  [user2_id]:res.data.attentions[z].user2_id,
                  [attentionstates]:res.data.attentions[z].type
                })
                
                res.data.works[i].user1_id=res.data.attentions[z].user1_id
                res.data.works[i].user2_id=res.data.attentions[z].user2_id
                res.data.works[i].attentionstates=res.data.attentions[z].type
               
              }
            }
          }
          that.setData({
            [a]:res.data.works
          })
          console.log(that.data)
        },
    })

  },
  data: {
    // goeasy的三个参数
    goeasy: null,
    message: "niasdsa",
    messages:[],
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    attentionstate:false,
    order: [
      {
       sea:[],
      area:[],
      city:[],
      mountain:[],
      },
    ],
    orderlist: {},
  },
  bindChange: function(e) {
    console.log("滑动切换会触发的事件")
    var that = this
    console.log(e)
    if (this.data.currentTab == e.detail.current) {
      return false;
    } else {
      var typelist = ['海边','陆地','城市','高山']
      var type = ''
      var a = 'order[0].sea'//拼接字符串sea
      var b = 'order[0].area'
      var c = 'order[0].city'
      var d = 'order[0].mountain'
      type = typelist[e.detail.current]
      console.log(type)
      
      wx.request({
        url: 'http://123.57.81.190/travel/works/findAll', //仅为示例，并非真实的接口地址
        data: {
          type:type,
          id:app.globalData.id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
          // 这里的res.data.type调试的时候要改
        if(type == '海边'){
          for(var i in res.data.works){
            
            for(var j in res.data.collections){
              
              if(res.data.works[i].id==res.data.collections[j].wid){
              // Object.assign(res.data.works[i],res.data.collections[j])
                res.data.works[i].wid = res.data.collections[j].wid
                res.data.works[i].spot = res.data.collections[j].spot
                
              }
            
            }

            for(var z in res.data.attentions){
              
              if(res.data.works[i].user.id==res.data.attentions[z].user2_id){
               
                var user1_id = 'works['+i+'].user1_id'
                var user2_id = 'works['+i+'].user2_id'
                var attentionstates ='works['+i+'].attentionstates'

                that.setData({
                  [user1_id]:res.data.attentions[z].user1_id,
                  [user2_id]:res.data.attentions[z].user2_id,
                  [attentionstates]:res.data.attentions[z].type
                })
                res.data.works[i].user1_id=res.data.attentions[z].user1_id
                res.data.works[i].user2_id=res.data.attentions[z].user2_id
                res.data.works[i].attentionstates=res.data.attentions[z].type
               
              }
              console.log(that.data)
            }
          }
        }else if(type == '陆地'){
          for(var i in res.data.works){
            
            for(var j in res.data.collections){
              
              if(res.data.works[i].id==res.data.collections[j].wid){
              // Object.assign(res.data.works[i],res.data.collections[j])
                res.data.works[i].wid = res.data.collections[j].wid
                res.data.works[i].spot = res.data.collections[j].spot
                
              }
            
            }

            for(var z in res.data.attentions){
              
              if(res.data.works[i].user.id==res.data.attentions[z].user2_id){
               
                var user1_id = 'works['+i+'].user1_id'
                var user2_id = 'works['+i+'].user2_id'
                var attentionstates ='works['+i+'].attentionstates'

                that.setData({
                  [user1_id]:res.data.attentions[z].user1_id,
                  [user2_id]:res.data.attentions[z].user2_id,
                  [attentionstates]:res.data.attentions[z].type
                })
                res.data.works[i].user1_id=res.data.attentions[z].user1_id
                res.data.works[i].user2_id=res.data.attentions[z].user2_id
                res.data.works[i].attentionstates=res.data.attentions[z].type
               
              }
              console.log(that.data)
            }
          }
        }else if(type == '城市'){
          for(var i in res.data.works){
            
            for(var j in res.data.collections){
              
              if(res.data.works[i].id==res.data.collections[j].wid){
              // Object.assign(res.data.works[i],res.data.collections[j])
                res.data.works[i].wid = res.data.collections[j].wid
                res.data.works[i].spot = res.data.collections[j].spot
                
              }
            
            }

            for(var z in res.data.attentions){
              
              if(res.data.works[i].user.id==res.data.attentions[z].user2_id){
               
                var user1_id = 'works['+i+'].user1_id'
                var user2_id = 'works['+i+'].user2_id'
                var attentionstates ='works['+i+'].attentionstates'

                that.setData({
                  [user1_id]:res.data.attentions[z].user1_id,
                  [user2_id]:res.data.attentions[z].user2_id,
                  [attentionstates]:res.data.attentions[z].type
                })
                res.data.works[i].user1_id=res.data.attentions[z].user1_id
                res.data.works[i].user2_id=res.data.attentions[z].user2_id
                res.data.works[i].attentionstates=res.data.attentions[z].type
               
              }
              console.log(that.data)
            }
          }
        }else if(type == '高山'){
          for(var i in res.data.works){
            
            for(var j in res.data.collections){
              
              if(res.data.works[i].id==res.data.collections[j].wid){
              // Object.assign(res.data.works[i],res.data.collections[j])
                res.data.works[i].wid = res.data.collections[j].wid
                res.data.works[i].spot = res.data.collections[j].spot
                
              }
            
            }

            for(var z in res.data.attentions){
              
              if(res.data.works[i].user.id==res.data.attentions[z].user2_id){
               
                var user1_id = 'works['+i+'].user1_id'
                var user2_id = 'works['+i+'].user2_id'
                var attentionstates ='works['+i+'].attentionstates'

                that.setData({
                  [user1_id]:res.data.attentions[z].user1_id,
                  [user2_id]:res.data.attentions[z].user2_id,
                  [attentionstates]:res.data.attentions[z].type
                })
                res.data.works[i].user1_id=res.data.attentions[z].user1_id
                res.data.works[i].user2_id=res.data.attentions[z].user2_id
                res.data.works[i].attentionstates=res.data.attentions[z].type
               
              }
              console.log(that.data)
            }
          }
        } 
          //主意这里的[a]等 调试时测试是否拼接
          that.setData({
            [a]:res.data.works,
            [b]:res.data.works,
            [c]:res.data.works,
            [d]:res.data.works,
            })
        },
      })
      that.setData({
        currentTab: e.detail.current
      })
    }
    
  },
  // 选项卡 
  swichNav: function(e) {
    var that = this
    var type = e.target.dataset.type
    var a = 'order[0].sea'//拼接字符串sea
    var b = 'order[0].area'
    var c = 'order[0].city'
    var d = 'order[0].mountain'

    if (this.data.currentTab == e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    console.log(type)
    // 选项卡请求事件
    wx.request({
      url: 'http://123.57.81.190/travel/works/findAll', //仅为示例，并非真实的接口地址
      data: {
        type:type,
        id:app.globalData.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        // 这里的res.data.type调试的时候要改
        if(type == '海边'){
          for(var i in res.data.works){
            
            for(var j in res.data.collections){
              
              if(res.data.works[i].id==res.data.collections[j].wid){
              // Object.assign(res.data.works[i],res.data.collections[j])
                res.data.works[i].wid = res.data.collections[j].wid
                res.data.works[i].spot = res.data.collections[j].spot
                
              }
            
            }

            for(var z in res.data.attentions){
              
              if(res.data.works[i].user.id==res.data.attentions[z].user2_id){
               
                var user1_id = 'works['+i+'].user1_id'
                var user2_id = 'works['+i+'].user2_id'
                var attentionstates ='works['+i+'].attentionstates'

                that.setData({
                  [user1_id]:res.data.attentions[z].user1_id,
                  [user2_id]:res.data.attentions[z].user2_id,
                  [attentionstates]:res.data.attentions[z].type
                })
                res.data.works[i].user1_id=res.data.attentions[z].user1_id
                res.data.works[i].user2_id=res.data.attentions[z].user2_id
                res.data.works[i].attentionstates=res.data.attentions[z].type
               
              }
              console.log(that.data)
            }
          }
          }else if(type == '陆地'){
            for(var i in res.data.works){
            
              for(var j in res.data.collections){
                
                if(res.data.works[i].id==res.data.collections[j].wid){
                // Object.assign(res.data.works[i],res.data.collections[j])
                  res.data.works[i].wid = res.data.collections[j].wid
                  res.data.works[i].spot = res.data.collections[j].spot
                  
                }
              
              }
  
              for(var z in res.data.attentions){
                
                if(res.data.works[i].user.id==res.data.attentions[z].user2_id){
                 
                  var user1_id = 'works['+i+'].user1_id'
                  var user2_id = 'works['+i+'].user2_id'
                  var attentionstates ='works['+i+'].attentionstates'
  
                  that.setData({
                    [user1_id]:res.data.attentions[z].user1_id,
                    [user2_id]:res.data.attentions[z].user2_id,
                    [attentionstates]:res.data.attentions[z].type
                  })
                  res.data.works[i].user1_id=res.data.attentions[z].user1_id
                  res.data.works[i].user2_id=res.data.attentions[z].user2_id
                  res.data.works[i].attentionstates=res.data.attentions[z].type
                 
                }
                console.log(that.data)
              }
            }
          }else if(type == '城市'){
            for(var i in res.data.works){
            
              for(var j in res.data.collections){
                
                if(res.data.works[i].id==res.data.collections[j].wid){
                // Object.assign(res.data.works[i],res.data.collections[j])
                  res.data.works[i].wid = res.data.collections[j].wid
                  res.data.works[i].spot = res.data.collections[j].spot
                  
                }
              
              }
  
              for(var z in res.data.attentions){
                
                if(res.data.works[i].user.id==res.data.attentions[z].user2_id){
                 
                  var user1_id = 'works['+i+'].user1_id'
                  var user2_id = 'works['+i+'].user2_id'
                  var attentionstates ='works['+i+'].attentionstates'
  
                  that.setData({
                    [user1_id]:res.data.attentions[z].user1_id,
                    [user2_id]:res.data.attentions[z].user2_id,
                    [attentionstates]:res.data.attentions[z].type
                  })
                  res.data.works[i].user1_id=res.data.attentions[z].user1_id
                  res.data.works[i].user2_id=res.data.attentions[z].user2_id
                  res.data.works[i].attentionstates=res.data.attentions[z].type
                 
                }
                console.log(that.data)
              }
            }
          }else if(type == '高山'){
            for(var i in res.data.works){
            
              for(var j in res.data.collections){
                
                if(res.data.works[i].id==res.data.collections[j].wid){
                // Object.assign(res.data.works[i],res.data.collections[j])
                  res.data.works[i].wid = res.data.collections[j].wid
                  res.data.works[i].spot = res.data.collections[j].spot
                  
                }
              
              }
  
              for(var z in res.data.attentions){
                
                if(res.data.works[i].user.id==res.data.attentions[z].user2_id){
                 
                  var user1_id = 'works['+i+'].user1_id'
                  var user2_id = 'works['+i+'].user2_id'
                  var attentionstates ='works['+i+'].attentionstates'
  
                  that.setData({
                    [user1_id]:res.data.attentions[z].user1_id,
                    [user2_id]:res.data.attentions[z].user2_id,
                    [attentionstates]:res.data.attentions[z].type
                  })
                  res.data.works[i].user1_id=res.data.attentions[z].user1_id
                  res.data.works[i].user2_id=res.data.attentions[z].user2_id
                  res.data.works[i].attentionstates=res.data.attentions[z].type
                 
                }
                console.log(that.data)
              }
            }
          } 
            //主意这里的[a]等 调试时测试是否拼接
        that.setData({
          [a]:res.data.works,
          [b]:res.data.works,
          [c]:res.data.works,
          [d]:res.data.works,
        })
      },
    })
  },
  // 点赞
  //  count没有加
  dianzan:function(e){
    var that = this 
    console.log(that.data.order[0])
    console.log(e)
    // 判断第几个选项卡
    if(e.target.dataset.type=="海边"){
      var label = that.data.order[0].sea
      var likelabel = 'order[0].sea'
      
    }else if(e.target.dataset.type=="陆地"){
      var label = that.data.order[0].area
      var likelabel = 'order[0].area'
      
    }else if(e.target.dataset.type=="城市"){
      var label = that.data.order[0].city
      var likelabel = 'order[0].city'
      
    }else if(e.target.dataset.type=="高山"){
      var label = that.data.order[0].mountain
      var likelabel = 'order[0].mountain'
    }
   console.log(e.target.dataset)
   console.log(app.globalData.id)
    // console.log('每个e的点击次数'+e.target.dataset.count)
    if(e.target.dataset.spot == null){
     
       e.target.dataset.spot = false
    
    }
     wx.request({//点赞
      url: 'http://123.57.81.190/travel/interact/spotZan', //仅为示例，并非真实的接口地址
      data: {
        uid:app.globalData.id,
        wid:e.target.dataset.wid,
        spot:e.target.dataset.spot
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        for(let i=0;i<label.length;i++){
          if(label[i].id==e.target.dataset.wid){
          var likestate = likelabel+"["+i+"]."+"spot"
           var fabulous = likelabel+"["+i+"]."+'fabulous'
           console.log(fabulous)
           that.setData({
             [fabulous]:res.data.fabulous,
             [likestate]:res.data.spot
           })
          }
        }
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
        channel: e.target.dataset.openid,//e.target.dataset.openid
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
  // 关注
  guanzhu:function(e){
    var that = this
    // 判断第几个选项卡
    if(e.target.dataset.type=="海边"){
      var label = that.data.order[0].sea
      var attentionlabel = 'order[0].sea'
    }else if(e.target.dataset.type=="陆地"){
      var label = that.data.order[0].area
      var attentionlabel = 'order[0].area'
      
    }else if(e.target.dataset.type=="城市"){
      var label = that.data.order[0].city
      var attentionlabel = 'order[0].city'
      
    }else if(e.target.dataset.type=="高山"){
      var label = that.data.order[0].mountain
      var attentionlabel = 'order[0].mountain'
    }
    
    if(e.target.dataset.attentionstates == null){
      e.target.dataset.attentionstates = false
   }

    // console.log('每个e的点击次数'+e.target.dataset.count)
     wx.request({//关注
      url: 'http://123.57.81.190/travel/interact/spotAttention', //仅为示例，并非真实的接口地址
      data: {
        type:e.target.dataset.attentionstates,
        user1_id:app.globalData.id,//点赞者
        user2_id:e.target.dataset.uid//被点赞者
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        for(let i=0;i<label.length;i++){
          if(label[i].id==e.target.dataset.wid){
            var attentionstates = attentionlabel+"["+i+"]"+".attentionstates"
          }
        }
        console.log(e.target.dataset.uid)
        console.log(app.globalData)
         that.setData({
           [attentionstates]:res.data.type
         })
        console.log(res.data)
      }
    })
    // websocket
    var attentionstate = !e.target.dataset.attentionstates
    if (attentionstate==true) {
      var head_img = app.globalData.head_img
      var username = app.globalData.username
      var openid = e.target.dataset.openid
      console.log(that.data.message)
      console.log(e.target.dataset.openid)
      app.globalData.goeasy.publish({
        channel: e.target.dataset.openid,//e.target.dataset.openid
        message: head_img+' '+username+' '+'关注'+' '+openid,
        onSuccess: function () {
          that.setData({
            message: '关注'
          }); 
        console.log("send message success");
        },
        onFailed: function ( error) {
          that.unshiftMessage('发送失败，请检查您的appkey和host配置.');
        }
      });
    }
  },
  //详情页
  particulars:function(e){
    console.log(e)

    wx.navigateTo({
      url: '../particulars/particulars?id=' +e.currentTarget.dataset.workid +'&uid='+e.currentTarget.dataset.uid+'&spot='+e.currentTarget.dataset.spot,
      success: function(res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'json' })
      }
    })
  },
  

  onShow(){
    var that =this 
    var typelist = ['海边','陆地','城市','高山']
      var type = ''
      var a = 'order[0].sea'//拼接字符串sea
      var b = 'order[0].area'
      var c = 'order[0].city'
      var d = 'order[0].mountain'
      type = typelist[that.data.currentTab]
      console.log(type)
      
      wx.request({
        url: 'http://123.57.81.190/travel/works/findAll', //仅为示例，并非真实的接口地址
        data: {
          type:type,
          id:app.globalData.id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
          // 这里的res.data.type调试的时候要改
        if(type == '海边'){
          for(var i in res.data.works){
            
            for(var j in res.data.collections){
              
              if(res.data.works[i].id==res.data.collections[j].wid){
              // Object.assign(res.data.works[i],res.data.collections[j])
                res.data.works[i].wid = res.data.collections[j].wid
                res.data.works[i].spot = res.data.collections[j].spot
                
              }
            
            }

            for(var z in res.data.attentions){
              
              if(res.data.works[i].user.id==res.data.attentions[z].user2_id){
               
                var user1_id = 'works['+i+'].user1_id'
                var user2_id = 'works['+i+'].user2_id'
                var attentionstates ='works['+i+'].attentionstates'

                that.setData({
                  [user1_id]:res.data.attentions[z].user1_id,
                  [user2_id]:res.data.attentions[z].user2_id,
                  [attentionstates]:res.data.attentions[z].type
                })
                res.data.works[i].user1_id=res.data.attentions[z].user1_id
                res.data.works[i].user2_id=res.data.attentions[z].user2_id
                res.data.works[i].attentionstates=res.data.attentions[z].type
               
              }
              console.log(that.data)
            }
          }
        }else if(type == '陆地'){
          for(var i in res.data.works){
            
            for(var j in res.data.collections){
              
              if(res.data.works[i].id==res.data.collections[j].wid){
              // Object.assign(res.data.works[i],res.data.collections[j])
                res.data.works[i].wid = res.data.collections[j].wid
                res.data.works[i].spot = res.data.collections[j].spot
                
              }
            
            }

            for(var z in res.data.attentions){
              
              if(res.data.works[i].user.id==res.data.attentions[z].user2_id){
               
                var user1_id = 'works['+i+'].user1_id'
                var user2_id = 'works['+i+'].user2_id'
                var attentionstates ='works['+i+'].attentionstates'

                that.setData({
                  [user1_id]:res.data.attentions[z].user1_id,
                  [user2_id]:res.data.attentions[z].user2_id,
                  [attentionstates]:res.data.attentions[z].type
                })
                res.data.works[i].user1_id=res.data.attentions[z].user1_id
                res.data.works[i].user2_id=res.data.attentions[z].user2_id
                res.data.works[i].attentionstates=res.data.attentions[z].type
               
              }
              console.log(that.data)
            }
          }
        }else if(type == '城市'){
          for(var i in res.data.works){
            
            for(var j in res.data.collections){
              
              if(res.data.works[i].id==res.data.collections[j].wid){
              // Object.assign(res.data.works[i],res.data.collections[j])
                res.data.works[i].wid = res.data.collections[j].wid
                res.data.works[i].spot = res.data.collections[j].spot
                
              }
            
            }

            for(var z in res.data.attentions){
              
              if(res.data.works[i].user.id==res.data.attentions[z].user2_id){
               
                var user1_id = 'works['+i+'].user1_id'
                var user2_id = 'works['+i+'].user2_id'
                var attentionstates ='works['+i+'].attentionstates'

                that.setData({
                  [user1_id]:res.data.attentions[z].user1_id,
                  [user2_id]:res.data.attentions[z].user2_id,
                  [attentionstates]:res.data.attentions[z].type
                })
                res.data.works[i].user1_id=res.data.attentions[z].user1_id
                res.data.works[i].user2_id=res.data.attentions[z].user2_id
                res.data.works[i].attentionstates=res.data.attentions[z].type
               
              }
              console.log(that.data)
            }
          }
        }else if(type == '高山'){
          for(var i in res.data.works){
            
            for(var j in res.data.collections){
              
              if(res.data.works[i].id==res.data.collections[j].wid){
              // Object.assign(res.data.works[i],res.data.collections[j])
                res.data.works[i].wid = res.data.collections[j].wid
                res.data.works[i].spot = res.data.collections[j].spot
                
              }
            
            }

            for(var z in res.data.attentions){
              
              if(res.data.works[i].user.id==res.data.attentions[z].user2_id){
               
                var user1_id = 'works['+i+'].user1_id'
                var user2_id = 'works['+i+'].user2_id'
                var attentionstates ='works['+i+'].attentionstates'

                that.setData({
                  [user1_id]:res.data.attentions[z].user1_id,
                  [user2_id]:res.data.attentions[z].user2_id,
                  [attentionstates]:res.data.attentions[z].type
                })
                res.data.works[i].user1_id=res.data.attentions[z].user1_id
                res.data.works[i].user2_id=res.data.attentions[z].user2_id
                res.data.works[i].attentionstates=res.data.attentions[z].type
               
              }
            }
          }
        } 
          //主意这里的[a]等 调试时测试是否拼接
          that.setData({
            [a]:res.data.works,
            [b]:res.data.works,
            [c]:res.data.works,
            [d]:res.data.works,
            })
        },
      })
      
    }
    
})