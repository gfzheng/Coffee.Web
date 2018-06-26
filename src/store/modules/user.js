
const state = {
  userId: '',
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
  filesClass: ['常规', '其他'],
  like: []
}

const getters = {}

const actions = {}

const mutations = {
  setInfo (state, data) {
    state.logged = true
    state.userId = data.ID
    state.name = data.Name
    state.class = data.Class
    state.email = data.Email
    state.info = data.Info
    state.likeNum = data.LikeNum
    state.maxSize = data.MaxSize
    state.usedSize = data.UsedSize
    state.singleSize = data.SingleSize
    state.contentCount = data.ContentCount
    state.filesClass = data.FilesClass
  },
  setLike (state, data) {
    state.like = data
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
