<template>
  <p class="line-time">
    <i class="fa fa-circle time-point" aria-hidden="true"></i>
    <span class="time-text">{{titleText}}</span>
  </p>
</template>

<script>
export default {
  props: {
    titleText: {
      require: true
    }
  },
  methods: {
  }
}
</script>


<style lang="scss">
.line-time {
  &:hover {
    .time-point {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
  .time-point {
    color: white;
    margin-left: -10px;
    border: 2px solid orange;
    border-radius: 100%;
  }
  .time-text {
    margin-left: 20px;
    font-size: 18px;
  }
  padding-top: 10px;
  color: rgb(206, 161, 123);
}
</style>
