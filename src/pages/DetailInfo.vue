<template>
    <div class="detailInfo">
        <header>
            <img src="../assets/img/brand_logo.png" alt="">
            <p>佛事市交通技工学校</p>
            <p>—网约车预约补考—</p>
        </header>
        <div class="info-detail">
            <p class="title">补考信息</p>
            <p class="time">2019-02-16 17:00 至 21:00</p>
            <p class="person-name">曾小小</p>
            <p class="person-phone">18753632281</p>
            <p class="person-identity">440681199209236527</p>
        </div>
        <div class="btn-group">
            <div class="cancel">取消，选错时间了</div>
            <div class="confirm">确定报名</div>
        </div>
    </div>
</template>
<script>
import {Req_protocol} from '@/request/request'
export default {
    created() {
        Req_protocol()
    }
}
</script>
<style lang="scss" scoped>
.detailInfo {
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
        background: url('../assets/img/info_bg.png');
        background-size: cover;
        overflow: hidden;
        p {
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

