<template>
  <div v-show="open_edit_modal" class="edit-information">
    <t-modal
      :loading="loading"
      class="--edit-modal"
      :show="open_edit_modal"
      :width="is_mobile ? 310 : 700"
      :height="is_mobile ? 478 : 512"
    >
      <div class="edit-main-modal">
        <h3 class="edit-main-modal-title">{{$t('wallet.update_token')}}</h3>
        <t-input v-model="submit_form.session_id" label="Session ID"></t-input>
        <t-input v-model="submit_form.pin_token" label="Pin Token"></t-input>
        <div class="edit-information-PK">
          <label>Private Key</label>
          <textarea v-model="submit_form.private_key"></textarea>
        </div>
        <div class="btns">
          <button @click="click_submit" class="btns-save primary">{{$t('button.save')}}</button>
          <button @click="click_cancel" class="btns-cancel primary">{{$t('button.cancel')}}</button>
        </div>
        <img @click="click_cancel" class="iconguanbi" src="@/assets/img/svg/close.svg" />
      </div>
    </t-modal>
  </div>
</template>

<script>
import TInput from "./auto-input";
import TModal from "./t-modal";
import validator from "validator";
export default {
  components: { TInput, TModal },
  props: {
    open_edit_modal: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    submit_form: {
      type: Object,
      default() {
        return {};
      }
    },
    active_app: {
      type: Object,
      default() {
        return {};
      }
    },
    is_mobile: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click_submit() {
      if (!_check_date.call(this)) return;
      _set_token_obj.call(this);
      this.$emit("close_modal");
      this.$emit("success");
    },
    click_cancel() {
      this.$emit("close_modal");
    }
  }
};

function _check_date() {
  if (!validator.isUUID(this.submit_form.session_id, 4)) {
    this.$message.error({
      message: this.$t("message.errors.session_id_format"),
      showClose: true
    });
    return false;
  }
  if (!validator.isBase64(this.submit_form.pin_token)) {
    this.$message.error({
      message: this.$t("message.errors.pin_token_format"),
      showClose: true
    });
    return false;
  }
  return true;
}

function _set_token_obj() {
  let get_token_obj = {
    sid: this.submit_form.session_id,
    pinToken: this.submit_form.pin_token,
    privateKey: this.submit_form.private_key.replace(/\\n/g, "\n")
  };
  window.localStorage.setItem(
    this.active_app.app_id,
    JSON.stringify(get_token_obj)
  );
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.34);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
}

.edit-main-modal {
  padding: 50px 40px 0 40px;
  overflow: hidden;
}

h3 {
  height: 1rem;
  font-size: 1rem;
  margin: 10px 0 40px 0;
  text-align: center;
}

label {
  font-weight: 700;
  min-width: 90px;
  margin-right: 20px;
}

.edit-information-PK {
  display: flex;
  align-items: center;

  label {
    transform: translate(0, 5px);
    margin-bottom: 1rem;
  }

  textarea {
    font-size: 16px;
    padding: 10px;
    width: 492px;
    height: 82px;
    background: #f6f9ff;
  }
}

.iconguanbi {
  position: absolute;
  top: 1.5625rem;
  right: 1.5625rem;
  color: #b8bdc7;
  cursor: pointer;
  padding: 0.3125rem;
}

.btns {
  margin-top: 4rem;

  button {
    font-size: 0.88rem;
    width: 8.75rem;
    height: 2.5rem;
    float: right;
    margin-left: 0.625rem;
  }

  .btns-cancel {
    background: #e5e7ec;
    color: #333;

    &:hover {
      opacity: 0.8;
    }
  }
}

@media screen and (max-width: 48rem) {
  .--edit-modal /deep/ .--modal-main {
    .iconguanbi {
      top: 1rem;
      right: 1rem;
    }

    .edit-main-modal {
      padding: 2.5rem 1.5625rem 0 1.5625rem;

      .edit-main-modal-title {
        margin: 0 0 2rem 0;
      }

      label {
        font-weight: 700;
        text-align: left;
        line-height: 1rem;
        margin-bottom: 1rem;
      }

      div {
        flex-direction: column;

        input {
          height: 3.125rem;
          width: 100%;
        }
      }

      .edit-information-PK {
        align-items: flex-start;

        textarea {
          width: 100%;
          height: 3.125rem;
        }
      }

      .btns {
        margin: 0;
      }

      .btns-save {
        display: block;
        float: none;
        margin: 1.75rem auto 0 auto;
      }

      .btns-cancel {
        display: none;
      }
    }
  }
}
</style>