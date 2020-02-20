<template>
  <div v-show="show" class="app-modal">
    <div class="modal-mask">
      <transition name="fade-up">
        <div v-if="show" class="modal-main" v-loading="loading">
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.app-modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  bottom: 0;
  user-select: none;
}
.modal-mask {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.34);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
}
.modal-main {
  border-radius: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  overflow: auto;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: margin 0.3s, opacity 0.3s;
}
.fade-up-enter {
  margin-top: -20px;
  opacity: 0;
}
.fade-up-leave-to {
  margin-top: 20px;
  opacity: 0;
}
</style>