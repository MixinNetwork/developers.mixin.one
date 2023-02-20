import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useLoadStore } from './load';

export const useLayoutStore = defineStore('layout', () => {
  const chainList =ref({});
  const appList = ref([]);
  const appProperty = ref({});
  const userInfo = ref({});

  const { modifyGlobalLoadingStatus } = useLoadStore();

  const fetchChainList = async (client) => {
    const chains = await client.network.chains();
    return chains.reduce((prev, curr) => ({
      ...prev,
      [curr.chain_id]: curr,
    }), {});
  };
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
      chainList.value,
      appList.value,
      userInfo.value,
      appProperty.value
    ] = await Promise.all([
      fetchChainList(client),
      client.app.fetchList(),
      client.user.profile(),
      client.app.properties()
    ])
    modifyGlobalLoadingStatus(false);
  };

  return {
    chainList,
    appList,
    appProperty,
    userInfo,
    fetchAppList,
    fetchAppProperty,
    fetchAll,
  };
});
