<template>
  <div class="tab-image">
    <image-uploader ref="imageSelect" @onChange='imgChange' @Changing="changing" :maxSize="1024000" placeholder="选择或拖放图片"></image-uploader>
    <div class="control">
      <el-button :disabled="selecting" @click="addImage">{{updateText}}</el-button>
      <el-button @click="$refs.imageSelect.InitData()">清空</el-button>
    </div>

  </div>
</template>

<script>
import ImageUploader from '@/components/ImageSelect.vue'
export default {
  components: {
    ImageUploader
  },
  data () {
    return {
      files: [],
      selecting: false,
      updateText: '上传'
    }
  },
  methods: {
    imgChange (files) {
      this.files.push(files)
    },

    changing (state) {
      if (state === true) {
        this.files = []
        this.updateText = '加载中'
      } else {
        this.updateText = '上传'
        console.log(this.files)
      }
      this.selecting = state
    },

    async addImage (files) {
      try {
        let formData = new FormData();
        for (let i in this.files) {
          formData.append('file' + i, this.files[i].file);
          formData.append('thumb' + i, this.convertBase64UrlToBlob(this.files[i].thumb));
        }
        let res = await this.$service.content.AddAlbum.call(this, formData)
        if (res.State !== 'success') {
          throw res.State
        } else {
          this.$refs.imageSelect.InitData()
          console.log(res.State)
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },

    convertBase64UrlToBlob (urlData) {
      var bytes = window.atob(urlData.split(',')[1]);
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: 'image/png' });
    }
  }
}
</script>


<style lang="scss">
.tab-image {
  .control {
    margin-top: 50px;
  }
}
</style>
