<template>
  <div class="each-room-container">
    <Loading
      :isLoading="pageLoadingConfig.isLoading"
      :fullPage="pageLoadingConfig.fullPage"
    />
    <h2 class="logo">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/images/inner-page-logo.svg" alt="logo" />
      </router-link>
    </h2>
    <div class="room-photos">
      <div class="room-photo" @click.prevent="toggler = !toggler">
        <div
          v-for="(imageUrl, index) in singeRoomLightboxPhotos"
          :key="index"
          class="photo"
          :class="[index === 0 ? 'main-photo' : 'sub-photo']"
        >
          <img :src="imageUrl" />
        </div>
      </div>
      <div class="carousel" @click.prevent="toggler = !toggler">
        <Carousel :images="singeRoomCarouselPhotos" />
      </div>
      <FsLightbox :toggler="toggler" :sources="singeRoomLightboxPhotos" />
    </div>
    <div class="each-room-details">
      <div class="introduction">
        <h2>{{ room.name }}</h2>
        <div class="prices">
          <p class="normal">NT.{{ room.normalDayPrice }}</p>
          <p class="day">平日(一~四)</p>
          <p class="holiday">NT.{{ room.holidayPrice }}</p>
          <p class="day">假日(五~日)</p>
        </div>
        <ul class="specification">
          <li>
            房客人數限制：
            {{ room.descriptionShort && room.descriptionShort.GuestMin }}~
            {{ room.descriptionShort && room.descriptionShort.GuestMax }}
            人
          </li>
          <li>
            床型：{{
              room.descriptionShort && checkBedType(room.descriptionShort.Bed)
            }}
          </li>
          <li>
            衛浴數量：
            {{
              room.descriptionShort && room.descriptionShort["Private-Bath"]
            }}1 間
          </li>
          <li>
            房間大小：
            {{ room.descriptionShort && room.descriptionShort.Footage }}
            平方公尺
          </li>
        </ul>
        <div class="brief">{{ room.description }}</div>
        <p class="slashes">\ \ \</p>
        <div class="valid-time">
          <div class="check-in">
            <p class="text">Check in</p>
            <p>
              {{ room.checkInAndOut && room.checkInAndOut.checkInEarly }} —
              {{ room.checkInAndOut && room.checkInAndOut.checkInLate }}
            </p>
          </div>
          <div class="check-out">
            <p class="text">Check out</p>
            <p>{{ room.checkInAndOut && room.checkInAndOut.checkOut }}</p>
          </div>
        </div>
        <div class="utilites">
          <div
            v-for="utility in utilites"
            :key="utility.id"
            class="utility"
            :class="{ 'enabled-utility': utility.enabled }"
          >
            <SvgIcon :iconName="utility.iconName" />
            <span>{{ utility.name }}</span>
          </div>
        </div>
      </div>
      <div class="room-reservation"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FsLightbox from "fslightbox-vue";
import Carousel from "@/components/Carousel.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "singleRoom",
  components: {
    FsLightbox,
    Carousel,
    Loading,
  },
  data() {
    return {
      toggler: false,
    };
  },
  computed: {
    ...mapGetters([
      "pageLoadingConfig",
      "singeRoomCarouselPhotos",
      "singeRoomLightboxPhotos",
      "room",
      "utilites",
    ]),
  },
  methods: {
    async fetchSingleRoom() {
      this.$store.commit("UPDATE_PAGE_LOADING_CONFIG", {
        isLoading: true,
        fullPage: true,
      });

      await this.$store.dispatch("fetchSingleRoom", {
        id: this.$route.params.id,
      });

      this.$store.commit("UPDATE_PAGE_LOADING_CONFIG", {
        isLoading: false,
        fullPage: true,
      });
    },
    checkBedType(beds) {
      const type = {
        Double: "雙人床",
        Single: "單人床",
        Queen: "加大雙人床",
        "Small Double": "小型雙人床",
      };
      return beds
        .slice(0, 1)
        .map((bed) => type[bed])
        .join("");
    },
  },
  created() {
    this.fetchSingleRoom();
  },
};
</script>

<style lang="scss" scoped>
.each-room-container {
  width: 100%;
  height: 600px;
  position: relative;
}

.logo {
  width: 150px;
  position: absolute;
  z-index: 2;
  top: 12px;
  left: 29px;

  @media (min-width: 576px) {
    top: 32px;
    left: 49px;
  }
}

.room-photos {
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  min-height: 400px;
  cursor: pointer;

  @media (min-width: 576px) {
    height: auto;
    min-height: unset;
  }

  img {
    height: 100%;
  }

  .room-photo {
    display: none;

    &::after {
      content: "";
      display: block;
      clear: both;
    }

    @media (min-width: 768px) {
      display: block;
    }

    .main-photo {
      float: left;
      width: 60%;
      height: 600px;
    }

    .sub-photo {
      float: right;
      width: 40%;
      height: 300px;
    }
  }

  .carousel {
    display: block;
    height: 400px;
    @media (min-width: 768px) {
      display: none;
    }
  }
}

.each-room-details {
  padding: 30px;

  .introduction {
    position: relative;
    width: 100%;

    @media (min-width: 768px) {
      width: 50%;
    }

    h2 {
      font-size: 24px;
      margin-bottom: 20px;

      @media (min-width: 576px) {
        font-size: 36px;
        margin-bottom: 30px;
      }
    }

    .prices {
      position: absolute;
      top: 5px;
      right: 0;
      text-align: right;

      @media (min-width: 1024px) {
        right: -120px;
      }

      .normal {
        font-size: 22px;

        @media (min-width: 576px) {
          font-size: 30px;
        }
      }

      .day {
        font-size: 14px;
        color: #6d7278;
      }

      .holiday {
        margin-top: 15px;
      }
    }

    .specification {
      font-size: 14px;

      li {
        margin-bottom: 15px;
      }
    }

    .slashes {
      margin: 30px 0;
    }

    .valid-time {
      margin-bottom: 40px;
      display: flex;

      .text {
        font-size: 14px;
      }

      .check-out,
      .check-in {
        font-size: 20px;
      }

      .check-in {
        margin-right: 96px;
      }
    }

    .utilites {
      background: #f0f0f0;
      display: flex;
      flex-wrap: wrap;

      @media (min-width: 375px) {
        padding: 15px;
      }

      @media (min-width: 768px) {
        padding: 30px;
      }

      .utility {
        padding-bottom: 20px;
        @media (min-width: 375px) {
          flex: 1 0 50%;
        }

        @media (min-width: 576px) {
          flex: 1 0 33.33%;
        }

        @media (min-width: 768px) {
          flex: 1 0 50%;
        }

        @media (min-width: 992px) {
          flex: 1 0 33.33%;
        }

        &:nth-child(n + 9) {
          padding-bottom: 0;

          @media (min-width: 375px) {
            padding-bottom: 20px;
          }
        }

        &:nth-child(n + 10) {
          @media (min-width: 375px) {
            padding-bottom: 0;
          }
        }

        svg,
        span {
          vertical-align: middle;
          color: #6d7278;
        }
        span {
          font-size: 12px;
          margin-left: 26px;
        }
      }

      .enabled-utility {
        svg,
        span {
          color: #000000;
        }
      }
    }
  }

  .room-reservation {
    width: 50%;
  }
}
</style>
