<template>
    <div class="req-item">
        <div class="title-box content-box">
            <div class="title sub-title">{{reqData.title}}</div>
            <div class="style">
                <span class="style-btn">{{reqData.style && reqData.style.title}}</span>
            </div>
            <i v-if="reqData.reqType === 'TRY'" class="wandan-icon order-type-icon icon-try"></i>
            <i class="wandan-icon order-type-icon icon-order" v-else></i>
        </div>
        <div v-show="showMore">
            <div class="content-box des-box">
                <div class="sub-title">需求描述</div>
                <div class="des-text">{{reqData.description || '暂无详细需求描述...'}}</div>
            </div>
            <div class="content-box ref-img-box" v-if="reqData.refImgs.length > 0">
                <div class="sub-title">素材和参考图 <span class="color-9 fs12">（点击图片看大图）</span></div>
                <div class="ref-img-list clearfix">
                    <a :href="item.img" target="_blank" class="ref-img-item" v-for="item in reqData.refImgs" :key="item.id">
                        <img class="ref-img" :src="item.img | cdnSrc(200, 200)" alt="" />
                    </a>
                </div>
            </div>
            <div class="content-box mode-box">
                <div class="sub-title">稿件颜色模式</div>
                <div class="mode-text">{{reqData.mode || '不限'}}</div>
            </div>

            <div class="content-box num-box">
                <div class="sub-title">作品数量</div>
                <div class="num-text">
                    {{reqData.reqNum ? reqData.reqNum + '张' : '不限'}}
                </div>
            </div>
        </div>

        <div class="price-box content-box">
            <span class="sub-title">{{reqData.reqType === 'TRY' ? '试稿金额' : '约稿金额'}}</span>
            <span class="price">{{reqData.price | coverPrice}}</span>
            <span>元</span>
        </div>
        <div class="toggle-more tc">
            <span class="toggle-btn" @click="toggleShowMore"> {{!showMore ? '↓ 展开详细需求' : '↑ 收起详细需求'}}</span>
        </div>
        <div class="act-tools">
            <div v-if="reqData.orderStatus === 'PAY'" class="shutdown-time">接单倒计时：<span class="color-red">{{reqData.receiveExpireTime | time}}</span></div>

            <div v-if="reqData.orderStatus === 'RECEIVED'" class="shutdown-time">上传倒计时：<span class="color-red">{{reqData.finishTime | time}}</span></div>

            <div v-if="reqData.orderStatus === 'UPLOAD_PRODUCE'" class="shutdown-time">截至时间倒计时：<span class="color-red">{{reqData.payExpireTime | time}}</span></div>
            <div v-if="reqData.orderStatus === 'OVERTIME_NO_RECV'" class="shutdown-time">截至时间倒计时：<span class="color-red">{{reqData.payExpireTime | time}}</span></div>
            <div v-if="reqData.orderStatus === 'FINISHED_REFUSED'" class="shutdown-time">截至时间倒计时：<span class="color-red">{{reqData.payExpireTime | time}}</span></div>
            <div v-if="reqData.orderStatus === 'FINISHED'" class="shutdown-time">截至时间倒计时：<span class="color-red">{{reqData.payExpireTime | time}}</span></div>
            <div v-if="reqData.orderStatus === 'FINISHED_OVERTIME'" class="shutdown-time">截至时间倒计时：<span class="color-red">{{reqData.payExpireTime | time}}</span></div>

            <div class="btn-box clearfix">
                <template v-if="reqData.orderStatus === 'PAY'">
                    <button class="wandan-btn btn-red1 act-reject" @click="onReject(reqData)">拒绝</button>
                    <button class="wandan-btn btn-red2 act-accept" @click="onAccept(reqData)">接受</button>
                </template>

                <button @click="onUpload(reqData)" v-if="reqData.orderStatus === 'RECEIVED'"  class="wandan-btn btn-red2 act-100">上传</button>

                <button  @click="onUpload(reqData)" v-if="reqData.orderStatus === 'UPLOAD_PRODUCE'" class="wandan-btn btn-red2 act-100">已上传，继续上传作品</button>
                <button v-if="reqData.orderStatus === 'OVERTIME_NO_RECV'" class="wandan-btn btn-gray act-100">超时未接单关闭</button>
                <button v-if="reqData.orderStatus === 'FINISHED_REFUSED'" class="wandan-btn btn-gray act-100">拒绝接单，交易结束</button>
                <button v-if="reqData.orderStatus === 'FINISHED'" class="wandan-btn btn-gray act-100">完成交付，等待订单结束</button>
                <button v-if="reqData.orderStatus === 'FINISHED_OVERTIME'" class="wandan-btn btn-gray act-100">超时自动关闭</button>
            </div>
        </div>

    </div>
</template>

<style lang="scss">
    @import "~scss/mixins";
    .req-item{
        padding: 10px;
        position: relative;
        .order-type-icon{
            position: absolute;
            top: 0;
            right: 20px;
        }
    }
    .content-box{
        margin-bottom: 30px;
        color: $color9;
        .sub-title{
            color: $color3;
            font-weight: bold;
        }
    }

    .title-box{
        .title{
            font-size: 20px;
            font-weight: bold;
        }
        .style{
            margin-top: 5px;
        }
        .style-btn{
            background-color: $colorE6;
            color: $color9;
            font-size: 13px;
            padding: 0 4px;
            border-radius: 5px;
        }
    }
    .toggle-btn{
        cursor: pointer;
        opacity: 0.6;
        &:hover{
            opacity: 1;
        }
    }

    .ref-img-list{
        margin-left: -10px;
        .ref-img-item{
            float: left;
            margin-left: 10px;
            margin-top: 10px;
            img{
                width: 200px;
                height: 200px;
            }
        }
    }
    .act-tools{
        text-align: center;
        margin-top: 10px;
        .shutdown-time{
            background-color: #FFFDE5;
            padding: 5px 0;
        }
        .btn-box{
            .act-accept,.act-reject{
                float: left;
                width: 50%;
            }
            .act-100{
                width: 100%;
            }
        }
    }
</style>

<script>

    /**
     * orderStatus
     CREATE(0, "创建订单未支付"),
     PAY(10, "已支付"),
     RECEIVED(20, "已接单创作中"),
     UPLOAD_PRODUCE(30, "上传一张以上作品"),
     OVERTIME_NO_RECV(40, "超时未接单关闭"),
     FINISHED_REFUSED(100, "拒绝接单（交易结束）"),
     FINISHED(200, "完成交付（用户点击完成，或者有作品后超时自动完成）"),
     FINISHED_OVERTIME(300, "超时自动退款关闭");
     */

    export default {
        props: {
            reqData: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                showMore: false
            }
        },
        methods: {
            toggleShowMore() {
                this.showMore = !this.showMore
            },
            onUpload(data) {
                this.$emit('upload', data)
            },
            onReject(data) {
                this.$emit('reject', data)
            },
            onAccept(data) {
                this.$emit('accept', data)
            }
        }
    }
</script>
