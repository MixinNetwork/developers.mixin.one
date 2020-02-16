import TInput from '@/components/t-input'
import TModal from '@/components/t-modal'
import { _check_date, _set_token_obj } from '@/assets/js/wallet'
import { _request_show_qrcode, _request_rotate_qrcode, _request_new_secret } from '@/assets/js/secret'
export default {
    name: 'app-information',
    components: {
        TInput, TModal
    },
    props: ['active_app'],
    data() {
        return {
            new_secret: '',
            modal_content: '',
            modal_title: '',
            open_edit_modal: false,
            confirm_modal: false,
            loading: false,
            confirm_content: '',
            submit_form: {
                session_id: '',
                pin_token: '',
                private_key: '',
            },
            tmp_action: '',
            app_str: ''
        }
    },
    watch: {
        loading(val) {
            this.$emit('loading', val)
        }
    },
    methods: {
        tips_to_desktop() {
            this.$message.info({ message: this.$t('message.app.secret_tips'), showClose: true })
        },
        click_copy_succuess() {
            this.$message.success({ message: this.$t('message.success.copy'), showClose: true });
        },
        click_copy_error() {
            this.$message.error({ message: this.$t('message.errors.copy'), showClose: true });
        },
        click_close_new_secret() {
            this.modal_content = ''
        },
        request_new_secret() {
            this.confirm_content = this.$t('secret.secret_question')
            this.tmp_action = 'new_secret'
            this.confirm_modal = true
        },
        request_show_qrcode() {
            let { app_id } = this.active_app
            let app_str = window.localStorage.getItem(app_id)
            this.tmp_action = 'show_qrcode'
            if (!app_str) return this.open_edit_modal = true
            this.app_str = app_str
            _request_show_qrcode.call(this, app_str)
        },
        request_rotate_qrcode() {
            let { app_id } = this.active_app
            let app_str = window.localStorage.getItem(app_id)
            this.tmp_action = 'rotate_qrcode'
            if (!app_str) return this.open_edit_modal = true
            this.app_str = app_str
            this.confirm_content = this.$t('secret.rotate_qrcode_question')
            this.confirm_modal = true
        },
        click_submit() {
            if (!_check_date.call(this)) return
            _set_token_obj.call(this)
            this.open_edit_modal = false
            switch (this.tmp_action) {
                case 'show_qrcode':
                    this.request_show_qrcode()
                    break
                case 'rotate_qrcode':
                    this.request_rotate_qrcode()
                    break
            }
        },
        click_confirm() {
            switch (this.tmp_action) {
                case 'show_qrcode':
                    this.request_show_qrcode()
                    break
                case 'rotate_qrcode':
                    this.confirm_modal = false
                    _request_rotate_qrcode.call(this)
                    break
                case 'new_secret':
                    this.confirm_modal = false
                    _request_new_secret.call(this)
                    break
            }
        },
        click_cancel() {
            this.open_edit_modal = false
        }
    },
    mounted() {
        !(this.active_app.app_id || this.$route.params.app_number) && this.$router.push('/')
    },
}
