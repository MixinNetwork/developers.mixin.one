<template>
  <div v-show="show" class="modal">
    <div class="mask">
      <transition name="fade-up">
        <div v-if="show" class="main" v-loading="loading">
          <t-header class="header">
            <div
              style="width:50px;transform:translate(-25px);padding-left:25px"
              @click="back"
              slot="left"
            >
              <img
                style="height:24px;width:24px;transform:translate(0,5px)"
                src="@/assets/img/app-svg/left.svg"
              />
            </div>
            <div slot="center">{{$t('wallet.title')}}</div>
          </t-header>
          <div class="content">
            <header :style="{opacity: active_asset.icon_url ? '1':'0'}">
              <img :src="active_asset.icon_url" />
              <p>{{active_asset.balance}} {{active_asset.symbol}}</p>
            </header>
            <section>
              <div class="first-row">
                <auto-input v-model="submit_form.amount" :label="$t('wallet.amount')"></auto-input>
                <div>
                  <label>PIN</label>
                  <input ref="pin_token" @input="change_style" />
                </div>
              </div>
              <auto-input class="mixin-id" v-model="submit_form.opponent_id" label="Mixin ID"></auto-input>
            </section>
            <footer>
              <div class="btns">
                <button @click="click_submit" class="btns-copy primary">{{$t('button.withdraw')}}</button>
                <button @click="click_cancel" class="btns-cancel primary">{{$t('button.cancel')}}</button>
              </div>
            </footer>
            <img @click="click_cancel" class="iconguanbi" src="@/assets/img/svg/close.svg" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import tools from "@/assets/js/tools";
import AutoInput from "@/components/auto-input";
import TModal from "@/components/t-modal";
import THeader from "@/components/header";

export default {
  name: "withdrawal-modal",
  components: { AutoInput, TModal, THeader },
  props: ["active_asset", "app_id", "show"],
  data() {
    return {
      submit_form: {
        amount: "",
        pin: "",
        opponent_id: ""
      },
      sid: "",
      uid: "",
      remember_token_status: false,
      loading: false,
      tmp_pin: ""
    };
  },
  watch: {
    app_id(val) {
      this.sid = _get_sid_from_storge(val);
      this.uid = val;
    }
  },
  methods: {
    back() {
      this.$emit("close-modal");
    },
    click_remember_token() {
      this.remember_token_status = !this.remember_token_status;
    },
    async click_submit() {
      this.loading = true;
      let transfer_status = await submit_withdrawal.call(this);
      this.loading = false;
      if (transfer_status) {
        this.$message.success({
          message: this.$t("message.success.withdraw"),
          showClose: true
        });
        this.tmp_pin = "";
        this.$emit("close-modal");
        this.$emit("update-list");
        this.submit_form = {};
      }
    },
    click_cancel() {
      this.tmp_pin = "";
      this.$emit("close-modal");
    },
    change_style() {
      let originVal = this.$refs.pin_token.value;
      if (
        this.tmp_pin === undefined ||
        this.tmp_pin.length > originVal.length
      ) {
        this.tmp_pin = "";
      } else {
        let val = originVal.replace(/\D/g, "");
        this.tmp_pin += val;
      }
      let valLength = this.tmp_pin.length;
      let _pin = "";
      for (let i = 0; i < valLength; i++) {
        _pin += "*";
      }
      this.$refs.pin_token.value = _pin;
    }
  },
  mounted() {
    this.uid = this.app_id;
  }
};

async function submit_withdrawal() {
  let _client_info_str = window.localStorage.getItem(this.uid);
  let _client_info_str_obj = JSON.parse(_client_info_str);
  return await _send_withdrawal_request.call(
    this,
    _client_info_str_obj,
    this.uid
  );
}

async function _send_withdrawal_request(_client_info_str_obj, uid) {
  let { privateKey, sid } = _client_info_str_obj;
  let parmas = await _build_withdrawal_parmas.call(this, _client_info_str_obj),
    token = _get_token({ sid, uid, privateKey }, "post", "/transfers", parmas);
  let res = await this.apis.transfers(parmas, token);
  return res && res.type === "transfer";
}

