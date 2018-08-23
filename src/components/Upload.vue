<template>
  <div class="upload-box">
    <h1>Upload</h1>
    <div v-show="dropActive" class="drop-active">
      <p>Drop files to upload</p>
    </div>
    <div class="upload-btns">
      <input v-show="false" id="input-file" type="file" :multiple="true" @change="onChangeInput"/>
      <el-button @click="selectFile" size="small">选择文件</el-button>
      <el-button size="small" type="success">开始上传</el-button>
    </div>
    <div class="upload-list">
      <el-table class="file-table" :data="tableStatus" empty-text="拖动或选择要上传的文件">
        <el-table-column prop="id" label="#" width="30">
        </el-table-column>
        <el-table-column label="缩略图" width="100">
          <template slot-scope="scope">
            <img class="thumb-img" :src="scope.row.thumb" alt="Thumb" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="文件">
        </el-table-column>
        <el-table-column prop="size" label="大小">
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
                <i class="el-icon-edit"></i>
              </el-tooltip>
              <el-tooltip effect="dark" content="开始上传" placement="bottom">
                <i class="el-icon-upload2"></i>
              </el-tooltip>
              <el-tooltip effect="dark" content="移除" placement="bottom">
                <i class="el-icon-delete"></i>
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
    selectFile() {
      document.getElementById("input-file").click()
    },
    onChangeInput(e) {
      this.addFiles(e.target.files)
    },

    addDataTransfer (dataTransfer) {
      this.addFiles(dataTransfer.files)
    },

    addFiles(files) {
      for (let file of files) {
        let reader = new FileReader()
        reader.onload = e => {
          resizeImage(e.target.result, 50, 50, result => {
            // _this.imageDataList.push(result)
            this.tableStatus.push({
              id: this.tableStatus.length,
              name: file.name,
              thumb: result,
              size: file.size,
              speed: 0,
              status: '等待上传'
            })
          })
        }
        reader.readAsDataURL(file)
      }
    },

    dropFile (e) {
    },
    setProgress (i) {
      document.getElementsByClassName("el-table__row")[0].style.backgroundImage = "linear-gradient(to right,#A5DEE4 " + i + "%,white " + i + "%)"
    },
    timeout () {
      if (this.num >= 100) return
      this.setProgress(this.num)
      this.num += 0.1
      setTimeout(this.timeout, 10)
    }
  }
}
</script>
