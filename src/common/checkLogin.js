import utils from 'utils'
import store from 'store'
import mAxios from 'mAxios'

export default function () {
    return new Promise(resolve => {
        // 首先通过 store 检测登陆
        if (store.state.user.isLogin) {
            resolve({
                isLogin: true
            })
            return
        }

        // 然后通过 token 获取登陆状态
        // utils.setCookie(utils.cookieId, '8AB3920CCD9347BBF17386A2B3E66BF70B7544C999C8B5F4')
        // utils.setCookie(utils.cookieId, '9E5239EF76EE2DB0E8E5224733FD8B7CB94668D806071566')

        let token = utils.token.getToken()

        if (token) {
            mAxios.post('/api/com.nuke.api.User/getLoginUserInfo', {}).then(({data}) => {
                store.commit('UPDATE_USER', data)
                resolve({
                    isLogin: true
                })
            }).catch(() => {
                resolve({
                    isLogin: false
                })
            })
        } else {
            //
            resolve({
                isLogin: false
            })
        }
    })
}
