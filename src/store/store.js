import Vue from 'vue'
import Vuex from 'vuex'

import language from './modules/language'
import signalr from './modules/signalr'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        language,
        signalr
    }
})
