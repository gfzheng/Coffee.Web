<template>
  <div class="image-edit-card">
    <el-card class="new-image-card" shadow="hover">
      <div class="card-title">
        <span>镜头记录生活</span>
        <el-switch class="switch-public" v-model="isPublic" active-color="#13ce66" inactive-color="#ff4949" active-text="公开" inactive-text="私密" />
      </div>
      <el-input class="input-title" type="textarea" autosize placeholder="标题" v-model="title">
      </el-input>
      <el-input class="input-text" type="textarea" :autosize="{ minRows: 4, maxRows: 20}" placeholder="内容" v-model="content">
      </el-input>
      <div class="card-tag">
        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" />
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
      </div>
      <div v-if="!isEdit" class="tab-image">
        <image-uploader ref="imageSelect" @onChange='imgChange' @Changing="changing" :maxSize="1024000" placeholder="选择或拖放图片"></image-uploader>
      </div>
      <div v-else class="had-upload">已上传{{imageCount}}张图片</div>
      <div class="submit-button">
        <el-button class="button-back" size="small" type="primary" @click="$emit('closeIt')" v-if="isEdit">返回</el-button>
        <el-button size="small" type="danger" @click="deleteIt" v-if="isEdit">删除</el-button>
        <el-button size="small" @click="$refs.imageSelect.InitData()" v-if="!isEdit">清空</el-button>
        <el-button size="small" :disabled="selecting" @click="addImage">{{buttonText}}</el-button>
      </div>
    </el-card>
  </div>
</template>


<script>
import ImageUploader from './ImageSelect.vue'
export default {
  components: {
    ImageUploader
  },
  computed: {
    publicText () {
      return this.isPublic ? '公开' : '私密';
    },
    buttonText () {
      return this.isEdit ? '修改' : '发布'
    }
  },
  props: {
    rawData: {
      require: false
    }
  },
  data () {
    return {
      isEdit: false,
      files: [],
      selecting: false,
      updateText: '上传',
      nowTime: '',
      title: '',
      content: '',
      isPublic: true,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      imageCount: 0
    }
  },
  mounted () {
    if (this.rawData) {
      this.title = this.rawData.Name
      this.content = this.rawData.Detail
      this.dynamicTags = this.rawData.Tag
      this.isPublic = this.rawData.Public
      this.isEdit = true
      this.nowTime = this.formatTime(this.rawData.PublishDate)
      this.imageCount = this.rawData.Album.Images.length
    } else {
      this.title = this.$util.formatDate(new Date(), 'M月dd日')
      this.nowTime = this.formatTime(new Date())
      setInterval(_ => {
        this.nowTime = this.formatTime(new Date())
      }, 30000)
    }
  },
  methods: {
    async deleteIt () {
      this.$confirm('你即将永久删除该内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          let res = await this.$service.content.Delete.call(this, this.rawData.ID)
          this.$message("删除成功")
        } catch (error) {
          this.$service.errorHandle.call(this, error, msg => {
            this.$notify.error({
              title: msg
            })
          })
        }
        this.$emit('submit');
      })
    },

    imgChange (files) {
      this.files.push(files)
    },

    changing (state) {
      if (state === true) {
        this.files = []
        setTimeout(() => {
          this.selecting = false
        }, 5000)
      }
      this.selecting = state
    },

    async addImage (files) {
      if (this.title === '') {
        this.$message.error('标题不能为空哦');
        return
      } else if (this.content === '') {
        this.$message.error('内容也不能为空哦');
        return
      }
      if (!this.isEdit && !this.files.length) {
        this.$message.error('你应该选择一些图片');
        return
      }
      try {
        if (!this.isEdit) {
          let formData = new FormData();
          for (let i in this.files) {
            formData.append('file' + i, this.files[i].file);
            formData.append('thumb' + i, this.convertBase64UrlToBlob(this.files[i].thumb));
          }
          formData.append("title", this.title)
          formData.append("detail", this.content)
          formData.append("isPublic", this.isPublic)
          formData.append("tags", this.dynamicTags)
          let res = await this.$service.content.AddAlbum.call(this, formData)
          if (res.State !== 'success') {
            this.$message.error('发布失败，可能是你的空间不足了');
          } else {
            this.$refs.imageSelect.InitData()
            this.$message({
              message: '发布成功',
              type: 'success'
            });
          }
        } else {
          let res = await this.$service.content.Update.call(this, {
            id: this.rawData.ID,
            title: this.title,
            content: this.content,
            isPublic: this.isPublic,
            tags: this.dynamicTags
          })
          if (res.State != 'success') {
            this.$message.error("非法请求")
          } else {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
      this.$emit('submit');
    },

    convertBase64UrlToBlob (urlData) {
      var bytes = window.atob(urlData.split(',')[1]);
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: 'image/png' });
    },


    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput () {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm () {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },


    formatTime (date) {
      return this.$util.formatDate(new Date(date), 'yyyy.M.dd hh:mm')
    },
  }
}
</script>


<style lang="scss">
.image-edit-card {
  .new-image-card {
    margin-left: 28px;
    margin-bottom: 40px;
    text-align: left;
    .switch-public {
      vertical-align: middle;
      font-size: 15px;
      float: right;
    }
    .card-title {
      color: gray;
      margin-top: 5px;
      margin-bottom: 20px;
    }
    .input-title {
      margin-bottom: 20px;
    }
    .input-text {
      font-size: 15px;
    }
    .tab-image {
      text-align: center;
      margin: 20px;
    }
    .had-upload {
      text-align: center;
      margin: 20px;
    }
    .card-tag {
      font-size: 14px;
      color: gray;
      margin: 15px 0;
    }
    .el-textarea__inner {
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
    .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .submit-button {
      text-align: right;
      .button-back {
        float: left;
      }
    }
  }
  .control {
    margin-top: 50px;
  }
}
</style>
