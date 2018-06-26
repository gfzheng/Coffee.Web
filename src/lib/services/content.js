async function AddText (data) {
  let res = await this.$https.post('/content/text', {
    title: data.title,
    content: data.content,
    tags: data.tags,
    isPublic: data.isPublic
  })
  return res.data
}

async function AddAlbum (data) {
  let res = await this.$https.post('/content/album', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res.data
}

async function GetTexts (id) {
  if (!id) id = 'self'
  let res = await this.$https.get('/content/texts/' + id)
  return res.data
}

async function UpdateText(data) {
  let res = await this.$https.patch('/content/text/' + data.id, {
    title: data.title,
    content: data.content,
    tags: data.tags,
    isPublic: data.isPublic
  })
  return res.data
}

async function Get (id) {
  let res = await this.$https.get('/content/detail/' + id)
  return res.data
}

async function GetPublic (page, eachPage) {
  let res = await this.$https.get('/content/public', {
    params: {
      page: page,
      eachPage: eachPage
    }
  })
  return res.data
}

async function Delete(id) {
  console.log(id)
  let res = await this.$https.delete('/content/' + id)
  return res.data
}

export default {
  // Content
  Get: Get,
  GetPublic: GetPublic,
  Delete: Delete,
  // Text
  AddText: AddText,
  GetText: GetTexts,
  UpdateText: UpdateText,
  // Album
  AddAlbum: AddAlbum
}
