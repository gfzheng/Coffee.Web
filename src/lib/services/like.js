async function Add (data) {
  let res = await this.$https.post('/like/' + data.id, {
    isContent: data.type === 'content',
    isComment: data.type === 'comment',
    isReply: data.type === 'reply'
  })
  return res.data
}

async function Get (data) {
  let res = await this.$https.get('/like')
  if (res.data.Data !== null) {
    this.$store.commit('setLike', res.data.Data)
  } else {
    this.$store.commit('setLike', [])
  }
}

async function Delete (data) {
  let res = await this.$https.put('/like/' + data.id, {
    isContent: data.type === 'content',
    isComment: data.type === 'comment',
    isReply: data.type === 'reply'
  })
  return res.data
}

export default {
  Add: Add,
  Get: Get,
  Delete: Delete
}
