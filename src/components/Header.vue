<template>
    <div class="header-wrap">
        <div class="flex justify-between">
            <div class="header-logo flex justify-end horizontal-collapse-transition" :style="{width: `${layout.collapse ? minWidth : maxWidth}px`}">
                <transition name="el-fade-in-linear">
                    <div v-show="!layout.collapse" class="logo">logo</div>
                </transition>
                <div class="toggle-menu flex" @click="onToggleMenu">
                    <i class="el-icon-menu"></i>
                </div>
            </div>
            <ul class="header-menu">
                <li class="menu-item">
                    <router-link :class="currentRouteName == 'index' ? 'current' : ''" :to="{ name: 'index'}">首页</router-link>
                </li>
                <li class="menu-item">
                    <router-link :class="currentRouteName == 'about'  ? 'current' : ''" :to="{ name: 'about'}">关于</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "~scss/mixins";
    .header-wrap{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: $colorRed;
        .toggle-menu{
            margin: 0 17px;
            cursor: pointer;
        }
        .header-logo{
            width: 230px;
            font-size: 30px;
            height: 50px;
            line-height: 40px;
            flex-wrap: nowrap;
            overflow: hidden;
        }
        .header-menu{
            font-size: 0;
        }
        .menu-item{
            vertical-align: top;
            display: inline-block;
            a{
                transition: 0.2s ease;
                padding: 0 40px;
                position: relative;
                text-decoration: none;
                color: $color1;
                display: block;
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                &:hover,&.current{
                    background-color: $colorRedHover;
                }
            }
        }
    }
</style>

<script>
    import { mapActions, mapState } from 'vuex'
    import config from '../common/config'

    export default {
        data() {
            return {
                maxWidth: config.menuWidthMax,
                minWidth: config.menuWidthMin
            }
        },
        computed: {
            ...mapState(['layout']),
            currentRouteName: function () {
                return this.$route.name
            }
        },
        methods: {
            ...mapActions(['changeCollapse']),
            onToggleMenu() {
                this.changeCollapse()
            }
        }
    }
</script>
