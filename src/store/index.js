import Vue from "vue";
import Vuex from "vuex";
import api from "@/api/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: [],
    pageLoadingConfig: {
      isLoading: false,
      fullPage: false,
    },
  },
  mutations: {
    ROOMS(state, rooms) {
      state.rooms = rooms;
    },
    UPDATE_PAGE_LOADING_CONFIG(state, config) {
      state.pageLoadingConfig = {
        ...state.pageLoadingConfig,
        ...config,
      };
    },
  },
  actions: {
    async fetchRooms({ commit }) {
      const { data } = await api.get("/rooms");
      commit("ROOMS", data.items);
    },
  },
  getters: {
    rooms: (state) => state.rooms,
    pageLoadingConfig: (state) => state.pageLoadingConfig,
  },
  modules: {},
});
