<template>
  <div class="welcome">
    <img src="@/assets/img/svg/robot.svg" alt="robot-icon"/>
    <h1>{{ t('dashboard.welcome') }}</h1>
    <p>{{ t('dashboard.welcome_d') }}</p>
    <button @click="useClickNewApp" class="primary">{{ t('dashboard.create_btn') }}</button>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
