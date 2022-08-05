<template>
  <div>
    <d-header class="app-header">
      <template #left>
        <div class="header-back" @click="backward">
          <img src="@/assets/img/app-svg/left.svg" alt="backward-icon"/>
        </div>
      </template>
      <template #center>
        <div>{{ name }}</div>
      </template>
    </d-header>
    <header>
      <div class="header-list">
        <template>
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
            @loading="useModifyLoading"
            @set-app-name="useSetAppName"
          ></component>
        </suspense>
      </keep-alive>
    </div>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
