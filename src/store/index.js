import Vue from "vue";
import Vuex from "vuex";
import api from "@/api/index.js";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: []
  },
  mutations: {
    ROOMS(state, rooms) {
      state.rooms = rooms;
    }
  },
  actions: {
    async fetchRooms({ commit }) {
      const { data } = await api.get("/rooms");
      commit("ROOMS", data.items);
    }
  },
  getters: {
    rooms: state => state.rooms
  },
  modules: {},
});
