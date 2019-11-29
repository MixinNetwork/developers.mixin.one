import TInput from '@/components/t-input'
import tools from '@/assets/js/tools'
import validator from 'validator'
import WithdrawalModal from './compoents/withdrawal-modal'

export default {
    components: {
        TInput, WithdrawalModal
    },
    props: ['active_app'],
    data() {
        return {
            is_edited: false,
            submit_form: {
                session_id: '',
                pin_token: '',
                private_key: ''
            },
            assets_list: [],
            loading: false,
            show_withdrawal: false,
            active_asset: {}
        }
    },
    methods: {
        click_submit() {
            if (!_check_date.call(this)) return
            _get_assets_token.call(this)
            _get_assets_list.call(this)
        },
        click_withdrawal(item){
            this.active_asset = {}
            this.active_asset = item
            setTimeout(() => {
                this.show_withdrawal = true
            },200)
        },
        update_list(){
            _get_assets_list.call(this)
        }
    },
    mounted() {
        if (window.localStorage.getItem(this.active_app.app_id)) {
            this.is_edited = true
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
        headers: { 'Authorization': 'Bearer ' +  _client_info_obj._assets_token}
    }).then(res => {
        this.assets_list = res
        this.is_edited = true
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
    window.localStorage.setItem(this.active_app.app_id, JSON.stringify(_client_info) )
}