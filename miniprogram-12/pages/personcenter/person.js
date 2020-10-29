// pages/personcenter/person.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data:{
    bg:"nobg.jpg",//背景图
    filePath:'',
    img:'nobg.jpg',
    clientHeight:'',
    pingjietouxiang:'45',
    active:'',
    status:'',
    tempFilePath:'',
    user:{
      imgsrc:['1.jpg','1.jpg','1.jpg','1.jpg','1.jpg','1.jpg','1.jpg','1.jpg','1.jpg',],
      nickname:'',
      avatarUrl:'',
      describes:'',
      id:'',
      gender:'',
      constellation:'',
      weChat:'',
      age:''
    },
    userlike:{

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this
    var gender = "user.gender"
    var id ="user.id"
    var describes="user.describes"
    var constellation="user.constellation"
    var age="user.age"
    var nickname="user.nickname"
    // 自适应轮播图高度
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })
    // 编辑页传值
    console.log(option)
    if(option.age==''||option.age==null){
      that.setData({
        [age]:'未填写'
      })
    }else{
      that.setData({
        [age]:option.age
      })
    }
    //签名
    if(option.describes==''||option.describes==null){
      that.setData({
        [describes]:'未填写签名'
      })
    }else{
      that.setData({
        [describes]:option.describes
      })
    }
    // 星座
    if(option.constellation==''||option.constellation==null){
      that.setData({
        [constellation]:'未填写'
      })
    }else{
      that.setData({
        [constellation]:option.constellation
      })
    }
    //性别
    if(option.gender==''||option.gender==null){
      that.setData({
        [gender]:'未填写'
      })
    }else{
      that.setData({
        [gender]:option.gender
      })
    }
    // 昵称
    if(option.nickname==''){
    }else{
      that.setData({
        [nickname]:option.nickname
      })
    }
  },
  // 选项卡
  changetabbar:function(e){
    var that = this
    var work = 'user.imgsrc'
    if(e.currentTarget.dataset.active == 0){
      wx.request({
        url: 'http://123.57.81.190/travel/works/findUserWorks', //仅为示例，并非真实的接口地址
        // 这里接口地址没确定没加 
        // 注意 注意
        data: {
         id:that.data.user.id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data) 
          that.setData({
            [work]:res.data
          })
        }
      })
      that.setData({
        active:0
      })
    }else if(e.currentTarget.dataset.active == 1){
      wx.request({
        url: 'http://123.57.81.190/travel/works/findWorksXiAi', //仅为示例，并非真实的接口地址
        // 这里接口地址没确定没加 
        // 注意 注意
        data: {
         id:that.data.user.id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data) 
          that.setData({
            userlike:res.data
          })
        }
      })
      that.setData({
        active:1
      })
    }
  },
  // 滑动
  change:function(e){
    var that=this
    wx.request({
      url: 'http://123.57.81.190/travel/works/findWorksXiAi', //仅为示例，并非真实的接口地址
      // 这里接口地址没确定没加 
      // 注意 注意
      data: {
       id:that.data.user.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data) 
        that.setData({
          userlike:res.data
        })
      }
    })
    that.setData({
      active:e.detail.current
    })
  },
  compile:function(){
    var that = this
    if(app.globalData.weChat==''){
      wx.showToast({
        title: '点击头像登录',
        icon:'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: '../compile/compile?id='+that.data.user.id,
        success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'json' })
        }
      })      
    }

  },
  // 点击头像授权登录
  login: function () {
    var that =this
    // 展示本地存储能力
    var nickname="user.nickname"
    var avatarUrl= "user.avatarUrl"
    var gender = "user.gender"
    var id ="user.id"
    var works="user.imgsrc"
    var describes="user.describes"
    var constellation="user.constellation"
    var age="user.age"
    var weChat="user.weChat"
    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          console.log(res.code+"我执行了")   
          //发起网络请求
          wx.request({
            url: 'http://123.57.81.190/travel/user/UserLogin',  
            data: {
              code: res.code
            },
            success:function (res) {
              console.log(res.data)
              if(res.data.status==0){
                that.setData({
                  [weChat]:res.data.weChat,
                  status: res.data.status,
                })
              }else if(res.data.status==1){
                console.log(res.data)
                that.setData({
                status: res.data.status,
                [nickname]:res.data.user.nickname,
                [avatarUrl]:'http://123.57.81.190/travel/uploads/'+res.data.user.head_img,
                [gender]:res.data.user.sex,
                [id]:res.data.user.id,
                [age]:res.data.user.age,
                [describes]:res.data.user.describes,
                [constellation]:res.data.user.constellation,
                [works]:res.data.user.works,
                pingjietouxiang:'http://123.57.81.190/travel/uploads/'+res.data.user.head_img,
                bg:'http://123.57.81.190/travel/uploads/'+res.data.user.background
                //背景图
               })
               that.setData({
                pingjietouxiang:that.data.user.avatarUrl
               })
               console.log(that.data)
               if(res.data.user.background==null||res.data.user.background==''){
                 that.setData({ 
                  bg:"nobg.jpg"
                 })
               } 
               if(res.data.user.constellation==null||res.data.user.constellation==''){
                that.setData({
                  [constellation]:'未填写',
                })
              } 
              if(res.data.user.describes==null||res.data.user.describes==''){
                that.setData({
                  [describes]:'点击右侧修改签名哦'
                })
              }
               app.globalData.id=res.data.user.id
               app.globalData.weChat=res.data.user.weChat
               app.globalData.head_img ='http://123.57.81.190/travel/uploads/'+res.data.user.head_img
               app.globalData.username = res.data.user.nickname
               console.log(app.globalData.weChat)
              }
              console.log(that.data.pingjietouxiang)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
        console.log(that.data.pingjietouxiang)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
    // 获取用户信息
    var that =this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.authorize({
            scope: 'scope.userInfo',
            success(){
              wx.getUserInfo({
                success: function(res) {
                  console.log(res.userInfo)
                  that.setData({
                    [nickname]:res.userInfo.nickName,
                    [avatarUrl]:res.userInfo.avatarUrl,
                  })
                  if( res.userInfo.gender==1){
                    that.setData({
                      [gender]:"男"
                    })
                  }else{
                    that.setData({
                      [gender]:"女"
                    })
                  }
                  //  从微信服务器下载头像
                  wx.downloadFile({
                    url: that.data.user.avatarUrl, 
                    success (res) {
                      console.log(res.tempFilePath)
                      if (res.statusCode === 200) {
                        that.setData({
                          tempFilePath:res.tempFilePath
                        })
                        if(that.data.status==0){
                          that.setData({
                            tempFilePath:res.tempFilePath
                          })
                          that.onload()
                        }
                      }
                    }
                  })
                  console.log(that.data.user.avatarUrl)
                }
                
              })
            }
          })
          // 微信api这里是我的授权  这写的不对吧
        }
      }
    })

  },
  onload:function(){
    var that=this
    var nickname="user.nickname"
    var avatarUrl= "user.avatarUrl"
    var gender = "user.gender"
    var id ="user.id"
    var describes="user.describes"
    var constellation="user.constellation"
    var age="user.age"
    var weChat="user.weChat"
    console.log(that.data.tempFilePath)
    wx.uploadFile({
      url: 'http://123.57.81.190/travel/user/UserRegister', 
      filePath: that.data.tempFilePath,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data",
        'accept': 'application/json',
        'Authorization': 'okgoodit'
      },
      formData: ({
        weChat:that.data.user.weChat,     //就这个
        nickname:that.data.user.nickname,
        sex:that.data.user.gender,
      }),
      success : function(res){
        const data = res.data
        console.log(res.data)
        var jsondata = JSON.parse(res.data)
        that.setData({
          status:1,
          [nickname]:jsondata.nickname,
          [gender]:jsondata.sex,
          [id]:jsondata.id,
          [avatarUrl]:'http://123.57.81.190/travel/uploads/'+jsondata.head_img,
          [age]:jsondata.age,
          [describes]:jsondata.describes,
          [constellation]:jsondata.constellation,
          [weChat]:jsondata.weChat,
          pingjietouxiang:'http://123.57.81.190/travel/uploads/'+jsondata.head_img,
          bg:jsondata.background
        })
        if(jsondata.describes==null||jsondata.describes==''){
          that.setData({
            [describes]:'点击右侧修改签名哦'
          })
        }
         if(jsondata.constellation==null||jsondata.constellation==''){
          that.setData({
            [constellation]:'未填写',
          })
        }
         if(jsondata.age==null||jsondata.age==''){
          that.setData({
            [age]:'未填写',
          })
        }
        if(jsondata.background==null||jsondata.background==''){
          that.setData({
            bg:"nobg.jpg"
          })
        }
        app.globalData.id=jsondata.id
        app.globalData.weChat=jsondata.weChat
        app.globalData.head_img ='http://123.57.81.190/travel/uploads/'+jsondata.head_img
        app.globalData.username = jsondata.nickname
        console.log(that.data)
      }
    })
  },
  particulars:function(e){
    console.log(e)
    console.log(e.target.dataset)
    wx.navigateTo({
      url: '../particulars/particulars?id=' +e.target.dataset.id +'&uid='+e.target.dataset.uid +'&spot='+e.target.dataset.spot,
      success: function(res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'json' })
      }
    })
  },
  // 更换背景图
  chooseImg:function(){
    var that = this
 
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths
        console.log(that.data.user.id)
        wx.uploadFile({
          url: 'http://123.57.81.190/travel/user/UpdateUserBackground', 
          filePath: tempFilePaths[0],//你说原因是这里没
          name: 'file',
          formData: {
            id:that.data.user.id    //这个就是id  不是open    而且 现在的情况是后台没接收到请求
          },
          success (res){
            const data = res.data
            //do something
            console.log(res.data)
            that.setData({
              bg:'http://123.57.81.190/travel/uploads/'+data
            })
          }
          
        })
      }
    })
  },
  
})