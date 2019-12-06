<template>
    <div class="dash-app-wallet-component-withdrawal dashboard-app">
        <m-header>
            <div
                style="width:50px;transform:translate(-20px);padding-left:25px"
                @click="back"
                slot="left"
            >
                <i class="icon iconfont iconicon_on_the_left"></i>
            </div>
            <div slot="center">Wallet</div>
        </m-header>
        <m-content>
            <div class="withdrawal-icon-and-balance">
                <img :src="active_asset.icon_url" />
                <div>{{active_asset.balance}} {{active_asset.symbol}}</div>
            </div>
            <div v-loading="loading" class="withdrawal-edit-main">
                <div class="app-info-item">
                    <div>Amount</div>
                    <div>
                        <input placeholder="0.0000" v-model="submit_form.amount" />
                    </div>
                </div>
                <div class="app-info-item">
                    <div>PIN</div>
                    <div>
                        <input placeholder="PIN" v-model="submit_form.pin" />
                    </div>
                </div>
                <div class="app-info-item">
                    <div>Mixin ID</div>
                    <div>
                        <input
                            placeholder="Mixin ID or Mixin address"
                            v-model="submit_form.opponent_id"
                        />
                    </div>
                </div>
                <div class="app-info-item">
                    <div>Pin Token</div>
                    <div>
                        <input placeholder="Pin Token" v-model="submit_form.pin_token" />
                    </div>
                </div>
                <div class="app-info-item">
                    <div>Private Key</div>
                    <div>
                        <input placeholder="Private Key" v-model="submit_form.private_key" />
                    </div>
                </div>
                <span @click="click_submit" class="withdrawal-edit-main-save-button">Submit</span>
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
                pin: '781965',
                opponent_id: '30265',
                pin_token:
                    'cysZuRgyI88ISm0dfv7VmBFbMQoPrxieU/ghVmAKOfYK8rfhq0eVRH/64wEdlTV0cFNpC9sTp13dgdWwNj8SVHZ89IXwqLP8d63D7U9vlwTFegtvyDlEboCfVEsvZ2a7syR6+G2kxD3vBRnVwoHx3Fr6FxImM8217aeXdFkADtY=',
                private_key:
                    '-----BEGIN RSA PRIVATE KEY-----\r\nMIICXAIBAAKBgQCUx7D+t0UylbNu3cy29/OGwIhlkTUuUboa3iUilUs08ZX5xQvG\r\nG3mDbwK6c0BAPTq6cVhY99NSo12Bj1DZbdW9P1LbsgiU/JUbqKdPZsrd3VlgAPSn\r\njeEV7kwnauCq/EHLtOkKW7JmCCilI/uECD4AL+bq8FqGKDlq3K/ty634iQIDAQAB\r\nAoGAejQDl1RljAUWGuwnp+nFp1shLXu12NPcLxFkIyHJYjVE4KEO6KvMhT57WTYt\r\nAhbI1DchQAJfGzOALFjRKaZjtgolbUSHRylbqfZLus+oLmmOkxSKdjYZx3L9AGoJ\r\n3GX/Zf0mwqa5ggqSY7xsMN3RmXGs+uoE07zxq8D6p80xqOECQQDVCuIOFn323HIn\r\nc4w2nJCkebPZbkPFEydngRJro/ukLCN70xaC1cydTkcSs6ADzrpLRCCCrDjtB+gs\r\nm9KmmLAVAkEAssefC1d+IfdiOezPvJfjPNNmU2JirasaYUwPTeK+Kd6a5RY4Q+cM\r\nd5sTtAzY3rDspC85X9yryQ8iBSWTJrZPpQJBAItf6lHjHxdwUvJCYrmbpfkkcafO\r\nvmFgzYemZmGrT0axZaltiK2hp5JGErNGdmnnRfNVp5s1hqxzXs5IRwCcpZ0CQFdq\r\njlTwYgdfvBLQvT7dEcqTH4yUJeX/LPX4R99wiEVWyGxNshNZrVnqZPb79SrmXb9m\r\nK+q4rvKvyJW1qr8aE9UCQC4rge5aGCdYXakxtb+LOnLJo6yv4xEdZ9w23tva3nwY\r\nYKU05/cDXtEP/D+A+i/UO4vHhqc5d8DOAiItJEskWS0=\r\n-----END RSA PRIVATE KEY-----\r\n'
            },
            loading: false
        };
    },
    computed: {
        active_app() {
            return this.$store.state.active_app;
        },
        active_asset() {
            return this.$store.state.active_asset;
        },
        uid() {
            return this.active_app.app_id;
        },
        sid() {
            return JSON.parse(window.localStorage.getItem(this.uid))._sid;
        },
        asset_id() {
            return this.active_asset.asset_id;
        }
    },
    methods: {
        back() {
            this.$emit('close_withdrawal');
        },
        async click_submit() {
            if (!check_form_data.call(this)) return;
            console.log(check_form_data.call(this));
            if (this.loading) return;
            this.loading = true;
            this.submit_form.private_key = this.submit_form.private_key.replace(
                /\\r\\n/g,
                '\r\n'
            );
            let transfer_status = await submit_withdrawal.call(this);
            this.loading = false;
            if (transfer_status) {
                this.$message.success('Withdrawal Success');
                this.active_asset.balance -= this.submit_form.amount;
                this.submit_form = {};
                this.$store.dispatch('init_app', true);
            }
        }
    },
    mounted() {}
};
async function submit_withdrawal() {
    return await _send_withdrawal_request.call(
        this,
        this.submit_form.private_key,
        this.sid,
        this.uid
    );
}

