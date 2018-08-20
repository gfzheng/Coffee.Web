<template>
  <div class="user-card">
    <el-card>
      用户卡
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.user-card {
  display: none;
  cursor: default;
  z-index: 10086;
  padding-top: 10px;
  width: 300px;
  position: absolute;
  &:hover {
    display: inherit;
  }
}
</style>