async function _build_withdrawal_parmas(_client_info_str_obj) {
  let { amount } = this.submit_form;
  let { pinToken, privateKey, sid } = _client_info_str_obj;
  let pin = this.tmp_pin;
  let parmas = {
    amount,
    asset_id: this.active_asset.asset_id,
    opponent_id: await _get_opponent_id.call(
      this,
      this.submit_form,
      _client_info_str_obj,
      this.uid
    ),
    pin: tools.signPin(pin, pinToken, sid, privateKey),
    trace_id: tools.getUUID()
  };
  return parmas;
}

async function _get_opponent_id({ opponent_id }, { sid, privateKey }, uid) {
  let url = "/search/" + opponent_id;
  if (!sid) sid = _get_sid_from_storge(uid);
  let token = _get_token({ sid, uid, privateKey }, "get", url);
  let { user_id } = await this.apis.search(opponent_id, token);
  return user_id;
}

function _get_token({ sid, uid, privateKey }, method, url, body) {
  return tools.getJwtToken({ sid, uid, privateKey }, method, url, body);
}

function _get_sid_from_storge(appid) {
  let a = JSON.parse(window.localStorage.getItem(appid));
  return a && a._sid;
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  bottom: 0;
  user-select: none;
}

.mask {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.34);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
}

.main {
  border-radius: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  overflow: auto;
  height: 550px;
}

.content {
  padding: 50px;
}

.header {
  display: none;
}

.iconguanbi {
  position: absolute;
  top: 25px;
  right: 25px;
  color: #b8bdc7;
  cursor: pointer;
  padding: 5px;
}

header {
  text-align: center;

  img {
    width: 72px;
    height: 72px;
    margin-bottom: 16px;
  }

  p {
    margin-bottom: 30px;
    color: #a9b0bf;
    user-select: text;
  }
}

.first-row {
  & > div:last-child {
    margin-bottom: 16px;
    display: flex;

    label {
      width: 90px;
      text-align: left;
      line-height: 60px;
      margin-right: 20px;
    }

    input {
      outline: none;
      width: 492px;
      background: #f6f9ff;
      padding-left: 10px;
      border: 0;
      border-radius: 4px;
    }
  }
}

.btns {
  margin-top: 64px;

  button {
    font-size: 14px;
    width: 140px;
    float: right;
    margin-left: 10px;
  }

  .btns-cancel {
    background: #e5e7ec;
    color: #333;

    &:hover {
      opacity: 0.8;
    }
  }
}

.content /deep/ section {
  label {
    text-align: left;
    font-weight: 700;
  }

  input {
    font-size: 16px;
    box-shadow: none;
  }
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: margin 0.3s, opacity 0.3s;
}

.fade-up-enter {
  margin-top: -20px;
  opacity: 0;
}

@media screen and (max-width: 48rem) {
  .main {
    top: 0;
    left: 0;
    transform: initial;
    background-color: #f6f7f9;
    border-radius: 0;
    height: 100%;
    width: 100%;
  }

  .header {
    display: block;
  }

  .content {
    padding: 1.25rem;

    header p {
      color: #000;
      margin-bottom: 1rem;
    }
  }

  .content /deep/ section {
    .mixin-id,
    .first-row > div {
      flex-direction: column;

      label {
        height: 1rem;
        line-height: 1rem;
        margin-bottom: 1rem;
      }

      input {
        width: 100%;
        background-color: #fff;
        box-shadow: 0 1px 4px 0 rgba(28, 77, 174, 0.1);
        height: 3.125rem;
        padding: 0 1.25rem;
        font-weight: 500;
        font-size: 1rem;
      }
    }
  }

  .btns {
    margin-top: 0;

    .btns-copy {
      display: block;
      float: none;
      margin: 0 auto;
      width: 7.875rem;
      height: 2.625rem;
      border-radius: 2.5rem;
      background: #3277ff;
      font-size: 1rem;
    }
  }

  .btns-cancel {
    display: none;
  }

  .fade-up-enter-active,
  .fade-up-leave-active {
    transition: none;
  }
}
</style>
