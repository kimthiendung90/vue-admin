import Vue from 'vue'
import utils from 'utils'

Vue.filter('time', function (value) {
    // 返回处理后的值
    if (!isNaN(Number(value))) {
        value = 0
    }

    let timeWithDay = utils.tools.getTimeWithDay(value)
    if (timeWithDay) {
        return `${timeWithDay.days}天${timeWithDay.hours}时${timeWithDay.minutes}分${timeWithDay.seconds}秒`
    }

    return `0天0时0分0秒`
})

// 注册
Vue.filter('byte2Mb', function (value) {
    // 返回处理后的值
    return isNaN(Number(value)) ? value : (value / 1024 / 1024).toFixed(2)
})

Vue.filter('lastStr', function (value) {
    // 返回处理后的值
    return String(value).split('/').pop()
})

Vue.filter('date', function (value, format) {
    // 返回处理后的值
    return isNaN(Number(value)) ? value : utils.tools.formatTime(value, format)
})

Vue.filter('delHtml', function (str, toStr = ',') {
    return str.replace(/<[^>]+>/g, toStr) // 去掉所有的html标记
})

Vue.filter('coverPrice', function (value) {
    return utils.tools.coverPrice(value)
})
Vue.filter('decoverPrice', function (value) {
    return utils.tools.decoverPrice(value)
})

Vue.filter('cdnSrc', function (src, w, h) {
    if (!src) {
        return ''
    }
    src = src.split('?')[0]
    if (w && h) {
        src = `${src}?x-oss-process=image/resize,m_fill,h_${h},w_${w}`
    } else {
        if (w) {
            src = `${src}?x-oss-process=image/resize,w_${w}`
        }
        if (h) {
            src = `${src}?x-oss-process=image/resize,h_${h}`
        }
    }
    return src
})

Vue.filter('sex', function (value) {
    value = +value
    return value === 1 ? '男' : value === 2 ? '女' : ''
})
