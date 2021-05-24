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
      <div class="room-reservation">
        <Calendar
          v-model="date"
          :available-dates="{ start: new Date(), end: null }"
        />
        <div class="booking">
          <button @click="bookingDialogVisible = true">預約時段</button>
        </div>
      </div>
    </div>
    <Dialog :dialogVisible="bookingDialogVisible">
      <template v-slot:header>
        <h3>預約時段</h3>
        <p>\ \ \</p>
      </template>
      <template v-slot:body>
        <form class="booking-form">
          <div class="name">
            <label for="name">
              <span class="field-title">姓名</span>
              <input type="text" id="name">
            </label>
          </div>
          <div class="telephone">
            <label for="telephone">
              <span class="field-title">電話</span>
              <input type="tel" id="telephone">
            </label>
          </div>
          <div class="date">
            <span class="field-title">預約起迄</span>
            <DatePicker class="start-date" v-model="date">
              <template v-slot="{ inputValue, togglePopover }">
                <div>
                  <input
                    @click="togglePopover()"
                    :value="inputValue"
                    readonly
                  />
                </div>
              </template>
            </DatePicker>
            <span class="separate">~</span>
            <DatePicker class="end-date" v-model="date">
              <template v-slot="{ inputValue, togglePopover }">
                <div>
                  <input
                    @click="togglePopover()"
                    :value="inputValue"
                    readonly
                  />
                </div>
              </template>
            </DatePicker>
          </div>
          <div class="booking-price">
            <div class="container">
              <div class="normal">
                <span>平日時段</span>
                <span>1夜</span>
              </div>
              <div class="holiday">
                <span>假日時段</span>
                <span>1夜</span>
              </div>
            </div>
            <div class="total-price">
              <span> = </span>
              <span>NT.2850</span>
            </div>
          </div>
        </form>
      </template>
      <template v-slot:footer>
        <div class="buttons-block">
          <button class="cancel">取消</button>
          <button class="confirm">確定預約</button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FsLightbox from "fslightbox-vue";
import Carousel from "@/components/Carousel.vue";
import Loading from "@/components/Loading.vue";
import Dialog from "@/components/Dialog.vue";
import Calendar from "v-calendar/lib/components/calendar.umd";
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
  name: "singleRoom",
  components: {
    FsLightbox,
    Carousel,
    Loading,
    Calendar,
    DatePicker,
    Dialog
  },
  data() {
    return {
      toggler: false,
      bookingDialogVisible: false,
      date: new Date(),
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
  display: flex;
  flex-direction: column;
  padding: 30px 30px 90px 30px;

  @media (min-width: 1440px) {
    padding: 30px 150px;
  }

  @media (min-width: 992px) {
    flex-direction: row;
  }

  .introduction {
    position: relative;
    width: 100%;

    @media (min-width: 992px) {
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
        margin-right: 75px;
      }
    }

    .utilites {
      background: #f0f0f0;
      display: flex;
      flex-wrap: wrap;
      border-radius: 10px;

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
    width: 100%;
    margin-top: 30px;
    position: relative;

    @media (min-width: 992px) {
      margin-top: 0;
      width: 50%;
    }

    ::v-deep .vc-container {
      position: unset;
      min-width: 100%;
      width: auto;
      height: auto;
      background: #f7f7f7;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
      border: none;

      @media (min-width: 576px) {
        width: 350px;
        height: 350px;
      }

      @media (min-width: 992px) {
        position: absolute;
        top: 0;
        right: 0;
        min-width: unset;
      }

      @media (min-width: 1440px) {
        width: 400px;
        height: 400px;
      }

      .vc-weekday {
        line-height: 25px;
        font-size: 18px;
      }

      .vc-day {
        height: 45px;
        @media (min-width: 1440px) {
          height: 50px;
        }
      }
    }

    .booking {
      position: absolute;
      right: unset;
      top: 370px;

      @media (min-width: 992px) {
        right: 230px;
      }

      @media (min-width: 1440px) {
        right: 280px;
        top: 420px;
      }

      button {
        width: 118px;
        height: 53px;
        color: #ffffff;
        background: #575757;
        position: relative;
        transition: background 0.3s;

        &:hover {
          background: #000000;
        }

        &::after {
          content: "";
          position: absolute;
          z-index: -1;
          top: 5px;
          right: 0;
          bottom: 0;
          left: 5px;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            45deg,
            #575757,
            #575757 2px,
            #ffffff 2px,
            #ffffff 4px
          );
        }
      }
    }
  }
}


::v-deep .dialog-body {
  padding: 0;
}

::v-deep .booking-form {
  margin-bottom: 20px;
  .name, .telephone, .date {
    padding: 0 40px;
    span {
      font-size: 14px;
      font-weight: 600;
    }
  }

  .name, .telephone {
    padding-bottom: 15px;
    .field-title {
      margin-right: 63px;
    }
  }

  .date {
    .field-title {
      margin-right: 31px;
    }
  }

  label {
    display: block;
    width: 100%;
  }
  
  input {
    border: 1px solid #C9C9C9;
    border-radius: 5px;
    height: 32px;
    min-width: calc(100% - 96px);
    padding: 5px 10px;
  }

  .date {
    .start-date, .end-date {
      display: inline-block;
      width: 106px;
    }
    .separate {
      margin: 0 10px;
    }
    input {
      width: 100%;
      min-width: unset;
      text-align: center;
    }
  }
  
  .booking-price {
    margin-top: 30px;
    position: relative;

    .container {
      background: #EDEDED;
      color: #6D7278;
      font-size: 12px;  
      padding: 15px 42px;
      font-weight: 600;

      .normal, .holiday {
        display: flex;
        justify-content: space-between;
      }

      .normal {
        margin-bottom: 10px;
      }
    }
    
    .total-price {
      padding: 10px 42px;
      text-align: right;
      font-size: 26px;
      color: #FF5C5C;
      font-weight: 600;

      span {
        &:first-child {
          margin-right: 25px;
        }
      }
    }
  }
}

::v-deep .buttons-block {
  display: flex;
  justify-content: space-between;

  .cancel {
    width: 78px;
    height: 37px;
    background: #D8D8D8;
    color: #6D7278;
  }

  .confirm {
    width: 107px;
    height: 37px;
    background: #484848;
    color: #ffffff;
  }
}
</style>
