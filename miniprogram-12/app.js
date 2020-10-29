//app.js
import GoEasy from './utils/goeasy-1.0.10';
App({
  globalData: {
		userInfo: {},
		id:'',
    weChat:'',
    host:'http://localhost',
    URL:'http://123.57.81.190/travel/',
		imgURL:'http://123.57.81.190/uploads/',
    goeasy : null,
    head_img:'',
    username:'',
    messages:[]
  },
  onLaunch: function() {
		var that=this
		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)
		console.log(that.globalData.id)
		// goeasy引入调用
		this.extendDateFormat();
    this.initGoEasy();
    // 本地缓存
    
    
	},
	extendDateFormat () {
    Date.prototype.formatDate = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3), 
        "S": this.getMilliseconds()
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if(o.hasOwnProperty(k)){
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      return fmt;
    };
  },
  initGoEasy() {//初始化goeasy
      this.globalData.goeasy = GoEasy({
          host: 'hangzhou.goeasy.io',
          appkey: "BC-4736c4ec6b3b4114b1471848612ca1e1",
          onConnected: function () {
              console.log("GoEasy connect successfully.");
          },
          onDisconnected: function () {
              console.log("GoEasy disconnected.")
          },
          onConnectFailed: function (error) {
              console.log('连接失败，请检查您的appkey和host配置');
          }
      })
  },
  
})