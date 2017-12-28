import checkLogin from 'common/checkLogin'
import NProgress from 'nprogress'

export default function (router) {
    router.beforeEach((to, from, next) => {
        // 检测登陆
        NProgress.configure({
            easing: 'ease',
            showSpinner: true
        })

        NProgress.start()

        document.title = to.meta.title
        if (to.matched.some(record => record.meta.requireAuth)) {
            checkLogin().then((data) => {
                if (data.isLogin) {
                    next()
                } else {
                    next({
                        path: '/login',
                        query: {redirect: to.fullPath}
                    })
                }
            })
        } else {
            next() // 确保一定要调用 next()
        }
    })

    router.afterEach(route => {
        NProgress.done()
    })
}
