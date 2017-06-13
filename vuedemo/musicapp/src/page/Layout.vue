<template>
  <div id="app">
    <div id="main">
      <div id="menu">
      <i class="el-icon-arrow-down"></i>
      <i class="iconfont icon-search"></i>
      </div>
      <div id="content"></div>
    </div>
    <div id="playerMin"></div>
  </div>
</template>
  
<script>
export default {
  data () {
    return {
      msg: 'Use Vue 2.0 Today!'
    }
  },

  methods: {
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    }
  }
}
</script>

<style lang="scss">
html,body,#app{
  height: 100%;
}
body {
    margin: 0;
    font-size: 1rem;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
#app{

}

</style>
