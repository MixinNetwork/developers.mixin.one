import MHeader from './components/header'
import MContent from './components/content'

export default {
    name: 'dashboard-container',
    components: { MHeader, MContent },
    data() {
        return {
            nav_header_index: 0,
            nav_list: ['Information', 'Wallet', 'Secret'],
            all_loading: false,
            is_pad: document.documentElement.clientWidth > 500,
            show_click_user: false,
            component_name: '',
            transition_name: ''
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
        back(to_withdraw) {
            this.transition_name = 'slide-right'
            !to_withdraw && this.$router.go(-1)
            this.component_name = to_withdraw ? () => import('./components') : ''
            setTimeout(() => {
                this.transition_name = 'slide-none'
            }, 300);
        },
        click_app_item(app_info) {
            this.transition_name = 'slide-left'
            this.$store.commit('change_state', { can_transition: true })
            if (!app_info) {
                this.$router.push('/apps/new')
                this.$store.commit("cache_new_app", null);
                this.component_name = () => import('./components')
                return
            }
            this.$store.commit('change_state', { active_app: app_info })
            this.$router.push('/apps/' + app_info.app_number)
            this.component_name = () => import('./components')
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
            if (this.$route.path !== '/') {
                this.component_name = () => import('./components')
            }
        })
        if (this.$route.path === '/apps/new') {
            this.$store.commit('cache_new_app', true)
        }
    },
    destroyed() {
        if (this.$route.path === '/apps/new') {
            this.$store.commit('cache_new_app', false)
        }
    }
}


function event_listener_to_toogle_show_click_user() {
    this.show_click_user = false
}
