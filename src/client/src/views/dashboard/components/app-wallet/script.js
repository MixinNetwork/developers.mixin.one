import TInput from './compoents/t-input2'
import TModal from '@/components/t-modal'
import tools from '@/assets/js/tools'
import validator from 'validator'
import WithdrawalModal from './compoents/withdrawal-modal'

export default {
    components: {
        TInput, WithdrawalModal, TModal
    },
    props: ['active_app'],
    data() {
        return {
            is_edited: false,
            open_edit_modal: false,
            submit_form: {
                session_id: '9c7e1bb1-7ae9-46de-9c69-c5bcf72b6025',
                pin_token: 'cysZuRgyI88ISm0dfv7VmBFbMQoPrxieU/ghVmAKOfYK8rfhq0eVRH/64wEdlTV0cFNpC9sTp13dgdWwNj8SVHZ89IXwqLP8d63D7U9vlwTFegtvyDlEboCfVEsvZ2a7syR6+G2kxD3vBRnVwoHx3Fr6FxImM8217aeXdFkADtY=',
                private_key: '-----BEGIN RSA PRIVATE KEY-----\r\nMIICXAIBAAKBgQCUx7D+t0UylbNu3cy29/OGwIhlkTUuUboa3iUilUs08ZX5xQvG\r\nG3mDbwK6c0BAPTq6cVhY99NSo12Bj1DZbdW9P1LbsgiU/JUbqKdPZsrd3VlgAPSn\r\njeEV7kwnauCq/EHLtOkKW7JmCCilI/uECD4AL+bq8FqGKDlq3K/ty634iQIDAQAB\r\nAoGAejQDl1RljAUWGuwnp+nFp1shLXu12NPcLxFkIyHJYjVE4KEO6KvMhT57WTYt\r\nAhbI1DchQAJfGzOALFjRKaZjtgolbUSHRylbqfZLus+oLmmOkxSKdjYZx3L9AGoJ\r\n3GX/Zf0mwqa5ggqSY7xsMN3RmXGs+uoE07zxq8D6p80xqOECQQDVCuIOFn323HIn\r\nc4w2nJCkebPZbkPFEydngRJro/ukLCN70xaC1cydTkcSs6ADzrpLRCCCrDjtB+gs\r\nm9KmmLAVAkEAssefC1d+IfdiOezPvJfjPNNmU2JirasaYUwPTeK+Kd6a5RY4Q+cM\r\nd5sTtAzY3rDspC85X9yryQ8iBSWTJrZPpQJBAItf6lHjHxdwUvJCYrmbpfkkcafO\r\nvmFgzYemZmGrT0axZaltiK2hp5JGErNGdmnnRfNVp5s1hqxzXs5IRwCcpZ0CQFdq\r\njlTwYgdfvBLQvT7dEcqTH4yUJeX/LPX4R99wiEVWyGxNshNZrVnqZPb79SrmXb9m\r\nK+q4rvKvyJW1qr8aE9UCQC4rge5aGCdYXakxtb+LOnLJo6yv4xEdZ9w23tva3nwY\r\nYKU05/cDXtEP/D+A+i/UO4vHhqc5d8DOAiItJEskWS0=\r\n-----END RSA PRIVATE KEY-----\r\n'
            },
            assets_list: [],
            loading: false,
            show_withdrawal: false,
            active_asset: {}
        }
    },
    watch: {
        active_app(val) {
            if (window.localStorage.getItem(val.app_id)) {
                _get_assets_list.call(this)
            }
        }
    },
    methods: {
        click_submit() {
            if (!_check_date.call(this)) return
            _get_assets_token.call(this)
            _get_assets_list.call(this)
        },
        click_cancel() {
            this.open_edit_modal = false
        },
        click_withdrawal(item) {
            this.active_asset = {}
            this.active_asset = item
            setTimeout(() => {
                this.show_withdrawal = true
            }, 200)
        },
        update_list() {
            _get_assets_list.call(this)
        }
    },
    mounted() {
        if (window.localStorage.getItem(this.active_app.app_id)) {
            _get_assets_list.call(this)
        }
    },
}

function _check_date() {
    if (!validator.isUUID(this.submit_form.session_id, 4)) {
        this.$message.error('Session Id Format Error')
        return false
    }
    if (!validator.isBase64(this.submit_form.pin_token)) {
        this.$message.error('Pin Token Format Error')
        return false
    }
    return true
}

function _get_assets_list() {
    this.loading = true
    let _client_info_str = window.localStorage.getItem(this.active_app.app_id)
    let _client_info_obj = JSON.parse(_client_info_str)
    this.$axios({
        method: 'get',
        url: '/assets',
        headers: { 'Authorization': 'Bearer ' + _client_info_obj._assets_token }
    }).then(res => {
        this.assets_list = res
        this.is_edited = true
        this.open_edit_modal = false
        this.loading = false
    })
}

function _get_assets_token() {
    let get_token_obj = {
        uid: this.active_app.app_id,
        sid: this.submit_form.session_id,
        privateKey: this.submit_form.private_key.replace(/\\r\\n/g, '\r\n')
    }
    let _client_info = {
        _assets_token: tools.getJwtToken(get_token_obj, 'get', 'https://api.mixin.one/assets'),
        _sid: this.submit_form.session_id
    }
    window.localStorage.setItem(this.active_app.app_id, JSON.stringify(_client_info))
}