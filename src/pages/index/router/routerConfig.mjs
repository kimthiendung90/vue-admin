/**
 * Created by Liu.Jun on 2017/11/27.
 */

import App from '../app.vue'

export default [{
    path: '/',
    component: App, // 顶层路由，对应index.html
    children: [
        {
            path: '/index',
            name: 'index',
            meta: {
                title: '首页',
                requireAuth: false
            },
            component: resolve => require(['../pages/index.vue'], resolve)
        },
        {
            path: '/test',
            name: 'test',
            meta: {
                title: '测试',
                requireAuth: false
            },
            component: resolve => require(['../pages/test.vue'], resolve)
        },

        {
            path: '/login',
            name: 'login',
            meta: {
                title: '登陆',
                requireAuth: false
            },
            component: resolve => require(['../pages/login.vue'], resolve)
        },

        // {
        //     path: '/drawer',
        //     name: 'drawer',
        //     meta: {
        //         title: '画手订单管理 - 玩单',
        //         requireAuth: true
        //     },
        //     component: resolve => require(['../pages/drawer.vue'], resolve),
        //     children: [{
        //         path: 'completed',
        //         name: 'drawerCompleted',
        //         meta: {
        //             title: '画手已完成订单 - 玩单',
        //             requireAuth: true
        //         },
        //         component: resolve => require(['../pages/drawer/completed.vue'], resolve),
        //     }, {
        //         path: 'undone',
        //         name: 'drawerUndone',
        //         alias: '/drawer',
        //         meta: {
        //             title: '画手待完成订单 - 玩单',
        //             requireAuth: true
        //         },
        //         component: resolve => require(['../pages/drawer/undone.vue'], resolve),
        //     }]
        // }
        {
            path: '/',
            redirect: {name: 'index'}
        }, {
            path: '*',
            redirect: {name: 'index'}
        }]
}]
