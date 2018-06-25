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
    mail: 0,
    all: 0
  }
}

const getters = {}

const actions = {}

const mutations = {
  setMessage (state, data) {
    // init
    state.message = []
    state.reply = []
    state.like = []
    state.system = []
    state.unread = {
      reply: 0,
      like: 0,
      system: 0,
      mail: 0,
      all: 0
    }
    // get
    state.message = data
    for (let m of state.message) {
      if (!m.Data.Read) {
        state.unread[m.Data.Type]++
        if (m.Data.Type !== 'like') state.unread.all++
      }
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
