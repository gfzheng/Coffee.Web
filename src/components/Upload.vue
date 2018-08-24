<template>
  <div class="upload-box">
    <h1>Upload</h1>
    <div v-show="dropActive" class="drop-active">
      <p>Drop files to upload</p>
    </div>
    <div class="upload-btns">
      <input v-show="false" id="input-file" type="file" :multiple="true" @change="onChangeInput" />
      <el-button @click="selectFile" size="small">选择文件</el-button>
      <el-button size="small" type="success">开始上传</el-button>
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

    checkMD5 (file) {
      this.getFileMD5(file, md5 => {
        if (this.tableStatus.length > 0) {
          for (let f of this.tableStatus) {
            if (f.md5 === md5) {
              this.$message({
                showClose: true,
                message: '文件已存在',
                type: 'warning'
              })
              return
            } else if (f.md5 === this.tableStatus[this.tableStatus.length - 1].md5) {
              this.loadThumb(file, md5)
            }
          }
        } else {
          this.loadThumb(file, md5)
        }
      })
    },


    loadThumb (file, md5) {
      let reader = new FileReader()
      reader.onload = e => {
        resizeImage(e.target.result, 50, 50, result => {
          // _this.imageDataList.push(result)
          this.tableStatus.push({
            name: file.name,
            thumb: result,
            size: file.size,
            speed: 0,
            status: '等待上传',
            md5: md5
          })
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          })
        })
      }
      reader.readAsDataURL(file)
    },

    addFiles (files) {
      for (let file of files) {
        this.checkMD5(file)
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

    getFileMD5 (file, callback) {
      //声明必要的变量
      let fileReader = new FileReader(),
        //文件每块分割2M，计算分割详情
        chunkSize = 2097152,
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        //创建md5对象（基于SparkMD5）
        spark = new SparkMD5()
      //每块文件读取完毕之后的处理
      fileReader.onload = function (e) {
        //每块交由sparkMD5进行计算
        spark.appendBinary(e.target.result)
        currentChunk++

        //如果文件处理完成计算MD5，如果还有分片继续处理
        if (currentChunk < chunks) {
          loadNext()
        } else {
          callback(spark.end())
        }
      }
      //处理单片文件的上传
      function loadNext () {
        var start = currentChunk * chunkSize,
          end = start + chunkSize >= file.size ? file.size : start + chunkSize

        fileReader.readAsBinaryString(file.slice(start, end))
      }

      loadNext()
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
      console.log(i)
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
