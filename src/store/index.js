import Vue from "vue";
import Vuex from "vuex";
import api from "@/api/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: [],
    singleRoom: {
      room: [],
    },
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
    SINGLE_ROOM(state, room) {
      state.singleRoom = room;
    },
  },
  actions: {
    async fetchRooms({ commit }) {
      const { data } = await api.get("/rooms");
      commit("ROOMS", data.items);
    },
    async fetchSingleRoom({ commit }, { id }) {
      const { data } = await api.get(`/room/${id}`);
      commit("SINGLE_ROOM", data);
    },
  },
  getters: {
    rooms: (state) => state.rooms,
    pageLoadingConfig: (state) => state.pageLoadingConfig,
    room: (state) => {
      return (
        state.singleRoom.room.length &&
        state.singleRoom.room[0]
      )
    },
    singeRoomLightboxPhotos: (state) => {
      return state.singleRoom.room[0] && state.singleRoom.room[0].imageUrl;
    },
    singeRoomCarouselPhotos: (state) => {
      return (
        state.singleRoom.room[0] &&
        state.singleRoom.room[0].imageUrl.map((imageUrl) => ({ imageUrl }))
      );
    },
  },
  modules: {},
});
