var app=getApp(); // 取得全局App

Page({
  data: {
    tempFilePaths:[],
    // 临时图片文件路径
    allFilePaths:[],
    // 存储图片路径*
    labelgroup:['海边', '陆地', '城市','高山'],
    jurisdictiongroup:['公开','私密'],
    text:'',
    // 文本*
    jurisdiction:'',
    // 权限*
    place:'',
    // 地点位置*
    label:'',
    //labelgroup选择选项(分区)*
    index:'',
    imgname:[],   
    // labelgroup下标
    hidden: false,
    // 用户作品id
    uid:""
  },
  onLoad: function () {
  },
  // 添加图片
  addWxImage: function () {
   var that = this;
   console.log(that.data.allFilePaths.length)
   if(that.data.allFilePaths.length<9){
    wx.chooseImage({
      count: 9-that.data.allFilePaths.length,
      // 改动过 有bug优先删这里
      sizeType: ['original', 'compressed'],
      sourceType: 'album',
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.data.allFilePaths=that.data.allFilePaths.concat(res.tempFilePaths)
        console.log(that.data.allFilePaths)
        that.setData({
          active:1,
          allFilePaths:that.data.allFilePaths
        })
       }
      })
   }else{
    wx.showToast({
      title: '只能上传9张哦',
      icon: 'none',
      duration: 2000
    })
   }
  },

  watch: function(e){
    var that = this
    //console.log(e)
    wx.previewImage({
    current: that.data.allFilePaths[e.currentTarget.dataset.id], // 当前显示图片的http链接
    urls: that.data.allFilePaths // 需要预览的图片http链接列表
  })
  },

  removeImg: function(e) {
    var that = this;
    var newFilePaths = that.data.allFilePaths.splice(e.currentTarget.dataset.id,1)
    that.setData({
     allFilePaths: that.data.allFilePaths
    })
  },

  getlocal:function(res){
    var that = this
    wx.chooseLocation({
      type: 'wgs84',
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const name = res.name
        const address = res.address
        that.setData({
          place:res.name,
          activePosition:1
        })
      }
     }) 
  },

  getlabel: function (e) {
    var that = this
    wx.showActionSheet({
      itemList: ['海边', '陆地', '城市','高山'],
      success (res) {
        that.setData({
          label:that.data.labelgroup[res.tapIndex],
          activelabel:1
        })
      },
      fail (res) {
        console.log(res.errMsg)
      }
    }) 
  },

  getjurisdiction:function(e){
    var that = this
    wx.showActionSheet({
      itemList: ['公开','私密'],
      success (res) {
        that.setData({
          jurisdiction:that.data.jurisdictiongroup[res.tapIndex],
          activejurisdiction:1
        })
      },
      fail (res) {
        console.log(res.errMsg)
      }
    }) 
  },
  bindTextAreaBlur: function(e) {
    var that =this
    that.setData({
      text:e.detail.value
    })
  },
  // 接口第一个函数把要发送的数据整理好 第二个发送
  formSubmit:function(upload){
    var that = this
    if(that.data.allFilePaths[0]){
    this.upload() 
    wx.request({
      url: 'http://123.57.81.190/travel/works/uploadData', 
      method:"post",
      data: {
        powers : this.data.jurisdiction,
        describes: this.data.text,
        place: this.data.place,
        type : this.data.label,
        imgs:this.data.imgname, 
        uid:app.globalData.id,
        // uid:app.globalData.openid
      },
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        //返回数据，看发布情况
        console.log(res.data)
        that.setData({
          allFilePaths:'',
          activePosition:0,
          activelabel:0,
          activejurisdiction:0,
          jurisdiction:'',
          powers :'',
          describes: '',
          place: '',
          label : '',
          type :'',
          imgs:'', 
          text:'',
          uid:''
          })
          console.log(that.data)
        wx.showToast({
          title: res.data,
          duration: 3000
        });
////   需要跳转页面
        wx.switchTab({
          url: '/pages/main/main'
        })
       
      }
      
    });
  }else if(that.data.jurisdiction){
    wx.showToast({
      title: '你还没选择图片哦',
      icon: 'none',
      duration: 2000
    })
  }else if(that.data.label){
    wx.showToast({
      title: '你还没选择权限哦',
      icon: 'none',
      duration: 2000
    })
  }else{
    wx.showToast({
      title: '你还没选择分区哦',
      icon: 'none',
      duration: 2000
    })
  }
  },
  upload:function(){  
    var that = this
    for (var i = 0; i < this.data.allFilePaths.length; i++) {
      let a = this.data.allFilePaths[i]
      a=a.slice('11')
      that.data.imgname.push(a)
      //console.log('文件名' + that.data.imgname)
      wx.uploadFile({
         url: 'http://123.57.81.190/travel/works/uploadImg',
        filePath: that.data.allFilePaths[i],
        name: 'content',
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json',
          'Authorization': 'okgoodit'
        },
        formData:({
          userName:"",
        }),
        success: function (res) {
        }
      })
      }
    },
}) 
