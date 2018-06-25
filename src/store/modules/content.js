
const state = {
  content: []
}

const getters = {}

const actions = {}

const mutations = {
  setContent (state, data) {
    if (data !== null) {
      state.content = data
    } else {
      state.content = []
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
