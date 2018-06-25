<template>
  <transition name="el-zoom-in-top">
    <el-button v-if="windowsScroll >= 300" class="button-top" type="success" icon="el-icon-arrow-up" circle @click="toTop"></el-button>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        windowsScroll: 0
      };
    },
    methods: {
      toTop() {
        window.scroll({"behavior": "smooth", "top": 0})
      },
    },
    mounted() {
      window.addEventListener('scroll',(e) => {
        this.windowsScroll = window.scrollY
      })
    }
  };
</script>

<style lang="scss">
    .button-top {
      z-index: 1025;
      position: fixed;
      bottom: 40px;
      left: 40px;
    }
    .button-top-none {
      z-index: 1025;
      display: none;
    }
</style>
