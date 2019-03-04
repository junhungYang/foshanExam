<template>
  <div class="signUp-wrap">
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="(item, index) in banner" :key="index" class="swiper-slide">
            <img :src="item.full_pic_url" alt="">
          </div>
        </div>
      </div>
    </div>
    <p class="tips" v-if="text">{{text}}</p>
    <div class="title">
      <p class="text">— 网约车预约补考 —</p>
      <p class="search" @click="navToRecordSearch">
        <img src="../assets/img/search.png" alt="">
        <span>我的预约</span>
      </p>
    </div>
    <div class="info-item">
      <select v-model="from.time">
        <option value="">请选择补考日期场次</option>
        <option v-for="item, index in timeList" :value="item">{{item}}</option>
      </select>
    </div>
    <div class="info-item">
      <div class="img-wrap">
        <img class="user-i" src="../assets/img/user.png" alt="">
      </div>
      <input type="text" placeholder="请填写您的真实姓名" v-model="from.name">
    </div>
    <div class="info-item">
      <div class="img-wrap">
        <img class="phone-i" src="../assets/img/phone.png" alt="">
      </div>
      <input type="number" placeholder="请填写您的预留手机号" v-model="from.mobile">
    </div>
    <div class="info-item">
      <div class="img-wrap">
        <img class="card-i" src="../assets/img/card.png" alt="">
      </div>
      <input type="text" placeholder="请填写您的身份证号码" v-model="from.idCard">
    </div>
    <div class="btn" @click="submit">核对报名人信息</div>
    <p class="protocol">
      <span :class="{'checked': agree}" class="check" @click="agreeChange"></span>我已清楚了解<span class="link" @click="watchProtocol">《网约车补考协议》</span>
    </p>
  </div>
</template>
<script>
  import {Req_protocol, Req_timeList, Req_banner, Req_verification} from '@/request/request'
  import {mapMutations} from 'vuex'
  import Swiper from 'swiper'
  export default {
    created() {
      if (this.sign_info.name) {
        this.from = this.sign_info
      }
      this.getReq_protocol()
      this.getReq_timeList()
      this.getReq_banner()
    },
    data() {
      return {
        from: {
          time: '',
          name: '',
          mobile: '',
          idCard: ''
        },
        protocol: '',
        timeList: [],
        banner: [],
        text: '',
        mySwiper: null
      }
    },
    computed: {
      agree() {
        return this.$store.state.Store_agree
      },
      sign_info() {
        return this.$store.state.Store_signInfo || {}
      }
    },
    methods: {
      ...mapMutations(['Store_showModalInit']),

      // 跳转至报名查询页
      navToRecordSearch() {
        this.$router.push('/RecordSearch')
      },

      // 获取补考协议
      getReq_protocol() {
        Req_protocol().then(res => {
          if(res.data.code === 0) {
            this.protocol = res.data.data
          }else {
            this.catchError(res.data.msg)
          }
        }).catch(err => this.catchError(err))
      },

      // 获取补考时间列表
      getReq_timeList() {
        Req_timeList().then(res => {
          if(res.data.code === 0) {
            this.timeList = res.data.data
          }else {
            this.catchError(res.data.msg)
          }
        }).catch(err => this.catchError(err))
      },

      // 获取轮播
      getReq_banner() {
        Req_banner().then(res => {
          if(res.data.code === 0) {
            this.banner = res.data.data
            // this.text = this.banner[0].text
            // console.log(this.banner)
          }else {
            this.catchError(res.data.msg)
          }
          this.$nextTick(() => {
            this.bannerInit()
          })
        }).catch(err => this.catchError(err))
      },

      // 协议展示
      watchProtocol() {
        this.Store_showModalInit({
          title: '网约车补考协议',
          content: this.protocol,
          cancelFlag: false,
          isHtml: true
        })
      },

      // 前端校验
      submit() {
        for(let item in this.from) {
          if (this.from[item] === '') {
            this.Store_showModalInit({
              title: '核对失败',
              content: '填写信息有误或未勾选协议',
              cancelFlag: false
            })
            return false
          }
        }
        if(!this.agree) {
          this.Store_showModalInit({
            title: '提示',
            content: '清楚了解并同意网约车补考协议才可报名',
            cancelFlag: false
          })
          return false
        }
        this.postReq_verification()
      },

      // 发送请求核对信息并回显
      postReq_verification() {
        Req_verification(this.from).then(res => {
          if(res.data.code === 0) {
            const {detail_time,id_card,mobile,name} = res.data.data
            this.form = {
              time: detail_time,
              idCard: id_card,
              mobile,
              name
            }
            this.$store.commit('Store_signInfoInit', this.form)
            this.$router.push('/DetailInfo')
          }else {
            this.catchError(res.data.msg)  
          }
        }).catch(err => this.catchError(err))
      },

      // 是否同意协议管理
      agreeChange() {
        this.$store.commit('Store_agreeChange')
      },

      // 初始化轮播
      bannerInit() {
        let that = this
        this.mySwiper = new Swiper('.swiper-container', {
          on: {
            slideChangeTransitionEnd: function(){
              that.text = that.banner[this.realIndex].text
            },
          },
          loop: true,
          autoplay: {
            disableOnInteraction: false,
            delay: 5000,
          },
        })
      },

      // 错误捉取
      catchError(msg,title="错误提示") {
        this.Store_showModalInit({
          title,
          content: msg,
          cancelFlag: false
        })
      },

    }
  }
