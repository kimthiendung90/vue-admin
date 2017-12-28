<template>
    <router-link class="project-item" :to="{ name: 'clientProjectDetail',params: { pid: project.pid }}">
        <!--<user-bar :userInfo="userInfo" :time="0" />-->
        <div class="item-info">
            <div class="title-box">
                <div class="title sub-title">{{project.title}}</div>
                <div class="style"><span class="style-btn">{{project.style && project.style.title}}</span></div>
            </div>
            <div class="price-box" v-if="project.orderTryNum">
                <p><span class="sub-title">试稿费用：</span><span class="price">{{project.priceTry | coverPrice}}</span>元，<span class="price">{{project.orderTryNum}}</span>人</p>
            </div>
            <div class="price-box" v-if="project.orders && project.orders.length > 0" v-for="order in project.orders" :key="order.orderNo">
                <p><span class="sub-title">约稿费用：</span><span class="price">{{order.price | coverPrice}}</span>元，<span class="price">1</span>人</p>
            </div>
        </div>
        <div class="detail-tri">详情 &gt;</div>
    </router-link>
</template>

<script>
    import UserBar from '../components/userBar.vue'
    export default {
        components: {
            UserBar
        },
        props: {
            project: {
                type: Object,
                default: {}
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~scss/mixins";
    .project-item {
        display: block;
        background-color: #ffffff;
        margin-top: 15px;
        color: #999999;
        text-decoration: none;
        &:hover{
            cursor: pointer;
            opacity: 0.8;
        }
        &:first-child{
            margin-top: 0;
        }
        .item-info{
            padding: 10px;
            &>*{
                margin-bottom: 30px;
                color: #999999;
            }
            .title{
                font-size: 20px;
                font-weight: bold;
            }
            .sub-title {
                color: #333333;
                font-weight: bold;
            }
            .style{
                .style-btn {
                    background-color: #e6e6e6;
                    color: #999999;
                    font-size: 13px;
                    padding: 0 4px;
                    border-radius: 5px;
                }
            }
            .price-box{

            }
        }
        .detail-tri{
            padding: 15px 10px;
            border-top: 1px solid $colorBorder;
        }
    }
</style>
