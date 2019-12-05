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
                amount: '1',
                pin: '781965',
                opponent_id: '30265',
                pin_token: 'cysZuRgyI88ISm0dfv7VmBFbMQoPrxieU/ghVmAKOfYK8rfhq0eVRH/64wEdlTV0cFNpC9sTp13dgdWwNj8SVHZ89IXwqLP8d63D7U9vlwTFegtvyDlEboCfVEsvZ2a7syR6+G2kxD3vBRnVwoHx3Fr6FxImM8217aeXdFkADtY=',
                private_key: '-----BEGIN RSA PRIVATE KEY-----\r\nMIICXAIBAAKBgQCUx7D+t0UylbNu3cy29/OGwIhlkTUuUboa3iUilUs08ZX5xQvG\r\nG3mDbwK6c0BAPTq6cVhY99NSo12Bj1DZbdW9P1LbsgiU/JUbqKdPZsrd3VlgAPSn\r\njeEV7kwnauCq/EHLtOkKW7JmCCilI/uECD4AL+bq8FqGKDlq3K/ty634iQIDAQAB\r\nAoGAejQDl1RljAUWGuwnp+nFp1shLXu12NPcLxFkIyHJYjVE4KEO6KvMhT57WTYt\r\nAhbI1DchQAJfGzOALFjRKaZjtgolbUSHRylbqfZLus+oLmmOkxSKdjYZx3L9AGoJ\r\n3GX/Zf0mwqa5ggqSY7xsMN3RmXGs+uoE07zxq8D6p80xqOECQQDVCuIOFn323HIn\r\nc4w2nJCkebPZbkPFEydngRJro/ukLCN70xaC1cydTkcSs6ADzrpLRCCCrDjtB+gs\r\nm9KmmLAVAkEAssefC1d+IfdiOezPvJfjPNNmU2JirasaYUwPTeK+Kd6a5RY4Q+cM\r\nd5sTtAzY3rDspC85X9yryQ8iBSWTJrZPpQJBAItf6lHjHxdwUvJCYrmbpfkkcafO\r\nvmFgzYemZmGrT0axZaltiK2hp5JGErNGdmnnRfNVp5s1hqxzXs5IRwCcpZ0CQFdq\r\njlTwYgdfvBLQvT7dEcqTH4yUJeX/LPX4R99wiEVWyGxNshNZrVnqZPb79SrmXb9m\r\nK+q4rvKvyJW1qr8aE9UCQC4rge5aGCdYXakxtb+LOnLJo6yv4xEdZ9w23tva3nwY\r\nYKU05/cDXtEP/D+A+i/UO4vHhqc5d8DOAiItJEskWS0=\r\n-----END RSA PRIVATE KEY-----\r\n'
            },
            sid: '',
            uid: '',
            remember_token_status: false,
            loading: false
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
            this.submit_form.private_key = this.submit_form.private_key.replace(/\\r\\n/g, '\r\n')
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
    return res && res.type === 'transfer'
}

async function _build_withdrawal_parmas() {
    let { pin, pin_token, private_key, amount } = this.submit_form;
    let parmas = {
        amount,
        asset_id: this.active_asset.asset_id,
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
    let a = JSON.parse(window.localStorage.getItem(appid))
    return a && a._sid
}