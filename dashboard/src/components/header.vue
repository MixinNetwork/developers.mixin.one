<template>
  <div
    class="dashboard-app-header"
    :style="has_shadow? 'box-shadow: 0px 1px 4px 0px rgba(28, 77, 174, 0.1);':''"
  >
    <span class="app-header-left">
      <slot name="left"></slot>
    </span>
    <span class="app-header-center">
      <slot name="center"></slot>
    </span>
    <span class="app-header-right">
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "MHeader",
  props: {
    has_shadow: {
      type: Number,
      default: 0
    },
    has_back: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-app-header {
  background-color: #fff;
  color: #333;
  height: 44px;
  width: 100%;
  padding: 0 20px;
  position: relative;
  line-height: 44px;
  font-size: 20px;
  font-weight: 700;
  z-index: 999;
  .app-header-left {
    position: absolute;
    left: 20px;
    top: 0;
  }
  .app-header-center {
    position: absolute;
    left: 50%;
    top: 0;
    div {
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    font-size: 18px;
    transform: translate(-50%);
  }
  .app-header-right {
    position: absolute;
    right: 20px;
    top: 0;
  }
}
</style>