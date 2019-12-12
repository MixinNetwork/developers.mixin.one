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
                        <input placeholder="0.0000" v-model="submit_form.amount" />
                    </div>
                </div>
                <div class="app-info-item">
                    <div>PIN</div>
                    <div>
                        <input placeholder="PIN" ref="pin_token" @input="change_style" />
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
import MHeader from '../../header';
import MContent from '../../content';
import tools from '@/assets/js/tools';

export default {
    name: 'withdrawal',
    components: { MHeader, MContent },
    data() {
        return {
            submit_form: {
                amount: '1',
                opponent_id: '30265'
            },
            loading: false,
            tmp_pin: ''
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
            _back.call(this);
        },
        async click_submit() {
            if (!check_form_data.call(this)) return;
            if (this.loading) return;
            this.loading = true;
            let transfer_status = await _send_withdrawal_request.call(
                this,
                this.uid
            );
            this.loading = false;
            if (transfer_status) {
                this.$message.success(this.$t('message.success.withdraw'));
                this.active_asset.balance -= this.submit_form.amount;
                this.submit_form = {};
                this.$store.dispatch('init_app', true);
                _back.call(this);
            }
        },
        change_style() {
            let originVal = this.$refs.pin_token.value;
            if (
                this.tmp_pin === undefined ||
                this.tmp_pin.length > originVal.length
            ) {
                this.tmp_pin = '';
            } else {
                let val = originVal.replace(/\D/g, '');
                this.tmp_pin += val;
            }
            let valLength = this.tmp_pin.length;
            let _pin = '';
            for (let i = 0; i < valLength; i++) {
                _pin += '*';
            }
            this.$refs.pin_token.value = _pin;
        }
    }
};
let _tmp_secret = {};

async function _send_withdrawal_request(uid) {
    _tmp_secret = JSON.parse(window.localStorage.getItem(uid));
    let { pinToken, privateKey, sid } = _tmp_secret;
    let parmas = await _build_withdrawal_parmas.call(this),
        method = 'post',
        url = '/transfers',
        token = tools.getJwtToken(
            { sid, uid, privateKey },
            method,
            url,
            parmas
        );
    let res = await this.$axios({
        method,
        url,
        data: parmas,
        headers: { Authorization: 'Bearer ' + token }
    });
    return res && res.type === 'transfer';
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
    let { pinToken, privateKey, sid } = _tmp_secret;
    let { opponent_id } = this.submit_form;
    let method = 'get',
        url = '/search/' + opponent_id,
        token = tools.getJwtToken(
            { sid, uid: this.uid, privateKey },
            method,
            url
        );
    let { user_id } = await this.$axios({
        method: 'get',
        url,
        headers: { Authorization: 'Bearer ' + token }
    });
    return user_id;
}

function check_form_data() {
    let { amount, opponent_id } = this.submit_form;
    let pin = this.tmp_pin;
    if (!amount || amount < 0) {
        this.$message.error(this.$t('message.errors.amount'));
        return false;
    }
    console.log('pin :', pin);
    if (!pin || pin.length !== 6) {
        this.$message.error(this.$t('message.errors.pin'));
        return false;
    }
    if (!opponent_id) {
        this.$message.error(this.$t('message.errors.mixin_id'));
        return false;
    }
    return true;
}

function _back() {
    this.$store.commit('change_state', {
        back_to_wallet: true,
        can_transition: true
    });
    this.$router.push('/apps/' + this.$route.params.app_number);
}
</script>

<style lang="scss">
.dash-app-wallet-component-withdrawal {
    background: #fff;
    font-weight: 500;
    z-index: 1001;
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
        .app-info-item {
            text-align: left;
        }
        .withdrawal-edit-main-save-button {
            display: inline-block;
            width: 96px;
            height: 42px;
            border-radius: 40px;
            background: #3277ff;
            color: #fff;
            text-align: center;
            line-height: 42px;
            margin: 6px auto 20px auto;
            box-shadow: 0px 4px 10px 0 rgba($color: #3277ff, $alpha: 0.18);
        }
    }
}
</style>