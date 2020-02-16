<template>
  <div v-loading="loading" class="dash-app-wallet-component-withdrawal dashboard-app">
    <m-header>
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
    </m-header>
    <m-content>
      <div class="withdrawal-icon-and-balance">
        <img :src="active_asset.icon_url" />
        <div>{{active_asset.balance}} {{active_asset.symbol}}</div>
      </div>
      <div class="withdrawal-edit-main">
        <div class="app-info-item">
          <div>{{$t('wallet.amount')}}</div>
          <div>
            <input v-model="submit_form.amount" />
          </div>
        </div>
        <div class="app-info-item">
          <div>PIN</div>
          <div>
            <input ref="pin_token" @input="change_style" />
          </div>
        </div>
        <div class="app-info-item">
          <div>Mixin ID</div>
          <div>
            <input
              :placeholder="$t('wallet.mixin_id_placeholder')"
              v-model="submit_form.opponent_id"
            />
          </div>
        </div>
        <span
          @click="click_submit"
          class="withdrawal-edit-main-save-button"
        >{{$t('button.withdraw')}}</span>
      </div>
    </m-content>
  </div>
</template>

<script>
import MHeader from "../../header";
import MContent from "../../content";
import tools from "@/assets/js/tools";

export default {
  name: "withdrawal",
  components: { MHeader, MContent },
  data() {
    return {
      submit_form: {
        amount: "",
        opponent_id: ""
      },
      loading: false,
      tmp_pin: ""
    };
  },
  computed: {
    active_asset() {
      return this.$store.state.active_asset;
    },
    uid() {
      return this.$store.state.active_app.app_id;
    },
    asset_id() {
      return this.active_asset.asset_id;
    }
  },
  methods: {
    back() {
      this.$emit("change_withdrawal");
    },
    async click_submit() {
      if (!check_form_data.call(this)) return;
      if (this.loading) return;
      this.loading = true;
      let transfer_status = await _send_withdrawal_request.call(this, this.uid);
      this.loading = false;
      if (transfer_status) {
        this.$message.success({ message: this.$t("message.success.withdraw"), showClose: true });
        this.active_asset.balance -= this.submit_form.amount;
        this.submit_form = {};
        this.$store.dispatch("init_app", true);
        this.back()
      }
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
  }
};
let _tmp_secret = {};

async function _send_withdrawal_request(uid) {
  _tmp_secret = JSON.parse(window.localStorage.getItem(uid));
  let { privateKey, sid } = _tmp_secret;
  let parmas = await _build_withdrawal_parmas.call(this),
    token = tools.getJwtToken(
      { sid, uid, privateKey },
      "post",
      "/transfers",
      parmas
    );
  let res = await this.apis.transfers(parmas, token);
  return res && res.type === "transfer";
}

async function _build_withdrawal_parmas() {
  let { amount } = this.submit_form;
  let pin = this.tmp_pin;
  let { pinToken, privateKey, sid } = _tmp_secret;
  let parmas = {
    amount,
    asset_id: this.asset_id,
    opponent_id: await _get_opponent_id.call(this),
    pin: tools.signPin(pin, pinToken, sid, privateKey),
    trace_id: tools.getUUID()
  };
  return parmas;
}

async function _get_opponent_id() {
  let { privateKey, sid } = _tmp_secret;
  let { opponent_id } = this.submit_form;
  let token = tools.getJwtToken(
    { sid, uid: this.uid, privateKey },
    "get",
    "/search/" + opponent_id
  );
  let { user_id } = await this.apis.search(opponent_id, token);
  return user_id;
}

function check_form_data() {
  let { amount, opponent_id } = this.submit_form;
  let pin = this.tmp_pin;
  if (!amount || amount < 0) {
    this.$message.error({ message: this.$t("message.errors.amount"), showClose: true });
    return false;
  }
  if (!pin || pin.length !== 6) {
    this.$message.error({ message: this.$t("message.errors.pin"), showClose: true });
    return false;
  }
  if (!opponent_id) {
    this.$message.error({ message: this.$t("message.errors.mixin_id"), showClose: true });
    return false;
  }
  return true;
}
</script>

<style lang="scss" scoped>
.dash-app-wallet-component-withdrawal {
  background: #fff;
  font-weight: 500;
  z-index: 1001;
}
.withdrawal-icon-and-balance {
  text-align: center;
  margin: 20px 0 16px 0;
  font-size: 15px;

  img {
    height: 72px;
    width: 72px;
    margin-bottom: 16px;
  }
}

.withdrawal-edit-main {
  padding: 0 20px;
  background-color: #f6f7f9;
  text-align: center;
}
.app-info-item {
  font-weight: 500;
  text-align: left;

  & > div {
    margin-bottom: 16px;

    input {
      width: 100%;
      outline: none;
      border: 0;
      box-shadow: 0px 1px 4px 0px rgba(28, 77, 174, 0.1);
      border-radius: 6px;
      height: 50px;
      padding: 0 20px;
      font-weight: 500;
      font-size: 16px;
    }

    textarea {
      width: 100%;
      font-weight: 500;
      font-size: 16px;
    }
  }

  .immersive_icon {
    border-radius: 0;
    width: 12px;
    height: 12px;
    transform: translateY(1px);
  }

  i {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 2px solid #000000;
    box-sizing: border-box;
    border-radius: 4px;
    transform: translateY(1px);
  }

  span {
    padding-left: 8px;
  }

  &:last-child {
    margin-bottom: 16px;
  }
}
.withdrawal-edit-main-save-button {
  display: inline-block;
  width: 126px;
  height: 42px;
  border-radius: 40px;
  background: #3277ff;
  color: #fff;
  text-align: center;
  line-height: 42px;
  margin: 6px auto 20px auto;
  box-shadow: 0px 4px 10px 0 rgba($color: #3277ff, $alpha: 0.18);
}
</style>
