import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    axisPointer: null,
    queryTime: { start: null, end: null },
    startTime: null,
    endTime: null,
  },
  mutations: {
    setPointer(state, value) {
      state.axisPointer = value;
    },
    setStartTime(state, value) {
      state.startTime = value;
    },
    setEndTime(state, value) {
      state.endTime = value;
    },
  },
  actions: {
    setPointer({ commit }, value) {
      commit("setPointer", value);
    },
    setStartTime({ commit }, value) {
      commit("setStartTime", value);
    },
    setEndTime({ commit }, value) {
      commit("setEndTime", value);
    },
  },
  getters: {
    getPointer: (state) => {
      return state.axisPointer;
    },
    getStartDate: (state) => {
      return state.startTime;
    },
    getEndDate: (state) => {
      return state.endTime;
    },
  },
  modules: {},
});
