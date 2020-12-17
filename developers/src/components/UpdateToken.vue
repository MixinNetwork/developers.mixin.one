<template>
  <d-modal :loading="loading" class="modal" :show="open_edit_modal">
    <div class="main">
      <h3>{{$t('wallet.update_token')}}</h3>
      <div class="edit-item">
        <label>Session ID</label>
        <input v-model="submit_form.session_id" />
      </div>
      <div class="edit-item">
        <label>Pin Token</label>
        <input v-model="submit_form.pin_token" />
      </div>
      <div class="edit-item">
        <label>Private Key</label>
        <textarea v-model="submit_form.private_key"></textarea>
      </div>
      <div class="btns">
        <button @click="click_submit" class="btns-save primary">{{$t('button.save')}}</button>
        <button @click="click_cancel" class="btns-cancel primary">{{$t('button.cancel')}}</button>
      </div>
      <img @click="click_cancel" class="iconguanbi" src="@/assets/img/svg/close.svg" />
    </div>
  </d-modal>
</template>

<script>
  import DModal from "./DModal"
  import validator from "validator"

  export default {
    components: { DModal },
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
          return {}
        }
      },
      active_app: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      click_submit() {
        if (!_check_date.call(this)) return
        _set_token_obj.call(this)
        this.$emit("close_modal")
        this.$emit("success")
      },
      click_cancel() {
        this.$emit("close_modal")
      }
    }
  }

  function _check_date() {
    const { session_id, pin_token,private_key } = this.submit_form
    if (!validator.isUUID(session_id, 4)) {
      this.$message.error({
        message: this.$t("message.errors.session_id_format"),
        showClose: true
      })
      return false
    }
    if (!validator.isBase64(pin_token) && Buffer.from(pin_token, 'base64').length !== 32) {
      this.$message.error({
        message: this.$t("message.errors.pin_token_format"),
        showClose: true
      })
      return false
    }
    return true
  }

  function _set_token_obj() {
    const {
      active_app: { app_id: uid },
      submit_form: { session_id: sid, pin_token: pinToken, private_key }
    } = this
    this.$ls.set(uid, { uid, sid, pinToken, privateKey: private_key.replace(/\\r\\n/g, "\r\n") })
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

  .main {
    padding: 3.125rem 2.5rem 2.5rem 2.5rem;
    overflow: hidden;
  }

  h3 {
    font-size: 1rem;
    margin: 0.625rem 0 2.5rem 0;
    text-align: center;
  }

  label {
    font-weight: 700;
    min-width: 5.625rem;
    margin-right: 20px;
  }

  .edit-item {
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;

    input {
      width: 100%;
      max-width: 492px;
      height: 60px;
      font-size: 1rem;
      background: #f6f9ff;
      padding: 0 10px;
      border-radius: 4px;
      box-shadow: 0px 1px 4px 0px rgba(28, 77, 174, 0.1);
    }

    textarea {
      font-size: 1rem;
      padding: 0.625rem;
      width: 30.75rem;
      height: 5.125rem;
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
    .modal {
      .iconguanbi {
        top: 1rem;
        right: 1rem;
      }

      .main {
        padding: 2.5rem 1.5625rem;
        width: 310px;

        h3 {
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

        .edit-item {
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
