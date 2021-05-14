<template>
  <div class="room">
    <img :src="`https://picsum.photos/300/200/?random=${random}`">
    <div class="room-information">
      <div class="name">
        <p>Single Room</p>
        <p>單人房</p>
      </div>
      <div class="price">
        <p><span>NT.2460</span>平日</p>
        <p>NT.2500 假日</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["random"]
}
</script>

<style lang="scss" scoped>
.room {
  overflow: hidden;
  position: relative;
  margin: 0 2% 50px;
  width: 94%;
  height: 400px;
  background-color: #f7f7f7;
  text-align: center;
  transform: translateY(-80px);
  box-shadow: 2px 2px 9px 0 rgba(0,0,0,0.18);
  cursor: pointer;

  @media (min-width: 576px) {
    width: 44%;
  }

  @media (min-width: 1024px) {
    width: 25.33%;
  }

  img {
    height: 100%;
  }
}

.room-information {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #f7f7f7;
  transform: translateY(48px);
  transition: transform .4s;

  &:hover {
    transform: translateY(0);
    .name p:last-child {
      opacity: 1;
    }
  }

  .name, .price {
    padding: 15px 20px;
    text-align: left;
  }

  .name {
    font-size: 14px;
  } 

  .name p:last-child {
    transition: opacity .4s;
    opacity: 1;
    font-size: 12px;
    color: #6D7278;
  }

  .price {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    color: #6D7278;
    font-size: 12px;
    p {
      span {
        font-size: 21px;
        line-height: 16px;
        margin-right: 3px;
      }
    }
    > p:first-child {
      color: #000000;
    }
  }
}
</style>