<template>
  <!-- Slider main container -->
  <div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide">
        <img src="https://picsum.photos/1000/600/?random=20" />
      </div>
      <div class="swiper-slide">
        <img src="https://picsum.photos/1000/600/?random=21" />
      </div>
      <div class="swiper-slide">
        <img src="https://picsum.photos/1000/600/?random=22" />
      </div>
    </div>
  </div>
</template>

<script>
// plugins
import { initializeSwiper } from "@/plugins/swiper.js";
export default {
  created() {
    this.$nextTick(() => initializeSwiper());
  },
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
  img {
    height: 100%;
  }
}
</style>
