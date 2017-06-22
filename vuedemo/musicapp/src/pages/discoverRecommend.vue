<template>
<div id="recommend" class="tabContent">
	<!-- Slider main container -->
	<div class="swiper-container">
	    <!-- Additional required wrapper -->
	    <div class="swiper-wrapper">
	        <!-- Slides -->
	        <div class="swiper-slide">Slide 1</div>
	        <div class="swiper-slide">Slide 2</div>
	        <div class="swiper-slide">Slide 3</div>
	        ...
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
    
var mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  direction: 'vertical',
  loop: true
})


export default {
  data () {
    return {

    }
  },

  methods: {
    startHacking () {

    }
  }
}
</script>

<style lang="scss">
#recommend.tabContent{

}
.swiper-container {
    width: 600px;
    height: 300px;
}    
</style>
