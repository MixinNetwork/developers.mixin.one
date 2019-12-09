import TInput from '@/components/t-input'
import tools from '@/assets/js/tools'
import validator from 'validator'
import Withdrawal from './components/withdrawal'
import TModal from '@/components/t-modal'

export default {
    components: {
        TInput, Withdrawal, TModal
    },
    props: ['active_app'],
    data() {
        return {
            is_edited: false,
            open_edit_modal: false,
            submit_form: {
                session_id: '1510f69c-3f0e-40bd-9b56-32560e710cb0',
                pin_token: 'LLqI71tUUG0T6J1fZ7piKjrzx/hYD0gug1u1XUg9TDKq1XAlZugF3F1fpN1vq2MIZ61BH7H+NXlV5mLgZ/TGEyPf0UdhgQWZW+33jSveg2YGczfrH667XqwMsO0poYUE0SKy+DlEmV6L4yKG40/aAQ9wNcMpW8zDm7O/r5OtH9o=',
                private_key: '-----BEGIN RSA PRIVATE KEY-----\r\nMIICWwIBAAKBgQCTpBH9q9f3UXTTGwOVFENJmCxqUn0otcJP7cGc250iYf+F7aMr\r\nxPmKo+zlKCxStBxLkuJxKtl8nmGXbA8var0oyFbIOfd8Xf60A/Q2xG+F5/ouLfu3\r\n1cBwdZVYoJtSRvop2ftjTnFBCkzqfnvt4UEd6HDQ/azm854rpGkLetuu6QIDAQAB\r\nAoGAFoVnjSeCeSJ+zJkJUdtWbEp/M/TDTMt1CZY9+3xwmscSIE7gnhOc8S4SO96F\r\n7FO3ITwVuKeNp3nNbzi3lEcW9X8m5euelbkqb1B9w5rsETC7gyD/U2kzT0iCwCc4\r\nyr8i6IJ2L4kT5QTTe1XtyCELuIgUx5Gw0RzGpWl/NnXTmcUCQQDRn9OIpGLoFE16\r\nFMDe3eHk40pE4Am1DGSBshybUyRt9Ajbw90j1BcRdKaojYZMeKcWaOsOzWnin9v1\r\nv4mLyw3XAkEAtE3IgZQ2BQHe2Gjeb3L1tKkjqSDkyWNlTW/USNytyRrUNjP9hGIp\r\nUDsh0XJpJc2fQpGS88ESWA+XdPpGeMgRPwJAIyBrLAyP3l/4k6qCn1YDEn3b5iq8\r\nta/775fPH2ARTLOGAH2Twvs5Wl13x+rfRFU7eo/eQ768LZOoIkgUXm6KRQJAPP2m\r\n2rZhA5abZEctHzQbC26/omF/IuSdivFONQt5OfL6YA98LYDrCrnF+cyi5ufEfMcz\r\nl4LzCpjTmf1jQ04iDwJAbGBGtwxMe3eLIgGgnMJYARMu82zcNfE8l2D1wQvwsa1/\r\nfJ8KHnfjWjERGVnquCUm73MDJnXxqbivoXolv4tkuA==\r\n-----END RSA PRIVATE KEY-----\r\n'
            },
            assets_list: [],
            loading: false,
            active_asset: {}
        }
    },
    computed: {
        transition_name() {
            return this.$store.state.transition_name;
        }
    },
    watch: {
        'active_app'(val) {
            if (!val.app_number) return
            if (window.localStorage.getItem(this.active_app.app_id)) {
                this.is_edited = true
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
            this.$store.commit('change_state', { active_asset: item })
            this.$emit('open_withdrawal')
        },
        update_list() {
            _get_assets_list.call(this)
        }
    },
    mounted() {
        if (!this.active_app.app_number) return
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