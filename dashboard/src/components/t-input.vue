<template>
  <div>
    <label>{{label}}</label>
    <textarea
      v-if="['应用 ID', 'App ID'].includes(label)"
      :value="value"
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
      :placeholder="placeholder[label] || ''"
      :value="value"
      @input="change($event)"
    />
    <img
      v-if="['Mixin ID', '应用 ID', 'App ID'].includes(label)"
      v-clipboard:copy="value"
      　　v-clipboard:success="click_copy_succuess"
      　　v-clipboard:error="click_copy_error"
      src="../assets/img/ic_copy.png"
    />
  </div>
</template>

<script>
export default {
  name: "t-input",
  props: ["value", "label", "disabled", "width"],
  data() {
    window.localStorage;
    return {
      placeholder: {
        Name: this.$t("information.name_desc"),
        "Home URL": this.$t("information.home_url_desc"),
        "OAuth URL": this.$t("information.oauth_url_desc"),
        description: "A short description of your app",
        名称: this.$t("information.name_desc"),
        首页网址: this.$t("information.home_url_desc"),
        验证网址: this.$t("information.oauth_url_desc")
      }
    };
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
  font-size: 16px;
  position: relative;
}

label {
  font-weight: 700;
  display: block;
  line-height: 16px;
  margin-bottom: 16px;
}

textarea,
input {
  outline: none;
  width: 100%;
  height: 64px;
  background: #fff;
  font-size: 1rem;
  padding: 0 20px;
  border: 0;
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
  padding: 5px;
  position: absolute;
  right: 10px;
  top: 64px;
  transform: translateY(-50%);
  border-radius: 0;
}

textarea {
  line-height: 64px;
}

@media screen and (max-width: 48rem) {
  input,
  textarea {
    font-weight: 500;
    height: 50px;
  }
  textarea {
    line-height: 50px;
  }
  img {
    top: 55px;
  }
}

@media screen and (max-width: 423px) {
  textarea {
    line-height: 18px;
    padding: 7px 46px 7px 20px;
  }
}
</style>