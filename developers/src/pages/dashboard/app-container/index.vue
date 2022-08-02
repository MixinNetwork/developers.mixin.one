<template>
  <div v-loading="loadingApp" class="dashboard-center-and-nav">
    <div v-if="showWelcome" class="welcome">
      <img src="@/assets/img/svg/robot.svg" alt="robot-icon"/>
      <h1>{{ t('dashboard.welcome') }}</h1>
      <p>{{ t('dashboard.welcome_d') }}</p>
      <button @click="useClickNewApp" class="primary">{{ t('dashboard.create_btn') }}</button>
    </div>
    <div v-else>
      <d-header class="app-header">
        <template #left>
          <div class="header-back" @click="backward">
            <img src="@/assets/img/app-svg/left.svg" alt="backward-icon"/>
          </div>
        </template>
        <template #center>
          <div>{{ appInfo.name || t('dashboard.new_app') }}</div>
        </template>
      </d-header>
      <header>
        <div class="header-list">
          <template v-if="isNewApp">
            <span class="header-item new-item">{{ t('dashboard.new_app') }}</span>
          </template>
          <template v-else>
            <span
              v-for="(item, index) in navList"
              :key="index"
              :class="['header-item', (currentNavIndex === index ? 'header-item-active': '')]"
              @click="useClickNav(index)"
            >{{ t(item + '.title') }}</span>
          </template>
        </div>
      </header>
      <div class="dashboard-main">
        <keep-alive>
          <suspense>
            <component
              :is="currentNav"
              :appId="appId"
              @add-new-app="useNewAppSubmitted"
              @loading="useModifyLoading"
            ></component>
          </suspense>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
