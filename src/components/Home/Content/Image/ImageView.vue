<template>
  <div class="image-view">
    <ul class="list">
      <li @click="showBigImage(index)" class="image-list" v-for="(image, index) in showImages">
        <img :src="'/api/thumb/'+ image.Thumb" />
      </li>
      <li @click="showMore" class="image-list image-more" v-if="hideSome">
        <canvas ref="canvasMore" :id="contentId" width="150" height="150"></canvas>
      </li>
    </ul>
    <el-button v-if="!hideSome && images.length > 9" type="text" @click="showLess">收起</el-button>
    <el-dialog width="80%" class="big-dialog" :visible.sync="showImage">
      <div slot="title">浏览大图
        <el-button class="button-download" size="mini" @click="downloadImage">下载</el-button>
      </div>
      <img class="big-img" :src="bigSrc" alt="需要登陆后才能查看">
    </el-dialog>
  </div>
</template>


<script>
export default {
  props: {
    images: {
      require: true
    },
    contentId: {
      require: true
    }
  },
  data () {
    return {
      imageIndex: 0,
      showImage: false,
      bigSrc: '',
      hideSome: true,
      isShowMore: false
    }
  },
  computed: {
    showImages () {
      if (this.hideSome && this.images.length > 9) {
        //this.drawMore()
      this.$nextTick(this.drawMore)
        return this.images.slice(0, 8)
      } else {
        return this.images
      }
    }
  },
  methods: {
    downloadImage () {
      window.open(this.bigSrc)
    },

    showMore () {
      this.hideSome = false
    },

    showLess () {
      this.hideSome = true
      this.$nextTick(this.drawMore)
    },

    showBigImage (i) {
      this.imageIndex = i
      this.bigSrc = '/api/file/' + this.contentId + '/' + this.images[i].File.File.replace(/\//g, '|')
      this.showImage = true
    },

    drawMore () {
      console.log(this.contentId)
      console.log(document.getElementById(this.contentId))
      let ctx = document.getElementById(this.contentId).getContext("2d")
      console.log(ctx)
      let width = 150
      let height = 150
      let radius = 5
      ctx.save()
      ctx.translate(0, 0)
      //绘制圆角矩形的各个边
      ctx.beginPath(0)
      //从右下角顺时针绘制，弧度从0到1/2PI
      ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2)
      //矩形下边线
      ctx.lineTo(radius, height)
      //左下角圆弧，弧度从1/2PI到PI
      ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)
      //矩形左边线
      ctx.lineTo(0, radius)
      //左上角圆弧，弧度从PI到3/2PI
      ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2)
      //上边线
      ctx.lineTo(width - radius, 0)
      //右上角圆弧
      ctx.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2)
      //右边线
      ctx.lineTo(width, height - radius)
      ctx.closePath()
      ctx.fillStyle = "rgba(127, 127, 127, 1)"
      ctx.fill()
      ctx.font = '38px Arial'
      ctx.fillStyle = "white";
      ctx.fillText('+' + (this.images.length - 8), 40, 90)
      ctx.restore()
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.image-view {
  .list {
    margin-left: -10px;
    .image-list {
      cursor: pointer;
      list-style: none;
      display: inline;
      margin-right: 10px;
      img {
        border-radius: 5px;
        margin-bottom: 10px;
        &:hover {
          transform: translateY(-3px);
          transition: all 0.4s;
        }
      }
    }
    .image-more {
      canvas {
        &:hover {
          transform: translateY(-3px);
          transition: all 0.4s;
        }
        margin-bottom: 10px;
      }
      cursor: pointer;
      height: 150px;
      width: 150px;
      vertical-align: middle;
    }
  }
  .big-dialog {
    width: 100%;
    .button-download {
      margin-left: 20px;
    }
    .big-img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
