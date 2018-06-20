async function GetVioletURL (url) {
  let res = await this.$https.get('/users/login', {
    params: {
      RedirectURL: url
    }
  })
  return res.data
}

async function Login (code, state) {
  let res = await this.$https.post('/users/login', {
    code: code,
    state: state
  })
  return res.data
}

async function GetInfo () {
  let res = (await this.$https.get('/users/info')).data
  if (res.State === 'error') {
    Logout.call(this)
  } else {
    this.$store.commit('setInfo', res)
  }
}

async function Logout () {
  this.$store.commit('logout')
}

export default {
  GetVioletURL: GetVioletURL,
  Login: Login,
  GetInfo: GetInfo,
  Logout: Logout
}
