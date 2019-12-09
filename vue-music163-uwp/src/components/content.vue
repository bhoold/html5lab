<template>
<div id="content">
<template v-if="currentPage=='search'"><search></search></template>
<template v-else-if="currentPage=='discover'"><discover></discover></template>
<template v-else-if="currentPage=='mv'"><mv></mv></template>
<template v-else-if="currentPage=='local'"><local></local></template>
<template v-else-if="currentPage=='download'"><download></download></template>
<template v-else-if="currentPage=='favorite'"><favorite></favorite></template>
</div>
</template>

<script>
import search from '../pages/search'
import discover from '../pages/discover'
import mv from '../pages/mv'
import local from '../pages/local'
import download from '../pages/download'
import favorite from '../pages/favorite'


import { mapState } from 'vuex'

export default {
  data () {
    return {

    }
  },

  methods: {
    startHacking () {

    }
  },
  computed: {
    ...mapState([
      'currentPage',
    ])
  },
  created: function() {

  },
  components: {
    search,
    discover,
    mv,
    local,
    download,
    favorite
  }
}
</script>

<style lang="scss">
#content{
  position: relative;
  flex: 1;
  background: #fff;
  &>.page{
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 2em;
    &>h1{
      margin: 0 0 1em;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
