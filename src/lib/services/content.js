async function AddText (data) {
  let res = await this.$https.post('/content/text', {
    title: data.title,
    content: data.content,
    tags: data.tags,
    isPublic: data.isPublic
  })
  return res.data
}

async function GetTexts () {
  let res = await this.$https.get('/content/texts')
  return res.data
}

async function DeleteText(id) {
  console.log(id)
  let res = await this.$https.delete('/content/text/' + id)
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
  let res = await this.$https.get('/content/content/' + id)
  return res.data
}

async function GetPublic () {
  let res = await this.$https.get('/content/public', {
    params: {
      page: 1,
      eachPage: 10
    }
  })
  return res.data
}

export default {
  AddText: AddText,
  GetText: GetTexts,
  DeleteText: DeleteText,
  UpdateText: UpdateText,
  Get: Get,
  GetPublic: GetPublic
}
