import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAppList, useAppProperty, useUserInfo } from '@/api';
import { useLoadStore } from './load';

export const useLayoutStore = defineStore('layout', () => {
  const appList = ref([]);
  const appProperty = ref({});
  const userInfo = ref({});

  const { modifyGlobalLoadingStatus } = useLoadStore();

  const fetchAppList = async (client) => {
    modifyGlobalLoadingStatus(true);
    appList.value = await useAppList(client);
    modifyGlobalLoadingStatus(false);
  };
  const fetchAppProperty = async (client) => {
    appProperty.value = await useAppProperty(client);
  };
  const fetchAll = async (client) => {
    modifyGlobalLoadingStatus(true);
    appList.value = await useAppList(client);
    userInfo.value = await useUserInfo(client);
    modifyGlobalLoadingStatus(false);
    appProperty.value = await useAppProperty(client);
  };

  return {
    appList,
    appProperty,
    userInfo,
    fetchAppList,
    fetchAppProperty,
    fetchAll,
  };
});
