import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routerConfig.mjs'
import routerBefore from './routerBefore.mjs'

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop
            }
            return {x: 0, y: to.meta.savedPosition || 0}
        }
    }
})

// 路由全局钩子
routerBefore(router)

export default router
