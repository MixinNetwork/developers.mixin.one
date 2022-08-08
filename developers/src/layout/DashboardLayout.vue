<template>
  <div v-loading="loadingAll" :class="['development-dashboard', t('language')]">
    <div class="dashboard-container">
      <SideBar
        :app-list="appList"
        :user-info="userInfo"
        @set-global-loading="useSetLoading"
        @click-new-app="useClickNewApp"
        @set-current-app="useSetCurrentApp"
      />

      <div v-loading="loading" class="dashboard-center-and-nav">
          <suspense>
            <router-view
              :appId="currentApp"
              :appList="appList"
              @set-local-loading="useSetLocalLoading"
              @click-new-app="useClickNewApp"
              @add-new-app="useUpdateAppList"
            ></router-view>
          </suspense>
      </div>
    </div>
  </div>

  <d-modal :show="showBuyModal">
    <div class="edit-modal">
      <img
        @click="useCloseBuyApp"
        src="@/assets/img/app-svg/close.svg"
        alt="close-modal-btn"
      />
      <h3 class="edit-modal-title">{{ t('dashboard.buy.title') }}</h3>
      <span>{{ t('dashboard.buy.desc1') }}</span>
      <p>{{ t('dashboard.buy.desc2') }}</p>
      <button
        @click="useClickBuyApp(1)"
        class="btns-save primary"
      >{{ t('dashboard.buy.btn', {count: 1}) }}
      </button>
      <button
        @click="useClickBuyApp(2)"
        class="btns-save primary"
      >{{ t('dashboard.buy.btns', {count: 2}) }}
      </button>
      <button
        @click="useClickBuyApp(5)"
        class="btns-save primary"
      >{{ t('dashboard.buy.btns', {count: 5}) }}
      </button>
    </div>
  </d-modal>
</template>

<script setup>
import { v4 as uuid } from 'uuid';
import {
  inject,
  onMounted,
  reactive,
  toRefs,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import DModal from '@/components/DModal';
import SideBar from '@/components/SideBar';
import {
  useAppList,
  useAppProperty,
  useClient,
  useUserInfo,
} from '@/api';

const $message = inject('$message');
const { t } = useI18n();

const state = reactive({
  loadingAll: false,
  loading: false,
  appList: [],
  userInfo: {},
  appProperty: {},
  showBuyModal: false,
  currentApp: '',
});

const route = useRoute();
const router = useRouter();
const useTo = (uri) => {
  if (uri === route.path) return;
  router.push({ path: uri });
};

const useClickNewApp = () => {
  const hasCredit = state.appList.length < state.appProperty.count;
  if (hasCredit) {
    useTo('/apps/new');
  } else {
    state.showBuyModal = true;
  }
};
const useSetCurrentApp = (app) => {
  state.currentApp = app;
};
const useSetLoading = (status) => {
  state.loadingAll = status;
};
const useSetLocalLoading = (status) => {
  state.loading = status;
};
const useClickBuyApp = async (count) => {
  state.loadingAll = true;
  const client = useClient($message, t);
  const { price } = await useAppProperty(client);
  state.loadingAll = true;

  const trace = uuid();
  const amount = Number(price) * count;
  // eslint-disable-next-line max-len
  window.location.href = `https://mixin.one/pay?recipient=fbd26bc6-3d04-4964-a7fe-a540432b16e2&asset=c94ac88f-4671-3976-b60a-09064f1811e8&amount=${amount}&trace=${trace}&memo=PAY_FOR_APP`;
};
const useCloseBuyApp = () => {
  state.showBuyModal = false;
};

const client = useClient($message, t);
const useFetchAll = async () => {
  state.loadingAll = true;
  state.appList = await useAppList(client);
  state.userInfo = await useUserInfo(client);
  state.loadingAll = false;
  state.appProperty = await useAppProperty(client);
};
const useUpdateAppList = async () => {
  state.loading = true;
  state.userInfo = await useUserInfo(client);
  state.loading = false;
};

onMounted(async () => {
  await useFetchAll();
});

const {
  loadingAll,
  loading,
  showBuyModal,
  appList,
  userInfo,
  currentApp,
} = toRefs(state);
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

.edit-modal {
  padding: 2.5rem 1.25rem 4.75rem 1.25rem;
  min-width: 37.5rem;
  text-align: center;

  img {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.3125rem;
    box-sizing: initial;
    width: 0.875rem;
    height: 0.875rem;
  }

  h3 {
    font-size: 1rem;
    font-weight: 900;
    margin-bottom: 1.875rem;
  }

  span {
    color: #333333;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  p {
    margin: 0.625rem 0 1.125rem 0;
    background-color: #f6f9ff;
    padding: 0.625rem;
    font-size: 0.875rem;
  }

  button {
    margin-top: 0.75rem;
    margin-right: 1.25rem;
    width: 8.75rem;
    font-size: 1rem;
    height: 2.5rem;

    &:last-child {
      margin-right: 0;
    }
  }
}

@media screen and (max-width: 48rem) {
  .edit-modal {
    padding: 2.5rem 1.25rem;
    min-width: 18.75rem;
    max-width: 18.75rem;

    button {
      margin-right: 0;
    }
  }
}
</style>
