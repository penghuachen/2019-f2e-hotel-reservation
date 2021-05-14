<template>
  <div class="home-container">
    <div class="carousel">
      <div class="home-information">
        <div class="logo">
          logo
        </div>
        <div class="information">
          info
        </div>
      </div>
    </div>
    <div class="rooms">
      <RoomCard v-for="(item, index) in 6" :random="index" :key="index"/>
    </div>
  </div>
</template>

<script>
import RoomCard from "@/components/RoomCard.vue";

export default {
  components: {
    RoomCard
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  height: 660px;
  background-color: #ddd;
}

.rooms {
  background-color: #ffffff;
  padding: 0 1%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media (min-width: 1440px) {
    padding: 0 4%;
  }

}
</style>