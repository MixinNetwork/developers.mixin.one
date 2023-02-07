<template>
  <div>
    <d-header class="app-header">
      <template #left>
        <div class="header-back" @click="backward">
          <img src="@/assets/img/app-svg/left.svg" alt="backward-icon"/>
        </div>
      </template>
      <template #center>
        <div class="header-title">{{ t('dashboard.new_app') }}</div>
      </template>
    </d-header>
    <header>
      <div class="header-list">
        <span class="header-item new-item">{{ t('dashboard.new_app') }}</span>
      </div>
    </header>
    <div class="dashboard-main">
      <app-form />
    </div>
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
.app-header {
  display: none;

  .header-title {
    max-width: 50vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

header {
  height: 3.75rem;
  background: rgba(255, 255, 255, 1);
  border-bottom: 0.0625rem solid #e1e7f5;
  color: #b8bdc7;

  .header-list {
    font-weight: 700;
    width: 62rem;
    max-width: 100%;
    margin: 0 auto;
    padding: 1.6rem 1rem 0;
    white-space: nowrap;

    .new-item {
      font-weight: 700;
      color: #1d69ff
    }

    .header-item {
      margin-right: 5rem;
      cursor: pointer;

      &.header-item-active {
        color: #1d69ff;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -0.75rem;
          left: 0;
          height: 0.1875rem;
          width: 1.875rem;
          background: #3277ff;
        }

      }
    }
  }
}

.dashboard-main {
  width: 100%;
  height: calc(100% - 3.75rem);
  overflow: auto;
}

@media screen and (max-width: 48rem) {
  .dashboard-main {
    height: calc(100% - 3rem);
  }

  .app-header {
    display: block;
  }

  header{
    display: none;
  }

  .header-back {
    width: 3.125rem;
    transform: translate(-1.5625rem);
    padding-left: 1.5625rem;

    img {
      height: 1.5rem;
      width: 1.5rem;
      transform: translate(0, 0.3125rem)
    }
  }

  .header-list {
    justify-content: space-between;

    .header-item {
      margin: 0;
    }
  }
}
</style>