</script>
<style lang="scss" scoped>
  .signUp-wrap{
    display: inline-block;
    width: 100%;
    min-height: 100vh;
    .banner{
      width: 100%;
      overflow: hidden;
      background: #f9f8f8;
    }
    .swiper-container{
      overflow: visible;
      height: 1.79rem;
      .swiper-wrapper {
        .swiper-slide {
          img{
            width: 100%;
            height: 100%;
          }
          // background:red;
        }
      }
    }
    .tips{
      padding: 0.14rem 0.29rem;
      font-size: 0.15rem;
      background: #f9f8f8;
    }
    .title{
      height: 0.62rem;
      position: relative;
      .text {
        color: #2d74c6;
        font-size: 0.16rem;
        font-weight: bold;
        line-height: 0.62rem;
        text-align: center;
      }
      .search {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0.09rem;
        img {
          display: block;
          width: 0.16rem;
          margin: 0 auto;
        }
        span {
          display: block;
          font-size: 0.12rem;
          color: rgb(45,116,198);
          margin-top: 0.06rem;
        }
      }
    }
    .info-item{
      width:3.56rem;
      height:0.32rem;
      line-height: 0.32rem;
      background:rgba(255,255,255,1);
      border:1px solid rgba(142,142,142,1);
      font-size: 0.14rem;
      margin: 0 auto 0.23rem;
      display: flex;
      align-items: center;
      &>select{
        width: 100%;
        height: 100%;
        border: none;
        padding-left: 0.44rem;
      }
      .img-wrap{
        width: 0.40rem;
        height: 100%;
        position: relative;
        img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
        }
        .user-i{
          width: 0.14rem;
        }
        .phone-i{
          width: 0.08rem;
        }
        .card-i{
          width: 0.16rem;
        }
      }
      &>input{
        flex: 1;
        height: 100%;
        line-height: 0.32rem;
        border: none;
        border-left: 1px solid rgba(142,142,142,1);
        padding-left: 0.1rem;
        background-color: transparent;
      }
    }
    .btn{
      width:1.68rem;
      height:0.41rem;
      background:rgba(45,116,198,1);
      margin: 0 auto 0.22rem;
      font-size:0.14rem;
      font-weight:bold;
      color:rgba(255,255,255,1);
      line-height:0.41rem;
      text-align: center;
    }
    .protocol{
      text-align: center;
      font-size:0.15rem;
      font-weight:bold;
      color:rgba(142,142,142,1);
      .check{
        display: inline-block;
        width: 0.30rem;
        height: 0.30rem;
        border-radius: 100%;
        background: url("../assets/img/check.png") center no-repeat;
        vertical-align: middle;
        background-size: 100% 100%;
        // margin-right: 0.06rem;
        transform: scale(.5);
        transform-origin: center center;
      }
      .checked{
        background-image: url("../assets/img/checked_03.png");
      }
    }
    .link{
      color: #2D74C6;
      text-decoration: underline;
    }
  }
</style>

