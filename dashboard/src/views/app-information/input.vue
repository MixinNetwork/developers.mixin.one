<template>
  <div>
    <label>{{label}}</label>
    <input
      :class="[
            (width===''?'width':''),
            (disabled==='' ? 'disabled':'')
            ]"
      :disabled="disabled===''"
      :placeholder="placeholder || ''"
      :value="value"
      @input="change($event)"
    />
    <img
      v-if="isCopied"
      v-clipboard:copy="value"
  　　v-clipboard:success="click_copy_succuess"
  　　v-clipboard:error="click_copy_error"
      src="@/assets/img/ic_copy.png"
    />
  </div>
</template>

<script>
export default {
  name: "t-input",
  props: ["value", "label", "disabled", "width", "placeholder", "isCopied"],
  data() {
    window.localStorage;
    return {}
  },
  methods: {
    change(event) {
      this.$emit("input", event.target.value);
    },
    click_copy_succuess() {
      this.$message.success({
        message: this.$t("message.success.copy"),
        showClose: true
      });
    },
    click_copy_error() {
      this.$message.error({
        message: this.$t("message.errors.copy"),
        showClose: true
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  div {
    position: relative;
  }

  label {
    font-weight: 700;
    display: block;
    line-height: 1rem;
    margin-bottom: 1rem;
  }

  textarea,
  input {
    width: 100%;
    height: 4rem;
    font-size: 1rem;
    padding: 0 1.25rem;
    border-radius: 4px;
    box-shadow: 0px 1px 4px 0px rgba(28, 77, 174, 0.1);
    &::-webkit-input-placeholder {
      color: #a9b0bf;
    }
    &::-moz-input-placeholder {
      color: #a9b0bf;
    }
    &::-ms-input-placeholder {
      color: #a9b0bf;
    }
  }
  .width {
    width: 100%;
  }
  .disabled {
    background: #eceef2;
    color: #a9b0bf;
    box-shadow: none;
  }
  img {
    cursor: pointer;
    position: absolute;
    right: 0.625rem;
    top: 3.5rem;
    border-radius: 0;
  }

  @media screen and (max-width: 48rem) {
    input {
      font-weight: 500;
      height: 3.125rem;
    }
    img {
      top: 3rem;
    }
  }
</style>
