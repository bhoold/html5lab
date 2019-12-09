<template>
<div id="recommend" class="tabContent">
	<div class="swiper-container">
	    <div class="swiper-wrapper">
	        <div class="swiper-slide"><img src="../images/banner1.jpg"></div>
	        <div class="swiper-slide"><img src="../images/banner2.jpg"></div>
	        <div class="swiper-slide"><img src="../images/banner3.jpg"></div>
	        <div class="swiper-slide"><img src="../images/banner4.jpg"></div>
	        <div class="swiper-slide"><img src="../images/banner5.jpg"></div>
	        <div class="swiper-slide"><img src="../images/banner6.jpg"></div>
	    </div>
	    <div class="swiper-pagination"></div>
	    <div class="swiper-button-prev"></div>
	    <div class="swiper-button-next"></div>
	</div>
</div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
  data () {
    return {

    }
  },

  methods: {
    startHacking () {

    }
  },
  mounted: function() {
  	var swiper = new Swiper('.swiper-container',{
  		slideToClickedSlide:true,
  		onlyExternal : true,
	    // 如果需要分页器
	    pagination: '.swiper-pagination',
	    
	    // 如果需要前进后退按钮
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
	    
	    // 如果需要滚动条
	    //scrollbar: '.swiper-scrollbar',
  	});
  }
}
</script>

<style lang="scss">
#recommend.tabContent{

}
.swiper-container{
	    margin: 0 auto;
		width: 600px;
	.swiper-wrapper{

		.swiper-slide img {
		    width: 600px;
		} 
	}
}
</style>
