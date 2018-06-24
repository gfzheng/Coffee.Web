<template>
  <div class="text-card">
    <time-line :titleText="formatTime(contentData.PublishDate)"/>
    <transition name="el-zoom-in-center" @after-leave="showEdit = true">
      <el-card class="text-content" shadow="hover" v-show="showCard">
        <content-card :contentData="contentData" @showEdit="toEdit" showEdit/>
      </el-card>
    </transition>
    <transition name="el-zoom-in-center" @after-leave="showCard = true">
      <edit-card v-show="showEdit" @submit="doneEdit" @closeIt="showEdit = false" :rawData="contentData"></edit-card>
    </transition>
  </div>
</template>

<script>
import EditCard from './EditCard'
import ContentCard from '@/components/ContentCard'
import TimeLine from '@/components/TimeLine'
import { mapState } from 'vuex'
export default {
  props: {
    contentData: {
      require: true
    }
  },
  components: {
    EditCard, ContentCard, TimeLine
  },
  data () {
    return {
      showCard: true,
      showEdit: false,
    }
  },
  methods: {
    formatTime(date) {
      return this.$util.formatDate(new Date(date), 'yyyy.M.dd hh:mm')
    },
    toEdit() {
      this.showEdit = true;
      this.showCard = false;
    },
    doneEdit () {
      this.showEdit = false
      this.$emit('FlushTextList');
    },
  }
}
</script>

<style lang="scss">
 .text-card{
   .text-content{
     margin-left: 30px;
   }
 }
</style>
