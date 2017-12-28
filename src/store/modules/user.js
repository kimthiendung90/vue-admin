import * as types from '../mutationTypes'

const state = {
    userInfo: '',
    isLogin: false
}

const mutations = {
    [types.UPDATE_USER](state, userInfo) {
        // 更新用户
        state.userInfo = userInfo
        if (userInfo.uid) {
            state.isLogin = true
        }
    },
    [types.UPDATE_LOGIN](state, isLogin) {
        // 设置登陆状态
        state.isLogin = isLogin
    }
}

export default {
    state,
    mutations
}
