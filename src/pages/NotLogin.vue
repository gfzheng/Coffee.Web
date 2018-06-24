<template>
  <div class="not-login">
    <div class="center">
      <img src="../assets/coffee.png"/>
      <p>Coffee</p>
      <p class="sub-title">个人数据管理中心</p>
      <p class="help">登陆后查看更多内容</p>
    </div>
  </div>
</template>

<style lang="scss">
  .not-login {
    position: fixed;
    width: 100%;
    height: 100%;
  background: rgb(245, 245, 245);
    .center {
      margin: 20% auto;
      user-select: none;
      img {
        margin-left: 22px;
        height: 110px;
        width: 110px;
      }
      p {
        color:rgb(192, 162, 117);
        font-size: 26px;
        user-select: none;
      }
      .sub-title{
        color:rgb(160, 135, 98);
        font-size: 20px;
      }
      .help{
        color:rgb(160, 135, 98);
        font-size: 14px;
      }
    }
  }
</style>
