<template>
    <transition
            name="layer-fade-transition"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
    >
        <div class="popup-layer" v-show="value">
            <div class="layer-mask" @click="maskClose && onToggle()"></div>
            <div class="layer-dialog" :class="size">
                <div class="close-wrap" v-if="closeBtn">
                    <i class="close-icon" @click="onToggle"></i>
                </div>
                <div class="layer-title" v-if="!!title"><strong>{{title}}</strong></div>
                <div class="layer-content-component">
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    // 重置了默认弹窗的样式
    .animated{
        animation-duration: 0.4s;
    }
    .popup-layer{
        position: relative;
        z-index: 1;
        .layer-mask{
            position: fixed;
            z-index: 2;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0,0,0,0.5);
        }
        .layer-dialog{
            position: fixed;
            z-index: 3;
            top: 46%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 0 5px rgba(255,255,255,0.6);
            &.ml{
                width: 750px;
                height: 100px;
            }
        }
    }
</style>

<script>
    // 双向绑定可见性
    export default {
        name: 'layer',
        props: {
            size: {
                type: String,
                default: 'ml'
            },
            value: {
                type: Boolean,
                default: false
            },
            maskClose: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                default: ''
            },
            closeBtn: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            onToggle() {
                this.$emit('input', Boolean(!this.value))
                this.$nextTick(function () {
                    this.$emit('onCloseLayer', Boolean(this.value))
                })
            }
        }
    }
</script>
