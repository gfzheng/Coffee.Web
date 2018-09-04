async function Add (data) {
  let res = await this.$https.post('/file/meta', {
    name: data.name,
    size: data.size,
    md5: data.md5,
    chunks: data.chunks
  })
  return res.data
}

async function Merge (data) {
  let res = await this.$https.post('/file/merge/' + data)
  return res.data
}

export default {
  Add: Add,
  Merge: Merge
}
