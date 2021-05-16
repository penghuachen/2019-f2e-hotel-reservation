<template>
  <div class="home-container">
    <div class="carousel">
      <Carousel />
      <div class="home-information">
        <div class="logo">
          <img src="@/assets/images/logo_white.svg" alt="logo" />
        </div>
        <div class="information">
          <div class="social-medias">
            <a href="#" class="icon">
              <img src="@/assets/images/instagram-brands.svg" alt="instagram" />
            </a>
            <a href="#" class="icon">
              <img
                src="@/assets/images/facebook-square-brands.svg"
                alt="facebook"
              />
            </a>
          </div>
          <div class="contact">
            <ul>
              <li>
                <span class="icon">
                  <img
                    src="@/assets/images/phone-alt-solid.svg"
                    alt="instagram"
                  />
                </span>
                <span>02-17264937</span>
              </li>
              <li>
                <span class="icon">
                  <img
                    src="@/assets/images/envelope-solid.svg"
                    alt="instagram"
                  />
                </span>
                <span>whitespace@whitespace.com.tw</span>
              </li>
              <li>
                <span class="icon">
                  <img src="@/assets/images/home-solid.svg" alt="instagram" />
                </span>
                <span>台北市羅斯福路十段30號</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="rooms">
      <RoomCard v-for="(item, index) in 6" :random="index" :key="index" />
    </div>
  </div>
</template>

<script>
import RoomCard from "@/components/RoomCard.vue";
import Carousel from "@/components/Carousel.vue";

export default {
  components: {
    RoomCard,
    Carousel,
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  height: 660px;
  background-color: #ddd;
  position: relative;
}

.home-information {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .logo {
    width: 148px;
    height: 148px;
    margin: 0 auto 50px;
  }

  .information {
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    width: 240px;

    @media (min-width: 768px) {
      width: auto;
      flex-direction: row;
      margin-left: 20px;

      &::before {
        content: "";
        position: absolute;
        width: 1px;
        height: 100%;
        left: 80px;
        background-color: #ffffff;
      }
    }

    span {
      vertical-align: middle;
    }

    .icon {
      display: inline-block;
      margin-right: 15px;
    }

    .social-medias {
      @media (min-width: 768px) {
        align-self: center;
      }

      .icon {
        width: 25px;
        cursor: pointer;
      }
    }

    .contact {
      color: #ffffff;
      font-size: 14px;
      margin-bottom: 15px;

      @media (min-width: 768px) {
        padding-left: 15px;
        margin-bottom: 0;
      }

      li {
        margin-bottom: 15px;
        &:last-child {
          margin-bottom: 0;
        }
      }

      .icon {
        width: 20px;
      }
    }
  }
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
