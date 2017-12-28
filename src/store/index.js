import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import layout from './modules/layout'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        testValue: 1
    },
    mutations: {
        up(state) {
            state.testValue++
        }
    },
    modules: {
        user,
        layout
    }
})

export default store
