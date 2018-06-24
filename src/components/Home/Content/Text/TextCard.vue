<template>
  <div class="content-card">
    <transition name="el-zoom-in-center" @after-leave="showEdit = true">
      <content-card v-show="showCard" :contentData="contentData" @showEdit="toEdit"/>
    </transition>
    <transition name="el-zoom-in-center" @after-leave="showCard = true">
      <edit-card v-show="showEdit" @submit="doneEdit" @closeIt="showEdit = false" :rawData="contentData"></edit-card>
    </transition>
  </div>
</template>

<script>
import EditCard from './EditCard'
import ContentCard from '@/components/ContentCard'
import { mapState } from 'vuex'
export default {
  props: {
    contentData: {
      require: true
    }
  },
  components: {
    EditCard, ContentCard
  },
  data () {
    return {
      showCard: true,
      showEdit: false,
    }
  },
  methods: {
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