async function _send_withdrawal_request(private_key, sid, uid) {
    let parmas = await _build_withdrawal_parmas.call(this),
        method = 'post',
        url = '/transfers',
        token = _get_token({ sid, uid, private_key }, method, url, parmas);
    let res = await this.$axios({
        method,
        url,
        data: parmas,
        headers: { Authorization: 'Bearer ' + token }
    });
    return res && res.type === 'transfer';
}

async function _build_withdrawal_parmas() {
    let { pin, pin_token, private_key, amount } = this.submit_form;
    let parmas = {
        amount,
        asset_id: this.asset_id,
        opponent_id: await _get_opponent_id.call(
            this,
            this.submit_form,
            this.sid,
            this.uid
        ),
        pin: tools.signPin(pin, pin_token, this.sid, private_key),
        trace_id: tools.getUUID()
    };
    return parmas;
}

async function _get_opponent_id({ private_key, opponent_id }, sid, uid) {
    let method = 'get',
        url = '/search/' + opponent_id,
        token = _get_token({ sid, uid, private_key }, method, url);
    let { user_id } = await this.$axios({
        method: 'get',
        url,
        headers: { Authorization: 'Bearer ' + token }
    });
    return user_id;
}

function _get_token({ sid, uid, private_key: privateKey }, method, url, body) {
    return tools.getJwtToken({ sid, uid, privateKey }, method, url, body);
}

function check_form_data() {
    let { amount, pin, pin_token, opponent_id, private_key } = this.submit_form;
    if (!amount || amount < 0) {
        this.$message.error('Please enter the correct Amount');
        return false;
    }
    if (!pin) {
        this.$message.error('Please enter the correct Pin');
        return false;
    }
    if (!pin_token) {
        this.$message.error('Please enter the correct Pin Token');
        return false;
    }
    if (!opponent_id) {
        this.$message.error('Please enter the correct Mixin ID');
        return false;
    }
    if (!private_key) {
        this.$message.error('Please enter the correct Private Key');
        return false;
    }
    return true;
}
</script>

<style lang="scss">
.dash-app-wallet-component-withdrawal {
    background: #fff;
    z-index: 1001;
    .withdrawal-icon-and-balance {
        text-align: center;
        margin: 20px 0 16px 0;
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
        }
    }
    // .dashboard-app-content {
    //     // bottom: initial;
    //     // z-index: -1;
    // }
}
</style>