import Vue from 'vue'
import store from 'store'
import router from './router/router.mjs'
import Element from 'element-ui'
Vue.use(Element)

// import vueLazyload from 'vue-lazyload'
// 懒加载图片
// Vue.use(vueLazyload, {
//     preLoad: 1.3,
//     // loading: '/addons/theme/stv1/_static/image/default_lazy.png',
//     attempt: 1
// })

new Vue({
    store,
    router
}).$mount('#app')
