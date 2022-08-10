import { createStore } from 'vuex';
import { useAppList, useAppProperty, useUserInfo } from '@/api';

const store = createStore({
  state: {
    appList: [],
    userInfo: [],
    appProperty: {},
    loadingAll: false,
    loading: false,
    showBuyModal: false,
    clickedNewApp: false,
  },
  mutations: {
    modifyGlobalLoading(state, status) {
      state.loadingAll = status;
    },
    modifyLocalLoading(state, status) {
      state.loading = status;
    },
    modifyBuyAppModalStatus(state, status) {
      state.showBuyModal = status;
    },
    modifyClickedNewApp(state, status) {
      state.clickedNewApp = status;
    },
    setAppList(state, appList) {
      state.appList = appList;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setAppProperty(state, appProperty) {
      state.appProperty = appProperty;
    },
  },
  actions: {
    async fetchAll({ commit }, client) {
      commit('modifyGlobalLoading', true);
      commit('setAppList', await useAppList(client));
      commit('setUserInfo', await useUserInfo(client));
      commit('setAppProperty', await useAppProperty(client));
      commit('modifyGlobalLoading', false);
    },
    async fetchAppProperty({ commit }, client) {
      commit('modifyGlobalLoading', true);
      commit('setAppProperty', await useAppProperty(client));
      commit('modifyGlobalLoading', false);
    },
    async fetchAppList({ commit }, client) {
      commit('modifyLocalLoading', true);
      commit('setAppList', await useAppList(client));
      commit('modifyLocalLoading', false);
    },
  },
});

export default store;
