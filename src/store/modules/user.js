
const state = {
  logged: false,
  email: '',
  name: '',
  class: 0,
  info: {},
  likeNum: 0,
  maxSize: 0,
  usedSize: 0,
  singleSize: 0,
  contentCount: 0,
  filesClass: ['常规', '其他']
}

const getters = {}

const actions = {}

const mutations = {
  setInfo (state, data) {
    state.logged = true
    state.name = data.Name
    state.class = data.Class
    state.email = data.Email
    state.info = data.Info
    state.likeNum = data.Likenum
    state.maxSize = data.MaxSize
    state.usedSize = data.UsedSize
    state.singleSize = data.SingleSize
    state.contentCount = data.ContentCount
    state.filesClass = data.FilesClass
  },
  logout (state) {
    state.logged = false
    state.email = ''
    state.name = ''
    state.info = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
