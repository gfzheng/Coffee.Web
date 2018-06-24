async function Add (data) {
  let res = await this.$https.post('/comment', {
    contentId: data.contentId,
    fatherId: data.fatherId,
    content: data.content,
    isReply: data.isReply
  })
  return res.data
}

async function Get (data) {
  let res = await this.$https.get('/comment/' + data.contentId, {
    params: {
      page: data.page,
      eachPage: data.eachPage
    }
  })
  return res.data
}

async function Delete (id) {
  let res = await this.$https.delete('/comment/' + id)
  return res.data
}

export default {
  Add: Add,
  Get: Get,
  Delete: Delete
}
