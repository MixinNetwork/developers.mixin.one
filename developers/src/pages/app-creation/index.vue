<template>
  <d-header>
    <template #left>
      <div class="header-back" @click="backward">
        <img src="@/assets/img/app-svg/left.svg" alt="backward-icon"/>
      </div>
    </template>
    <template #center>
      <div>{{ t('dashboard.new_app') }}</div>
    </template>
  </d-header>
  <header>
    <span class="header-item new-item">{{ t('dashboard.new_app') }}</span>
  </header>
  <div class="dashboard-main">
    <app-form />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import DHeader from '@/components/DHeader';
import AppForm from '@/components/AppForm';

export default {
  name: 'app-creation',
  components: {
    DHeader,
    AppForm,
  },
  async setup() {
    const { t } = useI18n();

    const router = useRouter();
    const backward = () => {
      router.push({
        path: '/dashboard',
      });
    };

    return {
      backward,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  max-width: 100%;
  height: 3.75rem;
  padding: 1.6rem 1rem 0;
  background: rgba(255, 255, 255, 1);
  border-bottom: 0.0625rem solid #e1e7f5;
  color: #b8bdc7;
  font-weight: 700;

  .new-item {
    font-weight: 700;
    color: #1d69ff
  }
}

.dashboard-main {
  width: 100%;
  overflow: auto;
}

@media screen and (max-width: 48rem) {
  header{
    display: none;
  }
}
</style>
