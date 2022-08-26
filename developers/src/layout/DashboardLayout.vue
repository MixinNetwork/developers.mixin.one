<template>
  <div v-loading="globalLoading" class="development-dashboard">
    <side-bar />

    <div v-loading="localLoading" class="dashboard-content">
      <suspense>
        <router-view></router-view>
      </suspense>
    </div>
  </div>

  <modals />
</template>

<script setup>
import { inject, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import Modals from '@/components/Modals';
import SideBar from '@/components/SideBar';
import { useLayoutStore, useLoadStore } from '@/stores';
import { useUserClient } from '@/api';

const $message = inject('$message');
const { t } = useI18n();

const { fetchAll } = useLayoutStore();
const loadStore = useLoadStore();
const { globalLoading, localLoading } = storeToRefs(loadStore);

const useFetchAll = async () => {
  const client = useUserClient($message, t);
  await fetchAll(client);
};

onMounted(async () => {
  await useFetchAll();
});
</script>

<style lang='scss' scoped>
.development-dashboard {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  cursor: default;

  .dashboard-content {
    flex: 1;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f6f7f9;
    overflow: auto;
  }
}
</style>
