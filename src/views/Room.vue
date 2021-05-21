<template>
  <div class="each-room-container">
    <div class="room-photos">
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
            <p>15:00 — 21:00</p>
          </div>
        </div>
        <div class="utilites">
          utiles
          <SvgIcon iconName="wifi" />
        </div>
      </div>
      <div class="room-reservation"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.each-room-container {
  width: 100%;
  height: 600px;
}

.room-photos {
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);

  &::after {
    content: "";
    display: block;
    clear: both;
  }

  img {
    height: 100%;
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

.each-room-details {
  padding: 20px;

  @media (min-width: 768px) {
    padding: 40px;
  }

  .introduction {
    position: relative;
    outline: 1px solid #f00;
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
      svg {
        color: #00008b;
      }
    }
  }

  .room-reservation {
    width: 50%;
  }
}
</style>
