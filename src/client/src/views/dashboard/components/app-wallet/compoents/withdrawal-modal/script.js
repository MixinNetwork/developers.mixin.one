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
                pin: '491131',
                opponent_id: '30265',
                pin_token: 'SnrztG1X+qR5STcVprgprPhwz5JHeKV/v7xqCwU/LnpCIXjhyOdSMofs56wz9t/momciCvN6ilVsqxUDr4jv+WoxWIwNktpHkCRuUgqzqdyr1SlL2Y0JRQ98lDegB8u+T38p2eFwKZLVuyj5gnmJZKmsSiNYdovJan1DzqdOtLk=',
                private_key: '-----BEGIN RSA PRIVATE KEY-----\r\nMIICXAIBAAKBgQCt6g+A/Bw6+qdsgpDfw/IrAYrzT72KPXKsWEWT0G+FNbbo0hRP\r\nCxUzlAHrocBBXfzgruO48ZgKeMx7laqRh1JEdE0uQ8KsAmdDSfVfCW1jzX5oB1kr\r\npALGlQIWeATDaf5p/pa1MEtb0Trm42kTj+qSjr3kXRbp1qSSS6qhFnAJtQIDAQAB\r\nAoGALxAjB+2xmghQnF2s5ND6zMaLGpLeoPVF/fuZQInsU+kYSWLoWgeOwjlwV5qb\r\nE1Vi5E6Pk3HViifsdhknYmBzU169QWS6ukUr5uXT6x8NULmgnJ7wgH//pZwXXRsS\r\n9gaDmrUgjVmoR5NigkdKsnRaZ63GZq/7lnp1UP1zHCPk/NUCQQDaVPT8oV2/z8GZ\r\ns2+Iq+V4qPqpgxtyopjo1kpSQEqUW9+TM/AntlAtGaxk5MO9pH62CZHJQCGiUpDL\r\nRPkYgf9XAkEAy+tRMkjbXHEjWNQ7eS+MD0SSMi8MCvoozCFFjT/FpjjgEItWvBVd\r\n7Ih/2yFk7JrPF11J9FTKZdWdg/m4HY3z0wJBAMlsw7Amd0U0uJnCb02ZuNS+oLKu\r\noC38UDHPMTX81lFVCUjXC+K3UfSp0OAsJWHaVoQ/A961adJFdgvyEBVKKXUCQFIu\r\nZ+7IBf/faMtn3QAd9WhBzlmDNGtIHiEGV61xQgqXaVXBkhcC1XN6H20ErFPeoA9e\r\nfWuGsHsR+AU0IstmZhkCQDSL2JdoG4FqfwET+Fh7v8CzlrDDOvKtZKojTAIl/pLM\r\n6SkBXVgPtJ2caixOV23IWhBWVWd7X73yDFIe0X3Epeo=\r\n-----END RSA PRIVATE KEY-----\r\n',
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