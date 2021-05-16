<template>
  <div class="room">
    <img :src="room.imageUrl" />
    <div class="room-information">
      <div class="name">
        <p>{{ room.name }}</p>
        <p>{{ englishTranslation(room.name) }}</p>
      </div>
      <div class="price">
        <p>
          <span>NT.{{ room.normalDayPrice }}</span
          >平日
        </p>
        <p>NT.{{ room.holidayPrice }} 假日</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
    },
  },
  methods: {
    englishTranslation(name) {
      const chineseNames = {
        "Single Room": "單人房",
        "Deluxe Single Room": "豪華單人房",
        "Double Room": "雙人房",
        "Deluxe Double Room": "豪華雙人房",
        "Twin Room": "四人房",
        "Deluxe Twin Room": "豪華四人房",
      };
      return chineseNames[name];
    },
  },
};
</script>

<style lang="scss" scoped>
.room {
  overflow: hidden;
  position: relative;
  z-index: 2;
  margin: 0 2% 50px;
  width: 94%;
  height: 400px;
  background-color: #f7f7f7;
  text-align: center;
  transform: translateY(-80px);
  box-shadow: 2px 2px 9px 0 rgba(0, 0, 0, 0.18);
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
  transition: transform 0.4s;

  &:hover {
    transform: translateY(0);
    .name p:last-child {
      opacity: 1;
    }
  }

  .name,
  .price {
    padding: 15px 20px;
    text-align: left;
  }

  .name {
    font-size: 14px;
    position: relative;
  }

  .name p:last-child {
    transition: opacity 0.4s;
    opacity: 0;
    font-size: 12px;
    color: #6d7278;
    position: absolute;
    bottom: 0;
  }

  .price {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    color: #6d7278;
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
