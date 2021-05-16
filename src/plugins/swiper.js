// 只有引入 swiper core code，其餘功能(module)要額外 import
// import Swiper JS Core code
import Swiper from "swiper";

// 一種方式是僅僅引入需要的 module (按需引入)
// core version + Autoplay modules:
import SwiperCore, { Autoplay } from "swiper/core";
SwiperCore.use([Autoplay]);

// 另一種方式是將全部引入(core version + all modules)，擇一使用即可
// import Swiper bundle with all modules installed
// import Swiper from 'swiper/bundle';

// import Swiper styles
import "swiper/swiper-bundle.css";

export function initializeSwiper() {
  new Swiper(".swiper-container", {
    autoplay: {
      delay: 5000,
    },
    slidesPerView: 1,
    loop: true,
  });
}
