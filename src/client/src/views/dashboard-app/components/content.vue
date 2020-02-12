<template>
    <div class="dashboard-app-content" :style="background ? 'background:'+background: ''">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'MContent',
    props: {
        background: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss">
.dashboard-app-content {
    position: absolute;
    top: 44px;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #f6f7f9;
}
</style>