<template>
<div id="discover" class="page">
	<h1>发现音乐</h1>
	<div class="tab">
		<div class="title">
			<div class="item" :class="{active: currentTab=='recommend'}" @click="showContent('recommend')">个性推荐</div>
			<div class="item" :class="{active: currentTab=='list'}" @click="showContent('list')">歌单</div>
			<div class="item" :class="{active: currentTab=='radioStation'}" @click="showContent('radioStation')">主播电台</div>
			<div class="item" :class="{active: currentTab=='new'}" @click="showContent('new')">最新音乐</div>
			<div class="item" :class="{active: currentTab=='singer'}" @click="showContent('singer')">歌手</div>
		</div>
		<div class="content">
			<template v-if="currentTab=='recommend'"><recommend></recommend></template>
			<template v-else-if="currentTab=='list'"><list></list></template>
			<template v-else-if="currentTab=='radioStation'"><radioStation></radioStation></template>
			<template v-else-if="currentTab=='new'"><tabContentNew></tabContentNew></template>
			<template v-else-if="currentTab=='singer'"><singer></singer></template>
		</div>
	</div>
</div>
</template>

<script>
import recommend from '../pages/discoverRecommend'
import list from '../pages/discoverList'
import radioStation from '../pages/discoverRadioStation'
import tabContentNew from '../pages/discoverNew'
import singer from '../pages/discoverSinger'


export default {
  data () {
    return {
    	currentTab: 'recommend'
    }
  },

  methods: {
    showContent (itemName) {
    	this.currentTab = itemName;
    }
  },
  components: {
    recommend,
    list,
    radioStation,
    tabContentNew,
    singer
  }
}
</script>

<style lang="scss">
#discover.page{

}
</style>
