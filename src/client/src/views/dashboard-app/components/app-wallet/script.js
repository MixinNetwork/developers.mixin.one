import TInput from '@/components/t-input'
import Withdrawal from './components/withdrawal'
import TModal from '@/components/t-modal'
import { _check_date, _get_assets_list, _set_token_obj } from '@/assets/js/wallet'
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
                session_id: '',
                pin_token: '',
                private_key: ''
            },
            whole_loading: false,
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
            _set_token_obj.call(this)
            _get_assets_list.call(this)
        },
        click_cancel() {
            this.open_edit_modal = false
        },
        click_withdrawal(item) {
            this.$store.commit('change_state', { active_asset: item, can_transition: true })
            this.$router.push('/withdrawal/' + this.active_app.app_number)
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