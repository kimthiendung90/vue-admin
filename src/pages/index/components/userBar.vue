<template>
    <div class="user-bar clearfix">
        <div class="avatar fl">
            <img :src="userInfo.headImgUrl | cdnSrc(100,100)" class="inline-block"/>
        </div>
        <div class="info fl">
            <div class="user-name">{{userInfo.uname}}</div>
            <div class="time">发布时间：{{time | date}}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped="">
    @import "~scss/mixins";

    .user-bar{
        padding: 10px;
        border-top: 1px solid $colorBorder;
        border-bottom: 1px solid $colorBorder;
        .avatar{
            img{
                vertical-align: top;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 1px solid $colorBorder
            }
        }
        .info{
            margin-left: 10px;
            height: 40px;
            padding: 5px 0;
            .user-name{
                font-size: 16px;
                font-weight: bold;
            }
            .time{
                color: $color9;
            }
        }
    }
</style>

<script>
    export default {
        props: {
            time: {
                type: Number,
                default: 0
            },
            userInfo: {
                type: Object,
                default: {}
            }
        }
    }
</script>