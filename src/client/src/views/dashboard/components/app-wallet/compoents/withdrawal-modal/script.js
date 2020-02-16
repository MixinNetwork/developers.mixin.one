import tools from '@/assets/js/tools'
import TInput2 from '../t-input2'
import TModal from '@/components/t-modal'

export default {
    name: 'withdrawal-modal',
    components: {
        TInput2, TModal
    },
    props: ['active_asset', 'app_id', 'show'],
    data() {
        return {
            submit_form: {
                amount: '',
                pin: '',
                opponent_id: '',
            },
            sid: '',
            uid: '',
            remember_token_status: false,
            loading: false,
            tmp_pin: ''
        };
    },
    watch: {
        app_id(val) {
            this.sid = _get_sid_from_storge(val)
            this.uid = val
        }
    },
    methods: {
        click_remember_token() {
            this.remember_token_status = !this.remember_token_status;
        },
        async click_submit() {
            this.loading = true
            let transfer_status = await submit_withdrawal.call(this)
            this.loading = false
            if (transfer_status) {
                this.$message.success({ message: this.$t('message.success.withdraw'), showClose: true });
                this.tmp_pin = ''
                this.$emit('close-modal')
                this.$emit('update-list')
                this.submit_form = {}
            }
        },
        click_cancel() {
            this.$emit('close-modal')
        },
        change_style() {
            let originVal = this.$refs.pin_token.value
            if (this.tmp_pin === undefined || this.tmp_pin.length > originVal.length) {
                this.tmp_pin = ''
            } else {
                let val = originVal.replace(/\D/g, '');
                this.tmp_pin += val;
            }
            let valLength = this.tmp_pin.length
            let _pin = ''
            for (let i = 0; i < valLength; i++) {
                _pin += '*'
            }
            this.$refs.pin_token.value = _pin
        }
    },
    mounted() {
        this.uid = this.app_id
    },
};

async function submit_withdrawal() {
    let _client_info_str = window.localStorage.getItem(this.uid)
    let _client_info_str_obj = JSON.parse(_client_info_str)
    return await _send_withdrawal_request.call(this, _client_info_str_obj, this.uid)
}

async function _send_withdrawal_request(_client_info_str_obj, uid) {
    let { privateKey, sid } = _client_info_str_obj
    let parmas = await _build_withdrawal_parmas.call(this, _client_info_str_obj),
        token = _get_token({ sid, uid, privateKey }, 'post', '/transfers', parmas)
    let res = await this.apis.transfers(parmas, token)
    return res && res.type === 'transfer'
}

async function _build_withdrawal_parmas(_client_info_str_obj) {
    let { amount } = this.submit_form
    let { pinToken, privateKey, sid } = _client_info_str_obj
    let pin = this.tmp_pin
    let parmas = {
        amount,
        asset_id: this.active_asset.asset_id,
        opponent_id: await _get_opponent_id.call(this, this.submit_form, _client_info_str_obj, this.uid),
        pin: tools.signPin(pin, pinToken, sid, privateKey),
        trace_id: tools.getUUID()
    }
    return parmas
}

async function _get_opponent_id({ opponent_id }, { sid, privateKey }, uid) {
    let url = '/search/' + opponent_id
    if (!sid) sid = _get_sid_from_storge(uid)
    let token = _get_token({ sid, uid, privateKey }, 'get', url)
    let { user_id } = await this.apis.search(opponent_id, token)
    return user_id;
}

function _get_token({ sid, uid, privateKey }, method, url, body) {
    return tools.getJwtToken({ sid, uid, privateKey }, method, url, body)
}

function _get_sid_from_storge(appid) {
    let a = JSON.parse(window.localStorage.getItem(appid))
    return a && a._sid
}
