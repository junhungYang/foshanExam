<template>
    <div class="detailInfo">
        <header>
            <img src="../assets/img/brand_logo.png" alt="">
            <p>佛山市交通技工学校</p>
            <p>—网约车预约补考—</p>
        </header>
        <div class="info-detail">
            <img src="../assets/img/info_bg.png" alt="" srcset="">
            <div class="text">
                <p class="title">补考信息</p>
                <p class="time">{{Store_signInfo.time}}</p>
                <p class="person-name">{{Store_signInfo.name}}</p>
                <p class="person-phone">{{Store_signInfo.mobile}}</p>
                <p class="person-identity">{{Store_signInfo.idCard}}</p>
            </div>
        </div>
        <div class="btn-group">
            <div class="cancel" @click="navBack">取消，选错时间了</div>
            <div class="confirm" @click="confirm">确定报名</div>
        </div>
    </div>
</template>
<script>
import { Req_add, Req_Pay } from "@/request/request";
import { mapMutations, mapState } from "vuex";
import wx from '@/main.js'
export default {
  data() {
    return {
      info: {}
    }
  },
  computed: {
    ...mapState(["Store_signInfo"])
  },
  created() {
    const signInfo = localStorage.getItem('signInfo')
    const query = this.$route.query
    if(query.needToPay == 1 && query.isAuth == 1 && query.reservationId && signInfo) {
      this.$store.commit('Store_signInfoInit', JSON.parse(signInfo))
      this.pay(query.reservationId)
    } 
  },
  methods: {
    ...mapMutations(["Store_showModalInit"]),
    confirm() {
      Req_add(this.Store_signInfo)
        .then(res => {
          if (res.data.code === 0) {
            this.info = res.data.data
            const {need_to_pay, is_auth, id} = this.info
            if(need_to_pay) {
              if(is_auth === 1) {
                  // 唤起支付接口
                this.pay(id)
              }else {
                this.Store_showModalInit({
                  title: '提示',
                  content: '授权后才能发起支付，点击确定进行授权',
                  successCB: () => {
                    localStorage.setItem('signInfo',JSON.stringify(this.Store_signInfo))
                    location.href = `http://jtjxbk.ydcycloud.com/wx/toOauth?state=${id}`
                  }  
                })  
              }
            }else {
              this.showSucModal();
            }
          } else {
            this.Store_showModalInit({
              title: "报名失败",
              content: res.data.msg,
              cancelFlag: false
            });
          }
        })
        .catch(err => {
          this.Store_showModalInit({
            title: "错误提示",
            content: err
          });
        });
    },
    pay(reservationId) {
      Req_Pay({reservationId}).then(res => {
        if(res.data.code === 0) {
          const data = res.data.data
          wx.chooseWXPay({
            ...data,
            timestamp: data.timeStamp,
            success:() => {
              this.showSucModal()
            },
            fail: (res) => {
              alert(JSON.stringify(res))
            }  
          })
        }else {
          this.Store_showModalInit({
            title: "报名失败",
            content: res.data.msg,
            cancelFlag: false
          });
        }
      }).catch(err => {
        this.Store_showModalInit({
          title: "错误提示",
          content: err
        });
      })
    },
    navBack() {
      this.$router.push("/SignUp");
    },
    showSucModal() {
      localStorage.removeItem('signInfo')
      this.Store_showModalInit({
        title: "报名成功",
        content: `您已成功报名预约时间段为${
          this.info.detail_time
        }的网约车补考`,
        successCB: () => {
          this.$router.push("/signUp");
        },
        cancelFlag: false
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.detailInfo {
  min-height: 100vh;
  background: #fff;
  header {
    padding-top: 0.23rem;
    img {
      width: 1.76rem;
      margin: 0 auto;
      display: block;
    }
    p {
      text-align: center;
    }
    p:first-of-type {
      margin-top: 0.16rem;
      font-size: 0.18rem;
      color: #252525;
    }
    p:last-of-type {
      margin-top: 0.23rem;
      color: #2d74c6;
      font-size: 0.15rem;
    }
  }
  .info-detail {
    margin: 0 auto;
    margin-top: 0.35rem;
    width: 3.28rem;
    height: 2.15rem;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .text {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      p {
        white-space: nowrap;
        margin-top: 0.22rem;
        font-size: 0.14rem;
        text-align: center;
        color: #252525;
      }
      p:first-of-type {
        color: #2d74c6;
        font-size: 0.18rem;
        font-weight: bold;
      }
    }
  }
  .btn-group {
    margin-top: 0.35rem;
    padding: 0 0.09rem;
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
    .cancel,
    .confirm {
      width: 1.68rem;
      height: 0.41rem;
      box-sizing: border-box;
      font-size: 0.14rem;
      text-align: center;
      line-height: 0.41rem;
    }
    .cancel {
      border: 1px solid #2d74c6;
      color: #2d74c6;
    }
    .confirm {
      background: #2d74c6;
      color: #fff;
    }
  }
}
</style>

