async function Read (data) {
  let res = await this.$https.patch('/notification/' + data.id, {
    isRead: data.read
  })
  return res.data
}

async function Get (data) {
  let res = await this.$https.get('/notification/all')
  return res.data
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
