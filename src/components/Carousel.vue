<template>
  <!-- Slider main container -->
  <div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div
        class="swiper-slide"
        v-for="(image, index) in images"
        :key="image.id"
        @click="$emit('update:productIndex', index + 1)"
      >
        <img :src="image.imageUrl" />
      </div>
    </div>
  </div>
</template>

<script>
import { initializeSwiper } from "@/plugins/swiper.js";
export default {
  props: {
    images: {
      type: Array,
    },
    productIndex: {
      type: Number,
    },
  },
  watch: {
    images: {
      handler() {
        this.$nextTick(() => {
          initializeSwiper();
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
  img {
    height: 100%;
    object-fit: cover;
  }
}
</style>
