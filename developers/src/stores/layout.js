import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useLoadStore } from './load';

export const useLayoutStore = defineStore('layout', () => {
  const appList = ref([]);
  const appProperty = ref({});
  const userInfo = ref({});

  const { modifyGlobalLoadingStatus } = useLoadStore();

  const fetchAppList = async (client) => {
    modifyGlobalLoadingStatus(true);
    appList.value = await client.app.fetchList();
    modifyGlobalLoadingStatus(false);
  };
  const fetchAppProperty = async (client) => {
    appProperty.value = await client.app.properties();
  };
  const fetchAll = async (client) => {
    modifyGlobalLoadingStatus(true);
    [
      appList.value,
      userInfo.value,
      appProperty.value
    ] = await Promise.all([
      client.app.fetchList(),
      client.user.profile(),
      client.app.properties()
    ])
    modifyGlobalLoadingStatus(false);
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
