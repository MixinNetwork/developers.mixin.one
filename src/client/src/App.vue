<template>
  <div id="app">
    <transition :name="transition_name">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    transition_name() {
      return this.$store.state.transition_name;
    }
  },
  mounted() {
    window._vm = this;
  }
};
</script>

<style lang="scss">
html,
body,
#app,
.development-dashboard,
.dashboard-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

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
