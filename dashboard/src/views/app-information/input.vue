<template>
  <div>
    <label>{{label}}</label>
    <textarea
      v-if="['应用 ID', 'App ID'].includes(label)"
      :value="value"
      disabled
      :class="[
            (width===''?'width':''),
            (disabled==='' ? 'disabled':'')
            ]"
    />
    <input
      v-else
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
      v-if="['Mixin ID', '应用 ID', 'App ID'].includes(label)"
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
  props: ["value", "label", "disabled", "width", "placeholder"],
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

<style scoped lang="scss">
div {
  font-size: 1rem;
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

textarea {
  line-height: 4rem;
}

@media screen and (max-width: 48rem) {
  input,
  textarea {
    font-weight: 500;
    height: 3.125rem;
  }
  textarea {
    line-height: 3.125rem;
  }
  img {
    top: 3rem;
  }
}

@media screen and (max-width: 25.875rem) {
  textarea {
    line-height: 1.125rem;
    padding: 0.4375rem 2.875rem 0.4375rem 1.25rem;
  }
}
</style>
