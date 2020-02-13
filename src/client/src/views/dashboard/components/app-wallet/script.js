import TInput from './compoents/t-input2'
import TModal from '@/components/t-modal'
import WithdrawalModal from './compoents/withdrawal-modal'
import { _check_date, _get_assets_list, _set_token_obj } from '@/assets/js/wallet'

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
                session_id: '',
                pin_token: '',
                private_key: ''
            },
            assets_list: [],
            loading: false,
            whole_loading: false,
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
            this.loading = true
            _set_token_obj.call(this)
            this.open_edit_modal = false
            this.loading = false
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