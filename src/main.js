import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// reset css
import "@/assets/scss/_reset.scss";

import "@/assets/icons/index.js";
import SvgIcon from "@/components/SvgIcon";
Vue.component("SvgIcon", SvgIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
