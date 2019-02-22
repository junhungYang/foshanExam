<template>
    <div class="detailInfo">
        <header>
            <img src="../assets/img/brand_logo.png" alt="">
            <p>佛山市交通技工学校</p>
            <p>—网约车预约报考—</p>
        </header>
        <div class="info-detail">
            <img src="../assets/img/info_bg.png" alt="" srcset="">
            <div class="text">
                 <p class="title">报考信息</p>
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
import {Req_add} from '@/request/request'
import {mapMutations,mapState} from 'vuex'
export default {
    beforeRouteEnter (to, from, next) {
        next(vm => {
            const { name,idCard } = vm.$store.state.Store_signInfo
            if(!name || !idCard) {
                vm.$router.replace('/signUp')
            }
        })
    },
    computed: {
        ...mapState(['Store_signInfo'])
    },
    methods: {
        ...mapMutations(['Store_showModalInit']),
        confirm() {
            Req_add(this.Store_signInfo).then(res => {
                if(res.data.code === 0) {
                    this.Store_showModalInit({
                        title: '报名成功',
                        content: `您已成功报名预约时间段为${res.data.data.detail_time}的网约车报考`,
                        cancelFlag: false
                    })
                }else {
                    this.Store_showModalInit({
                        title: '报名失败',
                        content: res.data.msg,
                        cancelFlag: false
                    })
                }
            }).catch(err => {
                this.Store_showModalInit({
                    title: '错误提示',
                    content: err
                })
            })
        },
        navBack() {
            this.$router.push('/SignUp')
        }
    }
}
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
        .cancel,.confirm {
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

