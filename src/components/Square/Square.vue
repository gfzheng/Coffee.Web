<template>
  <div class="square">
    <el-row type="flex" :gutter="20" justify="center">
      <el-col :span="14">
        <el-card shadow="hover">
          Hello
        </el-card>
      </el-col>
      <el-col class="square-right" :span="8">
        <el-card shadow="hover">
          World
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  mounted() {
    window.scroll(0, 0)
  }
}
</script>

<style lang="scss">
  .square{
    padding-top: 100px;
    height: 1000px;
    background: rgb(245, 245, 245);

  }
</style>
