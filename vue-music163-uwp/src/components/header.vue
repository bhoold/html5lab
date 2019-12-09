<template>
<div id="header" class="clearfix">
  <span class="title">音乐播放器</span>
  <div class="btns">
    <a class="iconfont icon-close" title="关闭" @click="close"></a>
    <a class="iconfont icon-square" title="最大化" @click="maximize" v-if="!isFullScreen && !isModal"></a>
    <a class="iconfont icon-round" title="恢复" @click="restore" v-else></a>
    <a class="iconfont icon-move" title="最小化" @click="minimize"></a>
  </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations([
      'changeFullScreen',
      'changeModal'
    ]),
    close(){
      console.log(11)
    },
    maximize(){
      document.documentElement.webkitRequestFullScreen()
      this.changeFullScreen(true)
    },
    restore(){
      document.webkitCancelFullScreen()
      this.changeFullScreen(false)
      this.changeModal(false)
    },
    minimize(){
      this.changeModal(true)
    }
  },
  computed: {
    ...mapState([
      'isFullScreen',
      'isModal'
    ])
  }
}
</script>

<style lang="scss">
@import 'src/css/variable';

#header{
  color: #fff;
  background: $headerBgColor;
  #app.blur &{
    background: $headerBgColorBlur;
  }
  .title{
    float: left;
    padding: 0 8px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }
  .btns{
    float: right;
    a{
      float: right;
      padding: 6px 8px;
      color: #fff;
      &:hover{
        background: #2997ef;
      }
      &.icon-close:hover {
        background: #e81123;
      }
    }
  }
}
</style>
