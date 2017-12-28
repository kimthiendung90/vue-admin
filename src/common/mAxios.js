/**
 * Created by Liu.Jun on 2017/11/27.
 */

import axios from 'axios'
import {Loading, Message} from 'element-ui'

const mAxios = axios.create({
    baseURL: process.env.NODE_ENV !== 'production' ? '/devApi' : '',
    timeout: 20 * 1000,
    headers: {
        TOKEN: 'testToken'
    }
})

mAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头

let ajaxNum = 0
let loadingInstance = null

function checkLoading() {
    ajaxNum > 0 && ajaxNum--
    if (ajaxNum < 1 && loadingInstance) {
        loadingInstance.close()
        loadingInstance = null
    }
}

function errMsg(message) {
    Message({
        showClose: true,
        message,
        type: 'error'
    })
}


// 添加参数
/**
 *  global: true
 *  showLoading: true
 */

mAxios.interceptors.request.use(config => {
    // if(config.method  === 'post'){
    //     config.data = qs.stringify(config.data)
    // }
    let data = {
        global: true,
        showLoading: true,
        ...config
    }

    config.params = {
        _token: 1,
        ...config.params
    }

    // 显示loading
    if (data.showLoading) {
        loadingInstance = Loading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(255, 255, 255, 0.2)'
        })
    }

    if (data.global) {
        // do ....
        // 全局操作等
    }

    return config
}, error => {
    return Promise.reject(error)
})

mAxios.interceptors.response.use(res => {
    checkLoading()
    if (res.status === 200) {
        if (res.data.code === 0) {
            return res.data
        } else {
            errMsg(res.data.message)
            return Promise.reject()
        }
    } else {
        errMsg('出错了，接口返回状态不等于200')
        return Promise.reject()
    }
}, error => {
    // 没有request参数， 无法获取具体哪条请求异常
    checkLoading()
    errMsg('出错了，接口调用失败')
    return Promise.reject(error)
})

export default mAxios
