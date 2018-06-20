<template>
  <div class="not-login">
    <div class="center">
      <img src="../assets/coffee.png"/>
      <p>Coffee</p>
      <p class="help">请登陆</p>
    </div>
  </div>
</template>

<style lang="scss">
  .not-login {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgb(233, 217, 188);
    .center {
      margin: 20% auto;
      user-select: none;
      img {
        margin-left: 18px;
        height: 100px;
        width: 100px;
      }
      p {
        color:#D2B589;
        font-size: 24px;
        user-select: none;
      }
      .help{
        font-size: 15px;
      }
    }
  }
</style>
