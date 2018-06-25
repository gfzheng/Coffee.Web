async function Read (data) {
  let res = await this.$https.patch('/notification/read/' + data.id, {
    isRead: data.isRead
  })
  return res.data
}

async function Get (data) {
  let res = await this.$https.get('/notification/all')
  if (res.data.State === 'success') {
    if (res.data.Notification !== null) {
      this.$store.commit('setMessage', res.data.Notification)
    } else {
      this.$store.commit('setMessage',[])
    }
  } else {
    throw res.State
  }
}

async function GetUnread (data) {
  let res = await this.$https.get('/notification/unread')
  return res.data
}

async function Delete (id) {
  let res = await this.$https.delete('/notification/' + id)
  return res.data
}

export default {
  GetUnread: GetUnread,
  Get: Get,
  Read: Read,
  Delete: Delete
}
