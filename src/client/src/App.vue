<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    mounted() {
        window._vm = this
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
</style>
