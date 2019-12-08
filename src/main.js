import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/store'
import {Req_SetWxConfig} from './request/request'
import '../static/reset.css'
import 'swiper/dist/css/swiper.css'
import wx from 'weixin-js-sdk'

Vue.config.productionTip = false

/* eslint-disable no-new */
Req_SetWxConfig().then(res => {
  const {appId, nonceStr, signature, timestamp , url} = res.data.data
  console.log(signature)
  wx.config({
    debug:true,
    timestamp,
    appId,
    nonceStr,
    signature,
    jsApiList: ['chooseWXPay']
  })
  wx.ready(() => {
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  })
})

export default wx
