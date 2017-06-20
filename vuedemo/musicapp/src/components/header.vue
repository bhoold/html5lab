<template>
<div id="header">
  <span class="title">音乐播放器</span>
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
#header{
  color: #fff;
  background: #0078d7;
  .title{
    padding: 0 8px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }
}
</style>
