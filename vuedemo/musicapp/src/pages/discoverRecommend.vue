<template>
<div id="recommend" class="tabContent">
	<!-- Slider main container -->
	<div class="swiper-container">
	    <!-- Additional required wrapper -->
	    <div class="swiper-wrapper">
	        <!-- Slides -->
	        <div class="swiper-slide"><img src="../images/banner1.jpg"></div>
	        <div class="swiper-slide"><img src="../images/banner2.jpg"></div>
	        <div class="swiper-slide"><img src="../images/banner3.jpg"></div>
	        <div class="swiper-slide"><img src="../images/banner4.jpg"></div>
	        <div class="swiper-slide"><img src="../images/banner5.jpg"></div>
	        <div class="swiper-slide"><img src="../images/banner6.jpg"></div>
	    </div>
	    <!-- If we need pagination -->
	    <div class="swiper-pagination"></div>
	    
	    <!-- If we need navigation buttons -->
	    <div class="swiper-button-prev"></div>
	    <div class="swiper-button-next"></div>
	    
	    <!-- If we need scrollbar -->
	    <div class="swiper-scrollbar"></div>
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
  	var swiper = new Swiper('.swiper-container');
  }
}
</script>

<style lang="scss">
#recommend.tabContent{

}
.swiper-container {
    width: 730px;
    height: 336px;
}    
</style>
