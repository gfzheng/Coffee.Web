<template>
  <div class="upload-box">
    <h1>Upload</h1>
    <div v-show="dropActive" class="drop-active">
      <p>Drop files to upload</p>
    </div>
    <div class="upload-btns">
      <input v-show="false" id="input-file" type="file" :multiple="true" @change="onChangeInput" />
      <el-button @click="selectFile" size="small">选择文件</el-button>
      <el-button size="small" type="success" @click="uploadFiles">开始上传</el-button>
    </div>
    <div class="upload-list">
      <el-table class="file-table" :data="tableStatus" empty-text="拖动或选择要上传的文件">
        <el-table-column prop="name" label="文件" min-width="200">
        </el-table-column>
        <el-table-column label="缩略图" width="70">
          <template slot-scope="scope">
            <img class="thumb-img" :src="scope.row.thumb" alt="Thumb" />
          </template>
        </el-table-column>
        <el-table-column label="大小" width="100">
          <template slot-scope="scope">
            {{fromatSize(scope.row.size)}}
          </template>
        </el-table-column>
        <el-table-column label="速度">
          <template slot-scope="scope">
            <span>{{scope.row.speed}} MB/s</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="options-box">
              <el-tooltip effect="dark" content="编辑文件名" placement="bottom">
                <i class="el-icon-edit" @click="editName(scope.$index)"></i>
              </el-tooltip>
              <el-tooltip effect="dark" content="开始上传" placement="bottom">
                <i class="el-icon-upload2"></i>
              </el-tooltip>
              <el-tooltip effect="dark" content="移除" placement="bottom">
                <i class="el-icon-delete" @click="removeFromList(scope.$index)"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss">
.upload-box {
  padding: 20px;
  padding-top: 100px;
  text-align: left;

  .upload-btns {
    margin: 20px 0;
  }

  .drop-active {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 9999;
    opacity: 0.6;
    text-align: center;
    background: #000;
    p {
      position: relative;
      top: 47%;
      margin: auto;
      color: white;
      font-size: 27px;
      vertical-align: middle;
    }
  }

  .upload-list {
    .file-table {
      width: 100%;
      .thumb-img {
        max-width: 100px;
        height: 50px;
      }
      .options-box {
        i {
          margin: 0 5px;
          transition: all 0.1s;
          &:hover {
            transform: scale(1.2);
            color: blue;
          }
        }
      }
    }
  }
}
</style>

