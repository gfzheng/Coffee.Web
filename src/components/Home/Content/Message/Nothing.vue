<template>
  <div class="nothing-box">
    <span class="with-love" id="animate"><i class="fa fa-heart"></i> </span>
    <p>{{helpText}}</p>
  </div>
</template>

<script>
export default {
  props:  {
    helpText: {
      require: false
    }
  }
}
</script>


<style lang="scss">
  .nothing-box {
    height: 300px;
    margin-top: 120px;
    text-align: center;
    .with-love {
      display: inline-block;
      margin: 0 5px;
      color: #ff0000;
      font-size: 30px;
    }
    #animate {
      animation: iconAnimate 1.33s ease-in-out infinite;
    }
  }

  @keyframes iconAnimate {
    0%,
    100% {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
    10%,
    30% {
      -webkit-transform: scale(0.9);
      -moz-transform: scale(0.9);
      -ms-transform: scale(0.9);
      -o-transform: scale(0.9);
      transform: scale(0.9);
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: scale(1.1);
      -moz-transform: scale(1.1);
      -ms-transform: scale(1.1);
      -o-transform: scale(1.1);
      transform: scale(1.1);
    }
    50%,
    70% {
      -webkit-transform: scale(1.1);
      -moz-transform: scale(1.1);
      -ms-transform: scale(1.1);
      -o-transform: scale(1.1);
      transform: scale(1.1);
    }
  }
</style>
