<template>
  <div class="home-container">
    <Loading
      :isLoading="pageLoadingConfig.isLoading"
      :fullPage="pageLoadingConfig.fullPage"
    />
    <div class="carousel">
      <Carousel :images="rooms" />
      <div class="home-information">
        <h1 class="logo">
          <a href="#">
            <img src="@/assets/images/logo_white.svg" alt="logo" />
          </a>
        </h1>
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
      <RoomCard v-for="room in rooms" :room="room" :key="room.id" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RoomCard from "@/components/RoomCard.vue";
import Carousel from "@/components/Carousel.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "Home",
  components: {
    RoomCard,
    Carousel,
    Loading,
  },
  computed: {
    ...mapGetters(["rooms", "pageLoadingConfig"]),
  },
  methods: {
    async fetchRooms() {
      this.$store.commit("UPDATE_PAGE_LOADING_CONFIG", {
        isLoading: true,
        fullPage: true,
      });

      await this.$store.dispatch("fetchRooms");

      this.$store.commit("UPDATE_PAGE_LOADING_CONFIG", {
        isLoading: false,
        fullPage: true,
      });
    },
  },
  created() {
    this.fetchRooms();
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  height: 660px;
  background-color: #ddd;
  position: relative;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
}

.home-information {
  position: absolute;
  z-index: 2;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -45%);

  .logo {
    width: 148px;
    height: 148px;
    margin: 0 auto 50px;

    a {
      display: inline-block;
    }
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
        white-space: nowrap;
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
