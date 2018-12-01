// initial state
const state = {
    language: 'pt'
}

// getters
const getters = {
    getLanguage(state, getters) {
        return state.language
    }
}

// actions

// mutations
const mutations = {
    setLanguage(state, language) {
        state.language = language
    }
}

export default {
    namespaced: true,
    state,
    getters,
    // actions,
    mutations
}
