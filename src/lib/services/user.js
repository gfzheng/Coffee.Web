async function GetVioletURL (url) {
  let res = await this.$https.get('/user/login', {
    params: {
      RedirectURL: url
    }
  })
  return res.data
}

async function Login (code, state) {
  let res = await this.$https.post('/user/login', {
    code: code,
    state: state
  })
  return res.data
}

async function GetInfo (id) {
  if (!id) id = 'self'
  return (await this.$https.get('/user/info/' + id)).data
}

async function GetNewInfo() {
  let res = (await this.$https.post('/user/info')).data
  if (res.State === 'success') {
    res = await GetInfo.call(this)
    if (res.State === 'success') {
      res.Info.Avatar += '?t=' + new Date().getTime()
      this.$store.commit('setInfo', res)
    }
  }
}

async function SetName(name) {
  let res = (await this.$https.post('/user/name', {
    name: name
  })).data
  if (res.State === 'success') {
    await GetInfo.call(this)
  }
}

async function Logout () {
  this.$store.commit('logout')
  window.localStorage.clear()
  this.$router.push({ name: 'NotLogin' })
  await this.$https.post('/user/logout')
}

export default {
  GetVioletURL: GetVioletURL,
  Login: Login,
  GetInfo: GetInfo,
  SetName: SetName,
  GetNewInfo: GetNewInfo,
  Logout: Logout
}
