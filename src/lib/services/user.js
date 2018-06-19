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
  this.$store.commit('setInfo', (await this.$https.get('/users/info')).data)
}

export default {
  GetVioletURL: GetVioletURL,
  Login: Login,
  GetInfo: GetInfo
}
