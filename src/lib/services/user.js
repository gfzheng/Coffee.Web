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

async function GetNewInfo() {
  let res = (await this.$https.post('/users/info')).data
  if (res.State === 'success') {
    await GetInfo.call(this)
  }
}

async function SetName(name) {
  let res = (await this.$https.post('/users/name', {
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
  await this.$https.post('/users/logout')
}

export default {
  GetVioletURL: GetVioletURL,
  Login: Login,
  GetInfo: GetInfo,
  SetName: SetName,
  GetNewInfo: GetNewInfo,
  Logout: Logout
}
