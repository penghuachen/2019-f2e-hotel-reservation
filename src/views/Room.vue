<template>
  <div class="each-room-container">
    <Loading
      :isLoading="pageLoadingConfig.isLoading"
      :fullPage="pageLoadingConfig.fullPage"
    />
    <h2 class="logo">
      <a href="#">
        <img src="@/assets/images/inner-page-logo.svg" alt="logo" />
      </a>
    </h2>
    <div class="room-photos">
      <div class="light-box" @click.prevent="toggler = !toggler">
        <div class="main-photo">
          <img src="https://picsum.photos/1000/600/?random=1" />
        </div>
        <div class="sub-photo">
          <img src="https://picsum.photos/500/300/?random=2" />
        </div>
        <div class="sub-photo">
          <img src="https://picsum.photos/500/300/?random=3" />
        </div>
      </div>
      <div class="carousel" @click.prevent="toggler = !toggler">
        <Carousel
          :rooms="[{ imageUrl: 'https://picsum.photos/500/400/?random=3' }]"
        />
      </div>
      <FsLightbox
        :toggler="toggler"
        :sources="[
          'https://picsum.photos/1000/600/?random=1',
          'https://picsum.photos/1000/600/?random=2',
          'https://picsum.photos/1000/600/?random=3',
        ]"
      />
    </div>
    <div class="each-room-details">
      <div class="introduction">
        <h2>Single Room</h2>
        <div class="prices">
          <p class="normal">NT.1380</p>
          <p class="day">平日(一~四)</p>
          <p class="holiday">NT.1500</p>
          <p class="day">假日(五~日)</p>
        </div>
        <ul class="specification">
          <li>房客人數限制： 1~1 人</li>
          <li>床型：單人床</li>
          <li>衛浴數量： 1 間</li>
          <li>房間大小： 18 平方公尺</li>
        </ul>
        <div class="brief">
          Single Room is only reserved for one guest. There is a bedroom with a
          single size bed and a private bathroom. Everything you need prepared
          for you: sheets and blankets, towels, soap and shampoo, hairdryer are
          provided. In the room there is AC and of course WiFi.
        </div>
        <p class="slashes">\ \ \</p>
        <div class="valid-time">
          <div class="check-in">
            <p class="text">Check in</p>
            <p>15:00 — 21:00</p>
          </div>
          <div class="check-out">
            <p class="text">Check out</p>
            <p>21:00</p>
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
  components: {
    FsLightbox,
    Carousel,
    Loading,
  },
  data() {
    return {
      toggler: false,
      // 後續寫入 getter, mapping api data
      utilites: [
        {
          id: 1,
          iconName: "wifi",
          name: "Wi-Fi",
          enabled: false,
        },
        {
          id: 2,
          iconName: "phone",
          name: "電話",
          enabled: false,
        },
        {
          id: 3,
          iconName: "mountain-range",
          name: "漂亮的視野",
          enabled: false,
        },
        {
          id: 4,
          iconName: "breakfast",
          name: "早餐",
          enabled: false,
        },
        {
          id: 5,
          iconName: "breeze",
          name: "空調",
          enabled: false,
        },
        {
          id: 6,
          iconName: "no-smoke-symbol",
          name: "禁止吸煙",
          enabled: false,
        },
        {
          id: 7,
          iconName: "bar",
          name: "Mini Bar",
          enabled: false,
        },
        {
          id: 8,
          iconName: "refrigerator",
          name: "冰箱",
          enabled: false,
        },
        {
          id: 9,
          iconName: "crawling-baby-silhouette",
          name: "適合兒童",
          enabled: false,
        },
        {
          id: 10,
          iconName: "room_service",
          name: "Room Service",
          enabled: false,
        },
        {
          id: 11,
          iconName: "sofa",
          name: "沙發",
          enabled: false,
        },
        {
          id: 12,
          iconName: "dog",
          name: "寵物攜帶",
          enabled: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["pageLoadingConfig"]),
  },
  methods: {
    fetchSingleRoom() {
      this.$store.commit("UPDATE_PAGE_LOADING_CONFIG", {
        isLoading: true,
        fullPage: true,
      });

      setTimeout(() => {
        this.$store.commit("UPDATE_PAGE_LOADING_CONFIG", {
          isLoading: false,
          fullPage: true,
        });
      }, 2000);
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

  .light-box {
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
      font-size: 28px;
      margin-bottom: 30px;

      @media (min-width: 576px) {
        font-size: 36px;
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
