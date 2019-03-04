<template>
    <div class="RecordSearch">
        <header>
            <img src="../assets/img/brand_logo.png" alt="">
            <p>佛山市交通技工学校</p>
            <p>—网约车预约补考—</p>
        </header>
        <div class="search-input">
            <img src="../assets/img/search.png" alt="">
            <input v-model="inpVal" type="text" placeholder="请输入您的身份证号码">
            <button @click="search">搜索</button>
        </div>
        <div class="record-map">
            <div class="map-head">
                <span>报名时间</span>
                <span>报名人姓名</span>
                <span>预约补考时间</span>
            </div>
            <ul class="map-list" v-if="showStatus === 0">
                <li v-for="item in recordInfo" :key="item.id">
                    <p>{{item.create_time.split(' ')[0]}}</p>
                    <p>{{item.name}}</p>
                    <p>
                        <span>{{item.detail_time.slice(0,10)}}</span>
                        <span>{{item.detail_time.slice(11)}}</span>
                    </p>
                </li>
            </ul>
            <div class="noStorage" v-if="showStatus === 1">
                <p>输入身份证号码后</p>
                <p>点击搜索按钮即可查询报名信息</p>
            </div>
            <div class="noResult" v-if="showStatus === -1">
                <p>系统没有该用户信息</p>
                <p>请咨询客服</p>
            </div>
        </div>
    </div>
</template>
<script>
import {Req_getRecord} from '../request/request'
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            showStatus: 1,
            recordInfo: [],
            inpVal: ''
        }
    },
    created() {
        const recordInfo = JSON.parse(localStorage.getItem('record'))
        if(recordInfo && recordInfo.length > 0) {
            this.inpVal = JSON.parse(localStorage.getItem('record'))[0].id_card
            this.search()
        }
    },
    methods: {
        ...mapMutations(['Store_showModalInit']),
        search() {
            if(this.inpVal) {
                Req_getRecord({idCard: this.inpVal}).then(res => {
                    if(res.data.code === 0) {
                        this.recordInfo = res.data.data
                        this.showStatus = 0
                        localStorage.setItem('record',JSON.stringify(res.data.data))
                    }else if(res.data.code === -1) {
                        this.showStatus = -1
                    }
                }).catch(err => this.Store_showModalInit({title: 'error', content: err}))
            }else {
                this.Store_showModalInit({
                    content: '请输入身份证号码',
                    cancelFlag: false
                })
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.RecordSearch {
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
    .search-input {
        margin: 0 auto;
        width: 3.25rem;
        margin-top: 0.35rem;
        height: 0.27rem;
        border: 1px solid rgba(45,116,198,1);
        border-radius: 0.12rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        img {
            width: 0.16rem;
            margin: 0 0.12rem; 
        }
        input {
            flex: 1;
            padding: 0 0.04rem;
            border-left: 1px solid #8e8e8e;
            height: 0.18rem;
        }
        button {
            background: #2d74c6;
            width: 0.56rem;
            font-size: 0.14rem;
            height: 100%;
            line-height: 0.27rem;
            text-align: center;
            color: #fff;
        }
    }
    .record-map {
        margin: 0.23rem auto 0 auto;
        width: 3.25rem;
        // box-shadow: inset 0 0.02rem 0.04rem 0 rgba(195,195,195,1);
        .map-head {
            height: 0.29rem;
            display: flex;
            align-items: center;
            background:#7ba6d7;
            span:first-of-type, span:last-of-type {
                width: 1.06rem
            }
            span:nth-of-type(2) {
                flex: 1;
                border-left: 1px solid #fff;
                border-right: 1px solid #fff;
            }
            span {
                color: #fff;
                height: 0.18rem;
                font-size: 0.14rem;
                text-align: center;
                line-height: 0.18rem;
                white-space: nowrap;
            }
        }
        .map-list {
            background: rgb(231, 231, 231);
            min-height: 2.50rem;
            overflow-y: scroll;
            li {
                height: 0.56rem;
                margin: 0 0.06rem;
                border-bottom: 1px solid #cecece;
                display: flex;
                align-items: center;
                p:first-of-type,p:last-of-type {
                    width: 1rem;
                }
                p:nth-of-type(2) {
                    flex: 1;
                }
                p {
                    font-size: 0.14rem;
                    color: #252525;
                    text-align: center;
                    line-height: 0.56rem;
                    span {
                        line-height: 0.18rem;
                        display: block;
                    }
                }
            }
        }
        .noStorage,.noResult {
            min-height: 2.50rem;
            background: rgb(231,231,231);
            p {
                font-size: 0.20rem;
                color: #8e8e8e;
                font-weight: bold;
                text-align: center;
                line-height: 0.38rem;
            }
            p:first-of-type {
                padding-top: 0.50rem;
            }
        }
    }
}
</style>

