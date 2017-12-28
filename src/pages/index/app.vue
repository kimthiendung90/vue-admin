<template>
    <div class="app-wrap">
        <my-header></my-header>
        <div class="h100 flex">
            <div class="h100 middle-wrap app-aside" :width="`${asideWidth}px`">
                <my-aside></my-aside>
            </div>
            <div class="h100 middle-wrap app-middle flex1">
                <transition name="router-fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../../common/config'

    import myHeader from '../../components/Header.vue'
    import MyAside from '../../components/Aside.vue'

    export default {
        data() {
            return {
                asideWidth: config.menuWidthMax
            }
        },

        components: {
            myHeader,
            MyAside
        }
    }
</script>

<style lang="scss">
    @import "../../sass/mixins";

    .app-wrap{
        padding-top: 50px;
        height: 100vh;
        box-sizing: border-box;
        .h100{
            height: 100%;
            position: relative;
            overflow-y: auto;
            &::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background-color: rgba(193,193,193,1)
            } /* 滑块颜色 */


            /*&::-webkit-scrollbar-track {*/
            /*border-radius: 4px;*/
            /*background-color: #f5f5f5*/
            /*} !* 滚动条的滑轨背景颜色 *!*/

            /*&::-webkit-scrollbar-button {
                background-color: #F1F1F1;
            } !* 滑轨两头的监听按钮颜色 *!

            &::-webkit-scrollbar-corner {
                background-color: #A3A3A3;
            } !* 横向滚动条和纵向滚动条相交处尖角的颜色 *!*/
        }
        .app-middle{
            padding: 20px;
            &::-webkit-scrollbar  {
                width: 8px
            }
        }

        .app-aside{
            background-color: #FFFFFF;
            &::-webkit-scrollbar  {
                width: 0;
            }
        }
    }
    .router-fade-enter-active, .router-fade-leave-active {
        transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
        opacity: 0;
    }
</style>
