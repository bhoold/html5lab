<template>
  <div id="app">
    <div id="main">
      <div id="menu">

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
#main{
  display: flex;
  height: calc(100% - 60px);
}
#menu{
  position: relative;
  background: #f3f3f5;
  width: 200px;
  border: 1px solid #d3d3d8;
}
#content{
  flex: 1;
}
#playerMin{
  position: fixed;
  left: 1px;
  bottom: 1px;
  right: 1px;
  height: 60px;
  border-top: 1px solid #d3d3d8;
  background: #fff;
}
</style>
