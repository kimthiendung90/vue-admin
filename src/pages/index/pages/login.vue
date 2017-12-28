<template>
    <div class="login-wrap">
        登陆
    </div>
</template>

<script>
    export default {
        beforeRouteEnter (to, from, next) {
            next()
            // window.location.href = '/wechat/qrLogin'
        }
    }
</script>
