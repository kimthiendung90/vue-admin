<template>
    <div class="order-item">
        <div class="user-info clearfix">
            <div class="avatar fl">
                <img :src="orderItem.painter.headImgUrl | cdnSrc(100,100)" alt="" class="common-border" />
            </div>
            <div class="info fl">
                <div class="line">
                    <span class="username">{{orderItem.painter.uname}}，</span>
                    <span class="sex">{{orderItem.painter.sex | sex}}</span>
                </div>
                <div class="star line" v-if="orderItem.painter.starNum > 0 || 1">
                    <i class="wandan-icon icon-star" v-for="i in new Array(Math.round(orderItem.painter.starNum || 3))"></i>
                    <span class="star-num">{{orderItem.painter.starNum}}</span>
                </div>
                <div class="color-9 fs14" v-else>暂无评星</div>
            </div>
        </div>

        <div class="produce-list">
            <div class="title">{{projectDetail.title}}</div>
            <div class="ctime color-9">{{orderItem.ctime || 0 | date}}</div>


            <div class="produce-item" v-for="item in orderItem.produces">
                <div class="content">{{item.comment || '哈哈哈哈哈啊哈'}}</div>
                <div class="img-box" v-if="item.imgList.length > 0">
                    <div class="sub-title">预览图：</div>
                    <div class="img-list">
                        <a v-for="img in item.imgList" class="img-item" :href="img.img" target="_blank">
                            <img :src="img.img | cdnSrc(150, 150)" alt="" />
                        </a>
                    </div>
                </div>
                <div class="file-box" v-if="item.fileList.length > 0">
                    <div class="sub-title">源文件：</div>
                    <ul class="file-list">
                        <li v-for="file in item.fileList" class="file-item clearfix" :title="file.name">
                            <div class="file-name fl">
                                <i class="file-icon">{{file.format}}</i>
                                <span class="name">{{file.name}}</span>
                            </div>
                            <a download :href="file.img" class="download link fr">下载 ></a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="price">
                <span v-if="orderItem.painterPrice">
                    报价：{{orderItem.painterPrice | coverPrice}}元/张
                </span>
                <span v-else>报价：私聊</span>
            </div>
        </div>

        <div class="order-stat">
            <div v-if="orderItem.orderStatus == 'CREATE'" class="accept-label">新创建，这里其实应该不返回</div>
            <div v-if="orderItem.orderStatus == 'NO_PAY'" class="accept-label">未支付，这里其实应该不返回</div>
            <div v-if="orderItem.orderStatus == 'PAY'" class="accept-label">待画手接单</div>
            <div v-if="orderItem.orderStatus == 'RECEIVED'" class="accept-label">画手已经接单，私聊中</div>
            <div v-if="orderItem.orderStatus == 'UPLOAD_PRODUCE'" class="accept-label">画手已上传</div>
            <div v-if="orderItem.orderStatus == 'FINISHED_REFUSED'" class="refuse-label">画手已拒绝接单，已退款</div>
            <div v-if="orderItem.orderStatus == 'OVERTIME_NO_RECV'" class="refuse-label">画手超时未接单，已关闭</div>
            <div v-if="orderItem.orderStatus == 'FINISHED_OVERTIME'" class="refuse-label">画手超时未接单，已退款</div>
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            projectDetail: {
                type: Object,
                default(){
                    return {}
                }
            },
            orderItem: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            getImgList(list) {

                return []
            },
            getFileList(list) {
                return []
            }
        },
        computed: {
            imgList() {
                let imgList = []
                this.orderItem.produces.forEach(item => {
                    imgList.push()
                })
            },
            fileList() {

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~scss/mixins";
    .order-item{
        padding: 10px;
        background-color: #ffffff;
        .title{
            margin-top: 15px;
            font-size: 16px;
            font-weight: bold;
        }
    }
    .user-info{
        margin-top: 10px;
        .avatar{
            width: 60px;
            height: 60px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .info{
            margin-left: 10px;
            height: 50px;
            padding: 5px;
            .line{
                line-height: 22px;
                &>*{
                    vertical-align: middle;
                }
            }
            .username{
                font-weight: bold;
            }
            .star-num{
                font-size: 16px;
                color: $color9;
            }
            .icon-star{
                margin-right: 5px;
            }
        }
    }

    .produce-item{
        margin-top: 15px;
        .sub-title{
            font-size: 12px;
            font-weight: bold;
        }
        .ctime{

        }
        .content{

        }
        .img-box{
            margin: 10px 0;
        }
        .img-list{
            margin-left: -5px;
            font-size: 0;
            .img-item{
                display: inline-block;
                vertical-align: top;
                margin-left: 5px;
                margin-top: 5px;
            }
        }
        .file-box{
            margin: 10px 0;
        }
        .file-item{
            padding: 5px 0;
            line-height: 30px;
            .file-icon{
                display: inline-block;
                width: 30px;
                height: 30px;
                background-color: #B3B3B3;
                text-align: center;
                font-size: 12px;
            }
            .file-name{

            }
            .download{

            }
        }
        .price{

        }
    }
    .price{
        margin: 10px 0;
        font-size: 16px;
    }
    .order-stat{
        .accept-label{
            color: $colorLink;
        }
        .refuse-label{
            color: $colorRed;
        }
    }
</style>