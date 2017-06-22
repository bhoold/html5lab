<template>
  <div id="app" :class="{blur: isBlur, modal: isModal}">
    <appHeader></appHeader>
    <div id="main">
      <appMenu></appMenu>
      <appcontent></appcontent>
    </div>
    <playerMin></playerMin>
  </div>
</template>
  
<script>
import { mapState, mapGetters } from 'vuex'

import appHeader from '../components/header'
import appMenu from '../components/menu'
import appcontent from '../components/content'
import playerMin from '../components/playerMin'

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
  },
  computed: mapState([
    'isBlur',
    'isModal'
  ]),

/*
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
*/
/*
computed: {
  localComputed () {  },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
*/
/*
  {
    isBlur(){
      return this.$store.state.isBlur
    },
    isModal(){
      return this.$store.state.isModal
    }

  },*/
  components: {
    appHeader,
    appMenu,
    appcontent,
    playerMin
  }
}
</script>

<style lang="scss">
@import 'src/css/variable';

#app{
  position: relative;
  height: 100%;
  &.modal{
    position: fixed;
    top: 50%;
    left: 50%;
    width: 800px;
    height: 600px;
    transform: translate(-50%,-50%);
    box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.5);
  }
  #main{
    display: flex;
    height: calc(100% - 30px - 60px);
  }
}
</style>