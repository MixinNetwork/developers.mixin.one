<template>
  <div class="welcome">
    <img src="@/assets/img/svg/robot.svg" alt="robot-icon"/>
    <h1>{{ t('dashboard.welcome') }}</h1>
    <p>{{ t('dashboard.welcome_d') }}</p>
    <button @click="useClickNewApp" class="primary">{{ t('dashboard.create_btn') }}</button>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useBuyModalStore } from '@/stores';

export default {
  name: 'dashboard-container',
  async setup() {
    const { t } = useI18n();
    const { useCheckCredit } = useBuyModalStore();

    const useClickNewApp = async () => {
      useCheckCredit();
    };

    return {
      useClickNewApp,
      t,
    };
  },
};
</script>

<style lang='scss' scoped>
.welcome {
  position: absolute;
  width: 34.625rem;
  height: 18.375rem;
  top: 28.333%;
  bottom: 39%;
  z-index: 0;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  color: rgba(51, 51, 51, 1);

  img {
    border-radius: 0;
  }

  h1 {
    font-size: 2.75rem;
    line-height: 3.3125rem;
    margin: 2rem 0 0.8125rem 0;
    font-weight: 900;
  }

  p {
    font-size: 1.5rem;
    line-height: 1.875rem;
    font-weight: 400;
  }

  button {
    margin-top: 1.875rem;
    width: 8.75rem;
    height: 3.125rem;
  }
}

@media screen and (max-width: 48rem) {
  .welcome {
    display: none;
  }
}
</style>
