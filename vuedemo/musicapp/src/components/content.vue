<template>
<div id="content"></div>
</template>

<script>
export default {
  data () {
    return {

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
#content{
  flex: 1;
  background: #fff;
}
</style>
