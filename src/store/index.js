import Vue from "vue";
import Vuex from "vuex";
import api from "@/api/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: [],
    singleRoom: {
      room: [],
      booking: [],
    },
    pageLoadingConfig: {
      isLoading: false,
      fullPage: false,
    },
    initUtilites: [
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
    initBookingForm: {
      name: "",
      phone: "",
      date: {
        now: new Date(),
        start: null,
        end: null,
      },
    },
    updatedBookingForm: {},
    errorMessage: "",
    successMessage: "",
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
    UPDATE_BOOKING_FORM(state, form) {
      state.updatedBookingForm = {
        ...form,
        date: {
          ...state.updatedBookingForm.date,
          ...form.date,
        },
      };
    },
    RESET_BOOKING_FORM(state, resetData) {
      state.updatedBookingForm = {
        ...resetData,
      };
    },
    UPADTE_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
    UPADTE_SUCCESS_MESSAGE(state, message) {
      state.successMessage = message;
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
    async sendUserBooking({ commit }, form) {
      try {
        await api.post(`/room/${form.id}`, {
          ...form,
        });
        commit("UPADTE_SUCCESS_MESSAGE", "成功");
      } catch (error) {
        console.log("error", error);
        commit("UPADTE_ERROR_MESSAGE", error);
      }
    },
    async deleteBooking() {
      await api.delete("/rooms");
    },
  },
  getters: {
    rooms: (state) => state.rooms,
    pageLoadingConfig: (state) => state.pageLoadingConfig,
    room: (state) => {
      return state.singleRoom.room.length && state.singleRoom.room[0];
    },
    singeRoomLightboxPhotos: (state) => {
      if (!state.singleRoom.room[0]) return [];
      return state.singleRoom.room[0].imageUrl;
    },
    singeRoomCarouselPhotos: (state) => {
      return (
        state.singleRoom.room[0] &&
        state.singleRoom.room[0].imageUrl.map((imageUrl) => ({ imageUrl }))
      );
    },
    utilites: (state) => {
      if (!state.singleRoom.room.length) return;

      const { amenities } = state.singleRoom.room[0];
      const transferKeys = {
        wifi: "Wi-Fi",
        sofa: "Sofa",
        breakfast: "Breakfast",
        bar: "Mini-Bar",
        room_service: "Room-Service",
        phone: "Television",
        breeze: "Air-Conditioner",
        refrigerator: "Refrigerator",
        "mountain-range": "Great-View",
        dog: "Pet-Friendly",
        "no-smoke-symbol": "Smoke-Free",
        "crawling-baby-silhouette": "Child-Friendly",
      };

      return state.initUtilites.map((utility) => {
        const iconName = utility.iconName;
        const key = transferKeys[iconName];

        return {
          ...utility,
          enabled: amenities[key],
        };
      });
    },
    updatedBookingForm: (state) => {
      return {
        ...state.initBookingForm,
        ...state.updatedBookingForm,
        date: {
          ...state.initBookingForm.date,
          ...state.updatedBookingForm.date,
        },
      };
    },
    bookedDates: (state) => {
      return state.singleRoom.booking.map((date) => {
        return {
          dates: new Date(date.date),
          highlight: {
            contentStyle: {
              color: "#000000",
            },
          },
        };
      });
    },
    errorMessage: (state) => state.errorMessage,
    successMessage: (state) => state.successMessage,
  },
  modules: {},
});
