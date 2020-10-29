// pages/compile/compile.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderground:['男','女'],
    genderindex:'',
    constellationground:['白羊座','金牛座','双子座','巨蟹座','狮子座','室女座','天秤座','天蝎座','人马座','摩羯座','宝瓶座','双鱼座'],
    constellationindex:'',
    // 上传
    nickname:'',
    describes:'',
    id:'',
    gender:'',
    constellation:'',
    weChat:'',
    age:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    var that = this
    this.setData({
      id:options.id
    })
    console.log(this.data.id)
    wx.request({
      url: 'http://123.57.81.190/travel/user/UpdateDataNow', //仅为示例，并非真实的接口地址
      data: {
       id:options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        that.setData({
          nickname:res.data.nickname,
          describes:res.data.describes,
          id:res.data.id,
          gender:res.data.sex,
          constellation:res.data.constellation,
          weChat:res.data.weChat,
          age:res.data.age
        })
        if(res.data.gender=='男'){
          that.setData({
            genderindex:0
          })
        }else if(res.data.gender=='女'){
          that.setData({
            genderindex:1
          })
        }
        for(var i in that.data.constellationground){
          if(that.data.constellation==that.data.constellationground[i]){
            var index1 = i
            that.setData({
              constellationindex:index1
            })
          }
          console.log(that.data)
        }
      }
    })

  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  // 签名
  getdescribes:function(e){
    if(e.detail.value==''){
      this.setData({
        describes: ' ',
      })
    }else{
     this.setData({
      describes: e.detail.value,
    }) 
    }
    
  },
  // 性别
  bindPickerChange: function (e) {
    this.setData({
      genderindex: e.detail.value,
    })
    if(this.data.genderground[this.data.genderindex]==''){
      this.setData({
        gender:' '
      })
    }else{
      this.setData({
      gender:this.data.genderground[this.data.genderindex]
     })
    }
  },
  // 星座
  bindconstellation:function(e){
    this.setData({
      constellationindex: e.detail.value
    })

    if(this.data.constellationground[this.data.constellationindex]==''){
      this.setData({
        constellation:' '
      })
    }else{
      this.setData({
        constellation:this.data.constellationground[this.data.constellationindex]
      })
    }
  },
  // 昵称
  getnickname:function(e){
    if(e.detail.value==''){
      this.setData({
        nickname:' '
      })
    }else{
      this.setData({
        nickname:e.detail.value
      })
    }
  },
  // 年龄
  getage:function(e){
    if(e.detail.value==null){
      this.setData({
        age:' '
      })
    }else{
      this.setData({
        age:e.detail.value
      })
    }
      
  },
  // 上传
  formSubmit:function(e){ 
    var that=this
    if(this.data.age==''){
      this.setData({
        age:0
      })
    } 
    if(this.data.describes==''){
      this.setData({
        describes:'未填写'
      })
    }
    if(this.data.gender==''){
      this.setData({
        gender:'未填写'
      })
    }
    if(this.data.nickname==''){
      this.setData({
        nickname:app.globalData.username
      })
    }
    if(this.data.constellation==''){
      this.setData({
        constellation:"未填写"
      })
    }

    if(isNaN(e.detail.value)){
      console.log(that.data.id)
      wx.request({
        url: 'http://123.57.81.190/travel/user/UpdateUserInfo', //仅为示例，并非真实的接口地址
        // 这里接口地址没确定没加 
        // 注意 注意
        data: {
          id:that.data.id,
          age:that.data.age,
          constellation:that.data.constellation,
          sex:that.data.gender,
          describes:that.data.describes,
          nickname:that.data.nickname,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
          wx.showToast({
            title: '编辑成功',
            duration: 2000
          })
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[ pages.length - 2 ];  
          //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
          var nickname="user.nickname"
          var gender = "user.gender"
          var id ="user.id"
          var describes="user.describes"
          var constellation="user.constellation"
          var age="user.age"
          prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
              [id]:res.data.id,
              [age]:res.data.age,
              [gender]:res.data.sex,
              [constellation]:res.data.constellation,
              [nickname]:res.data.nickname,
              [describes]:res.data.describes // 这里是修改了上一个页面数据:name
          })

          wx.navigateBack({
            delta: 1  // 返回上一级页面。
        })
        }
      })
    }else{
      wx.showToast({
        title: '年龄填写不对哦',
        duration: 2000
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})