<template>
  <div class="signUp-wrap">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(item, index) in banner" :key="index" class="swiper-slide" data-swiper-autoplay="5000"><img :src="item.full_pic_url" alt=""></div>
      </div>
    </div>
    <p class="tips">佛山市交通技工学校开班了！</p>
    <p class="title">— 网约车预约补考 —</p>
    <div class="info-item">
      <select v-model="from.time">
        <option value="">请选择补考时间段</option>
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
  import {Req_protocol, Req_timeList, Req_banner} from '@/request/request'
  import {mapMutations} from 'vuex'
  import Swiper from 'swiper'
  export default {
    created() {
      if (this.sign_info.name) {
        this.from = this.sign_info
      } else {
        this.getReq_protocol()
      }
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
        banner: []
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
      getReq_protocol() {
        Req_protocol().then(res => {
          if(res.data.code === 0) {
            this.protocol = res.data.data
            if(!this.agree) this.watchProtocol()
          }
        })
      },
      getReq_timeList() {
        Req_timeList().then(res => {
          if(res.data.code === 0) {
            this.timeList = res.data.data
          }
        })
      },
      getReq_banner() {
        Req_banner().then(res => {
          if(res.data.code === 0) {
            this.banner = res.data.data
          }
          this.$nextTick(() => {
            this.bannerInit()
          })
        })
      },
      watchProtocol() {
        this.Store_showModalInit({
          title: '网约车补考协议',
          content: this.protocol,
          successCB: () => {
            this.agreeChange()
          }
        })
      },
      submit() {
        for(let item in this.from) {
          if (this.from[item] === '') {
            this.Store_showModalInit({
              title: '提示',
              content: '请先完善信息'
            })
            return false
          }
        }
        if(!this.agree) {
          this.Store_showModalInit({
            title: '提示',
            content: '清楚了解并同意网约车补考协议才可报名'
          })
          return false
        }
        this.$store.commit('Store_signInfoInit', this.from)
        this.$router.push('/DetailInfo')
      },
      agreeChange() {
        this.$store.commit('Store_agreeChange')
      },
      bannerInit() {
        new Swiper('.swiper-container', {
          loop: true,
          autoplay: true
        })
      }
    },
    mounted() {
    }
  }
</script>
<style lang="scss" scoped>
  .signUp-wrap{
    display: inline-block;
    width: 100%;
    min-height: 100vh;
    .swiper-container{
      width: 100%;
      height: 1.53rem;
      img{
        width: 100%;
      }
    }
    .tips{
      padding: 0.1rem 0.25rem;
      font-size: 0.13rem;
      background: #f9f8f8;
    }
    .title{
      color: #2d74c6;
      font-size: 0.15rem;
      font-weight: bold;
      line-height: 0.51rem;
      text-align: center;
    }
    .info-item{
      width:3.04rem;
      height:0.28rem;
      line-height: 0.28rem;
      background:rgba(255,255,255,1);
      border:1px solid rgba(142,142,142,1);
      font-size: 0.12rem;
      margin: 0 auto 0.2rem;
      display: flex;
      align-items: center;
      &>select{
        width: 100%;
        height: 100%;
        border: none;
        padding-left: 0.44rem;
      }
      .img-wrap{
        width: 0.34rem;
        height: 0.28rem;
        text-align: center;
        .user-i{
          width: 0.12rem;
        }
        .phone-i{
          width: 0.07rem;
        }
        .card-i{
          width: 0.14rem;
        }
      }
      &>input{
        flex: 1;
        height: 0.17rem;
        border: none;
        border-left: 1px solid rgba(142,142,142,1);
        padding-left: 0.1rem;
      }
    }
    .btn{
      width:1.43rem;
      height:0.35rem;
      background:rgba(45,116,198,1);
      margin: 0 auto 0.2rem;
      font-size:0.12rem;
      font-weight:bold;
      color:rgba(255,255,255,1);
      line-height:0.35rem;
      text-align: center;
    }
    .protocol{
      text-align: center;
      font-size:0.12rem;
      font-weight:bold;
      color:rgba(142,142,142,1);
      .check{
        display: inline-block;
        width: 0.16rem;
        height: 0.16rem;
        border-radius: 50%;
        background: url("../assets/img/check.png") center no-repeat;
        background-size: 100% 100%;
        vertical-align: top;
        margin-right: 0.05rem;
      }
      .checked{
        background-image: url("../assets/img/checked_03.jpg");
      }
    }
    .link{
      color: #2D74C6;
      text-decoration: underline;
    }
  }
</style>

