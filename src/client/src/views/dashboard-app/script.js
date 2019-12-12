import MHeader from './components/header'
import MContent from './components/content'

export default {
    name: 'dashboard-container',
    components: {MHeader, MContent},
    data() {
        return {
            nav_header_index: 0,
            nav_list: ['Information', 'Wallet', 'Secret'],
            all_loading: false,
            is_pad: document.documentElement.clientWidth > 500,
            show_click_user: false
        }
    },
    computed: {
        app_list() {
            return this.$store.state.app_list
        },
        user_info() {
            return this.$store.state.user_info
        }
    },
    watch: {
        'entring_status.show_click_user'(val) {
            if (!val) document.removeEventListener('click', event_listener_to_toogle_show_click_user.bind(this))
        }
    },
    methods: {
        click_app_item(app_info) {
            this.$store.commit('change_state', {can_transition: true})
            if (!app_info) {
                this.$router.push('/apps/new')
                return
            }
            this.$store.commit('change_state', {active_app: app_info})
            this.$router.push('/apps/' + app_info.app_number)
        },
        click_user_img() {
            this.show_click_user = !this.show_click_user
            if (this.show_click_user) {
                document.addEventListener('click', event_listener_to_toogle_show_click_user.bind(this))
            }
        },
        click_sign_out() {
            window.localStorage.clear()
            this.show_click_user = false;
            setTimeout(() => {
                window.location.href = window.location.origin
            }, 100)
        }
    },
    mounted() {
        this.all_loading = true
        this.$store.dispatch('init_app').then(_ => {
            this.all_loading = false
        })
    }
}


function event_listener_to_toogle_show_click_user() {
    this.show_click_user = false
}
