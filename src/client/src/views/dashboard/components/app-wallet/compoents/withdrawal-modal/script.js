import tools from '@/assets/js/tools'
import TInput2 from '../t-input2'
export default {
    name: 'withdrawal-modal',
    components: {
        TInput2
    },
    props: ['active_asset', 'app_id'],
    data() {
        return {
            submit_form: {
                amount: '1',
                pin: '',
                opponent_id: '',
                pin_token: '',
                private_key: '',
            },
            sid: '',
            uid: '',
            asset_id: '',
            remember_token_status: false,
            loading: false
        };
    },
    methods: {
        click_remember_token() {
            this.remember_token_status = !this.remember_token_status;
        },
        async click_submit() {
            this.loading = true
            this.submit_form.private_key = this.submit_form.private_key.replace(/\\r\\n/g,'\r\n')
            let transfer_status = await submit_withdrawal.call(this)
            this.loading = false
            if (transfer_status) {
                this.$message.success('Withdrawal Success')
                this.$emit('close-modal')
                this.$emit('update-list')
                this.submit_form = {}
            }
        },
        click_cancel() {
            this.$emit('close-modal')
        }
    },
    mounted() {
        this.sid = _get_sid_from_storge(this.app_id)
        this.uid = this.app_id
        this.asset_id = this.active_asset.asset_id
        _set_pin_token_and_private_key_if_has.call(this)
    },
};

async function submit_withdrawal() {
    return await _send_withdrawal_request.call(this, this.submit_form.private_key, this.sid, this.uid)
}

async function _send_withdrawal_request(private_key, sid, uid) {
    let parmas = await _build_withdrawal_parmas.call(this),
        method = 'post',
        url = '/transfers',
        token = _get_token({ sid, uid, private_key }, method, url, parmas)
    let res = await this.$axios({
        method,
        url,
        data: parmas,
        headers: { 'Authorization': 'Bearer ' + token }
    })
    console.log(res)
    return res && res.type === 'transfer'
}

async function _build_withdrawal_parmas() {
    let { pin, pin_token, private_key, amount } = this.submit_form;
    let parmas = {
        amount,
        asset_id: this.asset_id,
        opponent_id: await _get_opponent_id.call(this, this.submit_form, this.sid, this.uid),
        pin: tools.signPin(pin, pin_token, this.sid, private_key),
        trace_id: tools.getUUID()
    }
    return parmas
}

async function _get_opponent_id({ private_key, opponent_id }, sid, uid) {
    let method = 'get',
        url = '/search/' + opponent_id,
        token = _get_token({ sid, uid, private_key }, method, url)
    let { user_id } = await this.$axios({
        method: 'get',
        url,
        headers: { 'Authorization': 'Bearer ' + token }
    })
    return user_id;
}

function _get_token({ sid, uid, private_key: privateKey }, method, url, body) {
    return tools.getJwtToken({ sid, uid, privateKey }, method, url, body)
}

function _get_sid_from_storge(appid) {
    console.log('appid :', appid);
    return (JSON.parse(window.localStorage.getItem(appid)))._sid
}

function _set_pin_token_and_private_key_if_has() {

}