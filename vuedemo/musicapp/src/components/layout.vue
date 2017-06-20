<template>
  <div id="app">
    <appHeader></appHeader>
    <div id="main">
      <appMenu></appMenu>
      <appcontent></appcontent>
    </div>
    <playerMin></playerMin>
  </div>
</template>
  
<script>
import appHeader from '../components/header'
import appMenu from '../components/menu'
import appcontent from '../components/content'
import playerMin from '../components/playerMin'

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
  },
  components: {
    appHeader,
    appMenu,
    appcontent,
    playerMin
  }
}
</script>

<style lang="scss">
*{
    box-sizing: border-box;
}
html,body,#app{
  height: 100%;
}
body {
  margin: 0;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
#main{
  display: flex;
  height: calc(100% - 30px - 60px);
}



</style>
