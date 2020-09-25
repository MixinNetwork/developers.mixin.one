<template>
  <div v-if="confirm_modal" class="modal-mask">
    <div class="confirm-content">
      <img @click="click_cancel" src="@/assets/img/svg/close.svg" />
      <h3>{{confirm_content}}</h3>
      <div class="btns">
        <button @click="click_cancel">{{$t('button.cancel')}}</button>
        <button @click="click_confirm">{{$t('button.ok')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    confirm_content: {
      type: String,
      default: ""
    },
    confirm_modal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click_confirm() {
      this.$emit("confirm");
      this.$emit("close_modal");
    },
    click_cancel() {
      this.$emit("close_modal");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.34);
  z-index: 1000;
}

.confirm-content {
  padding: 3.125rem 0;
  width: 26.125rem;
  height: 12.25rem;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
}

h3 {
  font-size: 1rem;
  text-align: center;
}

img {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}

.btns {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
button {
  width: 8.625rem;
  height: 2.375rem;
  border-radius: 3px;
  &:first-child {
    background-color: #e5e7ec;
    color: #333;
    font-size: 1rem;
    margin-right: 0.625rem;
  }
  &:last-child {
    color: #fff;
    background-color: #3277ff;
  }
}

@media screen and (max-width: 48rem) {
  .confirm-content {
    padding: 0;
    width: 16.875rem;
    height: 7.3125rem;
    border-radius: 0.75rem;
    overflow: hidden;
  }
  img {
    display: none;
  }

  h3 {
    line-height: 72.5px;
    font-size: 17px;
    font-weight: 500;
    text-align: center;
    border-bottom: 1px solid #cbcbcb;
  }
  .btns {
    margin: 0;
  }

  button {
    flex: 1;
    text-align: center;
    line-height: 2.6rem;
    background-color: #fff;
    height: 100%;
    font-size: 1rem;
    border-radius: initial;

    &:first-child {
      color: #3478f6;
      background-color: #fff;
      border-right: 1px solid #cbcbcb;
      margin: 0;
    }
    &:last-child {
      color: #3478f6;
      background-color: #fff;
    }
  }
}
</style>