import './layer.scss'

const layer = {
    tip(mess, time = 5000, animateName = 'fadeIn') {
        let $tipWrap = $('<div class="layer-tips"></div>').appendTo('body')
        $(`<div class="animated ${animateName}">${mess}</div>`).prependTo($tipWrap)
        setTimeout(function () {
            $tipWrap.remove()
        }, time)
    },

    loading(text, hasMask = false) {
        this.unLoading()
        let tpl = `<div class="load-spinner">
                        <div class="spinner-container container1">
                            <div class="circle1"></div>
                            <div class="circle2"></div>
                            <div class="circle3"></div>
                            <div class="circle4"></div>
                        </div>
                        <div class="spinner-container container2">
                            <div class="circle1"></div>
                            <div class="circle2"></div>
                            <div class="circle3"></div>
                            <div class="circle4"></div>
                        </div>
                        <div class="spinner-container container3">
                            <div class="circle1"></div>
                            <div class="circle2"></div>
                            <div class="circle3"></div>
                            <div class="circle4"></div>
                        </div>
                    </div>`
        tpl = tpl + (text ? `<div class="loading-text">${text}</div>` : '')
        tpl = `<div class="layer-global-wrap">
            ${hasMask ? '<div class="layer-global-mask"></div>' : ''}
            <div class="layer-loading-content">
                ${tpl}
            </div>
        </div>`
        this.$loading = $(tpl)
        this.$loading.appendTo('body')
    },

    unLoading() {
        if (this.$loading) {
            this.$loading.remove();
            delete this.$loading
        }
    }
}

window.layer = layer

export default layer
