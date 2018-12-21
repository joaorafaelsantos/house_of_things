// initial state
const state = {
    connection: null
}

// getters
const getters = {
    getConnection(state, getters) {
        return state.connection
    }
}

// actions

// mutations
const mutations = {
    setConnection(state, connection) {
        state.connection = connection
    }
}

export default {
    namespaced: true,
    state,
    getters,
    // actions,
    mutations
}
