<template>
  <div>
    <component :is="layout" />
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const layout = computed(() => `${route.meta.type}-layout`)
</script>

<style lang="scss">
@use "@/assets/scss/theme.scss" as *;

.views {
  position: absolute;
  width: 100%;
  transition: transform 0.8s ease, opacity 0.8s ease;
  top: 0;
}
.slide-left-enter-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-left-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.slide-left-enter {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-right-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.slide-right-enter {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
