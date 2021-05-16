<template>
  <!-- Slider main container -->
  <div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide" v-for="room in rooms" :key="room.id">
        <img :src="room.imageUrl" />
      </div>
      <!-- <div class="swiper-slide">
        <img src="https://picsum.photos/1000/600/?random=21" />
      </div>
      <div class="swiper-slide">
        <img src="https://picsum.photos/1000/600/?random=22" />
      </div> -->
    </div>
  </div>
</template>

<script>
// {"id":"3Elqe8kfMxdZv5xFLV4OUeN6jhmxIvQSTyj4eTgIowfIRvF4rerA2Nuegzc2Rgwu",
// "imageUrl":"https://images.unsplash.com/photo-1551776235-dde6d482980b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80",
// "normalDayPrice":1380,
// "holidayPrice":1500,
// "name":"Single Room"}
// plugins
import { initializeSwiper } from "@/plugins/swiper.js";
export default {
  props: {
    rooms: {
      type: Array,
    },
  },
  watch: {
    rooms: {
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
