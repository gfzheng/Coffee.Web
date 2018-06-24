const state = {
  message: [],
  reply: [],
  like: [],
  mail: [],
  system: [],
  unread: {
    reply: 0,
    like: 0,
    system: 0,
    mail: 0
  }
}

const getters = {}

const actions = {}

const mutations = {
  setMessage (state, data) {
    state.message = data
    state.unread = {
      reply: 0,
      like: 0,
      system: 0,
      mail: 0
    }
    for (let m of state.message) {
      state.unread[m.Data.Type]++
      if (m.Data.Type === 'reply') {
        state.reply.push(m)
      } else if (m.Data.Type === 'like') {
        state.like.push(m)
      } else if (m.Data.Type === 'system') {
        state.system.push(m)
      } else if (m.Data.Type === 'mail') {
        state.mail.push(m)
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