<script>
import SparkMD5 from 'spark-md5'
import resizeImage from '@/lib/resize';
export default {
  data () {
    return {
      tableStatus: [],
      files: [],
      dropActive: false,
      num: 0,
      uploadList: [],
      uploading: 0,
    }
  },
  mounted () {
    document.addEventListener('dragenter', this.onDragenter, false)
    document.addEventListener('dragleave', this.onDragleave, false)
    document.addEventListener('drop', this.onDocumentDrop, false)

    document.addEventListener('dragover', this.onDragover, false)
    document.addEventListener('drop', this.onDrop, false)
  },
  methods: {
    // 拖动管理
    onDragenter (e) {
      e.preventDefault()
      if (!this.dropActive) {
        this.dropActive = true
      }
    },
    onDragleave (e) {
      e.preventDefault()
      if (e.target.nodeName === 'HTML' || e.target === e.explicitOriginalTarget || (e.screenX === 0 && e.screenY === 0 && !e.fromElement && e.offsetX <= 0)) {
        this.dropActive = false
      }
    },
    onDragover (e) {
      e.preventDefault()
    },
    onDocumentDrop () {
      this.dropActive = false
    },
    onDrop (e) {
      e.preventDefault()
      this.addDataTransfer(e.dataTransfer)
    },
    selectFile () {
      document.getElementById("input-file").click()
    },
    onChangeInput (e) {
      this.addFiles(e.target.files)
    },

    addDataTransfer (dataTransfer) {
      this.addFiles(dataTransfer.files)
    },

    checkDup (file) {
      if (this.tableStatus.length > 0) {
        for (let i in this.tableStatus) {
          if (this.tableStatus[i].name === file.name) {
            this.$message({
              showClose: true,
              message: '文件已存在',
              type: 'warning'
            })
            return
          } else if ((Number(i) + 1) === this.tableStatus.length) {
            this.addToList(file)
          }
        }
      } else {
        this.addToList(file)
      }
    },

    addToList (file) {
      console.log(file)
      if (file.type.substr(0, 5) === 'image') {
        let reader = new FileReader()
        reader.onload = e => {
          resizeImage(e.target.result, 50, 50, result => {
            this.tableStatus.push({
              name: file.name,
              thumb: result,
              size: file.size,
              speed: 0,
              status: '等待上传',
              file: file
            })
          })
        }
        reader.readAsDataURL(file)
      } else {
        this.tableStatus.push({
          name: file.name,
          thumb: this.getIcon(file.type, file.name),
          size: file.size,
          speed: 0,
          status: '等待上传',
          file: file
        })
      }
    },

    addFiles (files) {
      for (let file of files) {
        this.checkDup(file)
      }
    },

    getIcon (type, name) {
      let last2 = name.substr(name.length - 2, 2)
      let last3 = name.substr(name.length - 3, 3)
      let last4 = name.substr(name.length - 4, 4)
      if (type.substr(0, 5) === 'video') {
        return '/static/icon/file_type_video.svg'
      } else if (last3 === 'zip' || last3 === 'rar' || 'last2' === '7z') {
        return '/static/icon/file_type_zip.svg'
      } else if (last3 === 'doc' || last4 === 'docx') {
        return '/static/icon/file_type_word.svg'
      } else if (last3 === 'xls' || last4 === 'xlsx') {
        return '/static/icon/file_type_excel.svg'
      } else if (last3 === 'ppt' || last4 === 'pptx') {
        return '/static/icon/file_type_powerpoint.svg'
      } else if (last3 === 'txt') {
        return '/static/icon/file_type_text.svg'
      } else if (last2 === 'md') {
        return '/static/icon/file_type_markdown.svg'
      } else if (last3 === 'pdf') {
        return '/static/icon/file_type_pdf.svg'
      } else {
        return '/static/icon/default_file.svg'
      }
    },

    fromatSize (size) {
      let unit = ['B', 'KB', 'MB', 'GB', 'TB']
      let index = 0;
      while (size > 1024) {
        index++
        size /= 1024
      }
      return size.toFixed(2) + unit[index]
    },

    removeFromList (i) {
      this.tableStatus.splice(i, 1)
    },

    divFile (file, callback) {
      //声明必要的变量
      let fileReader = new FileReader(),
        //文件每块分割2M，计算分割详情
        chunkSize = 2097152,
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        sparkAll = new SparkMD5(),
        fileChunks = []
      //每块文件读取完毕之后的处理
      fileReader.onload = function (e) {
        //每块交由sparkMD5进行计算
        let spark = new SparkMD5()
        spark.appendBinary(e.target.result)
        sparkAll.appendBinary(e.target.result)
        currentChunk++
        let md5 = spark.end()
        fileChunks.push({ file: this.originFile, md5: md5 })
        if (currentChunk < chunks) {
          loadNext()
        } else {
          callback({ token: sparkAll.end(), fileChunks: fileChunks })
        }
      }
      function loadNext () {
        let start = currentChunk * chunkSize,
          end = start + chunkSize >= file.size ? file.size : start + chunkSize,
          originFile = file.slice(start, end)
        fileReader.readAsBinaryString(originFile)
        fileReader.originFile = originFile
      }
      loadNext()
    },

    // 开始上传文件
    async uploadFiles () {
      // 分割文件
      let fileList = this.tableStatus
      if (this.uploading >= fileList.length) {
        console.log('所有上传完成')
        // 所有上传完成
        return
      }
      this.divFile(fileList[this.uploading].file, async data => {
        console.log(data.token, data.fileChunks)
        let chunks = []
        for (let j in data.fileChunks) {
          chunks.push({
            index: Number(j),
            size: data.fileChunks[j].file.size,
            md5: data.fileChunks[j].md5,
            status: false
          })
        }
        try {
          const res = await this.$service.file.Add.call(this, {
            name: fileList[this.uploading].name,
            size: fileList[this.uploading].size,
            md5: data.token,
            chunks: chunks
          })
          if (res.State === 'had_exist') {
            // 秒传
            console.log('ok')
            this.uploading++
            this.uploadFiles()
          } else if (res.State === 'success') {
            // 可以上传
            this.uploadList = data.fileChunks
            for (let j in this.uploadList) {
              this.uploadList[j].upload = false
              this.uploadList[j].done = false
            }
            // 三并行上传
            for (let j = 0; j < 3; j++) {
              if (this.uploadList.length > j) {
                this.uploadList[j].upload = true
                this.upload(this.uploadList[j].file, data.token, j)
              }
            }
          } else {
            throw res.State
          }
        } catch (error) {
          this.$service.errorHandle.call(this, error, message => {
            this.$notify.error({
              title: message
            })
          })
        }
      })

    },

    upload (file, token, index) {
      var formData = new FormData();
      formData.append("file", file);
      formData.append("token", token);
      formData.append("index", index);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/file/upload');
      // 上传完成后的回调函数
      xhr.onload =  async () => {
        if (xhr.status === 200) {
          console.log('上传成功', index);
          this.uploadList[index].done = true;
          let count = 0;
          for (let i in this.uploadList) {
            if (this.uploadList[i].upload === false) {
              this.uploadList[i].upload = true
              this.upload(this.uploadList[i].file, token, i)
              return
            } else if (this.uploadList[i].done === true) {
              count++
            }
          }
          if (count === this.uploadList.length) {
            try {
              const res = await this.$service.file.Merge.call(this, token)
                if (res.State === 'success') {
                // 可以上传
                console.log('合并成功')
              } else {
                throw res.State
              }
            } catch (error) {
              this.$service.errorHandle.call(this, error, message => {
                this.$notify.error({
                  title: message
                })
              })
            }
            this.uploading++
            this.uploadFiles()
          }
        } else {
          console.log('上传出错', index);
          this.uploadList[index].upload = false
        }
      };
      // 获取上传进度
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          var percent = Math.floor(event.loaded / event.total * 100);
          // 设置进度显示
          console.log(index, percent)
          //$("#J_upload_progress").progress('set progress', percent);
        }
      };
      xhr.send(formData);
    },

    setProgress (i) {
      document.getElementsByClassName("el-table__row")[0].style.backgroundImage = "linear-gradient(to right,#A5DEE4 " + i + "%,white " + i + "%)"
    },

    timeout () {
      if (this.num >= 100) return
      this.setProgress(this.num)
      this.num += 0.1
      setTimeout(this.timeout, 10)
    },

    editName (i) {
      this.$prompt('请输入文件名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: this.tableStatus[i].name,
      }).then(({ value }) => {
        this.tableStatus[i].name = value
      })
    }
  }
}
</script>
