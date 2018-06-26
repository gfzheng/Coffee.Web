<template>
  <div class="edit-card">
    <el-card class="new-text-card" shadow="hover">
      <div class="card-title">
        <span>记录点滴</span>
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
      <div class="submit-button">
        <el-button class="button-back" size="small" type="primary" @click="$emit('closeIt')" v-if="isEdit">返回</el-button>
        <el-button size="small" type="danger" @click="deleteText" v-if="isEdit">删除</el-button>
        <el-button size="small" type="success" @click="submitText">{{buttonText}}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'EditCard',
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
      nowTime: '',
      title: '',
      content: '',
      isPublic: true,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
    }
  },
  methods: {
    // 发布 / 修改
    async submitText () {
      if (this.title === '') {
        this.$message.error('标题不能为空哦');
        return
      } else if (this.content === '') {
        this.$message.error('内容也不能为空哦');
        return
      }
      try {
        if (!this.isEdit) { // 发布模式
          let res = await this.$service.content.AddText.call(this, {
            title: this.title,
            content: this.content,
            isPublic: this.isPublic,
            tags: this.dynamicTags
          })
          if (res.State !== 'success') {
            console.log(res)
            this.$message.error("非法请求")
          }
        } else {
          let res = await this.$service.content.UpdateText.call(this, {
            id: this.rawData.ID,
            title: this.title,
            content: this.content,
            isPublic: this.isPublic,
            tags: this.dynamicTags
          })
          if (res.State != 'success') {
            console.log(res)
            this.$message.error("非法请求")
          }
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error, msg => {
          this.$notify.error({
            title: msg
          })
        })
      }
      this.$emit('submit');
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

    async deleteText () {
      this.$confirm('你即将永久删除该内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          let res = await this.$service.content.Delete.call(this, this.rawData.ID)
          console.log(res)
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

    formatTime(date) {
      return this.$util.formatDate(new Date(date), 'yyyy.M.dd hh:mm')
    },

  },
  mounted () {
    if (this.rawData) {
      this.title = this.rawData.Name
      this.content = this.rawData.Detail
      this.dynamicTags = this.rawData.Tag
      this.isPublic = this.rawData.Public
      this.isEdit = true
      this.nowTime = this.formatTime(this.rawData.PublishDate)
    } else {
      this.title = this.$util.formatDate(new Date(), 'M月dd日')
      this.nowTime = this.formatTime(new Date())
      setInterval(_ => {
        this.nowTime = this.formatTime(new Date())
      }, 30000)
    }
  }
}
</script>

<style lang="scss">
.edit-card {
  .new-text-card {
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
}
</style>
