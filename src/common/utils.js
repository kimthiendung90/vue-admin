import Cookie from 'cookie'

const root = window

Promise.prototype.finally = function (callback) {
    let P = this.constructor
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {
            throw reason
        })
    )
}

const Utils = {
    cookieId: 'token',
    url: {
        location: root.location,
        cache: null,
        param(key) {
            let href = this.location.href,
                hrefWithoutHas = href.indexOf('#') > 0 ? href.substr(0, href.indexOf('#')) : href,
                paramStr = hrefWithoutHas.split('?')[1],
                cache,
                keys

            if (paramStr) {
                if ((cache = this.cache) === null) {
                    keys = paramStr.split('&')
                    cache = this.cache = {}
                    keys.forEach((v, i) => {
                        let _flag = v.split('=')
                        cache[_flag[0]] = _flag[1]
                    })
                }

                if (key) {
                    return cache[key]
                } else {
                    return cache
                }
            }
        },
        hash() {
            return this.location.href.replace(/^#/, '')
        }
    },
    array: {
        merge: function (target, other) {
            // 合并两个数组 avalon2新增
            target.push.apply(target, other)
        },
        ensure: function (target, item) {
            // 只有当前数组不存在此元素时只添加它
            if (target.indexOf(item) === -1) {
                return target.push(item)
            }
        },
        removeAt: function (target, index) {
            // 移除数组中指定位置的元素，返回布尔表示成功与否
            return !!target.splice(index, 1).length
        },
        remove: function (target, item) {
            // 移除数组中第一个匹配传参的那个元素，返回布尔表示成功与否
            let index = target.indexOf(item)
            if (~index) {
                return Utils.array.removeAt(target, index)
            } else {
                return false
            }
        }
    },
    getCookie(key) {
        return Cookie.get(key) // => 'value'
    },
    setCookie(key, value, options) {
        return Cookie.set(key, value, Object.assign({}, {
            domain: root.location.hostname,
            path: '/',
            expires: 90
        }, options))
    },
    removeCookie(key, options) {
        return Cookie.remove(key, Object.assign({}, {
            path: '/'
        }, options))
    }
}

//
Utils.tools = {
    clearInputFile(f) {
        if (f.value) {
            try {
                f.value = '' // for IE11, latest Chrome/Firefox/Opera...
            } catch (err) {

            }
            if (f.value) { // for IE5 ~ IE10
                let form = document.createElement('form'),
                    parentNode = f.parentNode, ref = f.nextSibling

                form.appendChild(f)
                form.reset()
                parentNode.insertBefore(f, ref)
            }
        }
    },
    randomNum(length = 30) {
        return Math.floor(Math.random() * length)
    },
    _format(value) {
        return value < 10 ? `0${value}` : value
    },
    getTimeWithDay(limitTime) {
        if (limitTime > 0) {
            let seconds = Math.round(limitTime / 1000),
                minutes = Math.floor(seconds / 60),
                hours = Math.floor(minutes / 60),
                CDay = Math.floor(hours / 24)

            let CHour = hours % 24,
                CMinute = minutes % 60,
                CSecond = seconds % 60

            CDay = this._format(CDay)
            CHour = this._format(CHour)
            CMinute = this._format(CMinute)
            CSecond = this._format(CSecond)

            return {
                days: CDay,
                hours: CHour,
                minutes: CMinute,
                seconds: CSecond
            }
        } else {
            return null
        }
    },
    formatTime: function (time, F) {
        let date = new Date(time)
        F = F || 'yyyy-M-d H:m:s'

        return F.replace(/\b[ymMdHs]+\b/g, function (i) {
            switch (i) {
            case 'yyyy':
                return date.getFullYear()
            case 'yy':
                return String(date.getFullYear()).slice(2)
            case 'M':
                return date.getMonth() + 1
            case 'MM':
                return date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
            case 'd':
                return date.getDate()
            case 'dd':
                return date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
            case 'HH':
            case 'H':
                return date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
            case 'mm':
            case 'm':
                return date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
            case 'ss':
            case 's':
                return date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
            }
        })
    },

    /**
     * 修复日期成标准日期格式：yyyy/MM/dd
     */
    repariDate: function (s) {
        return s ? s.replace(/\b([1-9])\b/g, '0$1').replace(/[^0-9\:\s]/g, '/') : ''
    },

    coverPrice: function (s) {
        return +s > 99 ? String(s).replace(/(\d+)(\d{2})$/, '$1.$2') : (+s > 9 ? '0.' + s : '0.0' + s)
    },
    decoverPrice: function (s) {
        let dotted = String(s).split('.'),
            slice

        return (dotted[0] + (dotted[1] === undefined ? '00' : (slice = dotted[1].slice(0, 2)).length === 1 ? slice + '0' : slice)).replace(/^0*/g, '')
    }
}

Utils.token = {
    token: null,
    getToken() {
        if (!this.token) {
            this.token = Utils.getCookie(Utils.cookieId)
            this.setToken(this.token)
        }
        return this.token || ''
    },
    setToken(token) {
        this.token = token
    }
}

export default Utils
