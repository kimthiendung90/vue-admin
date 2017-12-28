import * as types from '../mutationTypes'
import * as storageKeys from '../../common/storageKeys'

const state = {
    collapse: !!(+localStorage.getItem(storageKeys.COLLAPSE))
}

const mutations = {
    [types.UPDATE_COLLAPSE](state, collapse) {
        state.collapse = collapse
    }
}

const getters = {
    getCollapse(state) {
        return state.collapse
    }
}

const actions = {
    // 设置菜单栏显示或者隐藏
    changeCollapse({commit, state}, collapse) {
        collapse = (undefined === collapse) ? !state.collapse : !!collapse
        commit(types.UPDATE_COLLAPSE, collapse)
        setTimeout(() => {
            localStorage.setItem(storageKeys.COLLAPSE, String(+collapse))
        }, 0)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
