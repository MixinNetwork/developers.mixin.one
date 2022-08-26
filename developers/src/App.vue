<template>
  <component :is="layout" />
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const layout = computed(() => `${route.meta.type}-layout`);
</script>

<style lang="scss">
@import "@/assets/scss/common.scss";
@import "@/assets/scss/theme.scss";
</style>
