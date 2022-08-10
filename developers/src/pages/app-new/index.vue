<template>
  <div>
    <d-header class="app-header">
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
      <div class="header-list">
        <span class="header-item new-item">{{ t('dashboard.new_app') }}</span>
      </div>
    </header>
    <div class="dashboard-main">
      <app-information />
    </div>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
