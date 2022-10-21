<template>
  <div v-loading="globalLoading" :class="['development-dashboard', t('language')]">
    <div class="dashboard-container">
      <SideBar />

      <div v-loading="localLoading" class="dashboard-center-and-nav">
        <suspense>
          <router-view></router-view>
        </suspense>
      </div>
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
  cursor: default;
  font-family: Helvetica, sans-serif;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;

  .dashboard-container {
    display: flex;
    width: 100%;
    height: 100%;

    .dashboard-center-and-nav {
      width: 100%;
      height: 100%;
      flex: 1;
      background-color: #f6f7f9;
      overflow: hidden;
      position: relative;

      & > div {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
