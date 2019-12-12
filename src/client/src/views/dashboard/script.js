import Information from './components/app-information'
import Secret from './components/app-secret'
import Wallet from './components/app-wallet'

let tmp_uri = '';

export default {
    name: 'dashboard-container',
    components: {Information, Secret, Wallet},
    data() {
        return {
            entring_status: {
                welcome: true,
                is_new_app: false,
                show_click_user: false
            },
            user_info: {
                avatar_url: '',
                full_name: ''
            },
            app_list: [],
            nav_header_index: 0,
            nav_list: ['information', 'wallet', 'secret'],
            active_app: {},
            _component: 'information',
            loading: false,
            all_loading: false,
            timer: null
        }
    },
    watch: {
        'entring_status.show_click_user'(val) {
            if (!val) document.removeEventListener('click', event_listener_to_toogle_show_click_user.bind(this))
        }
    },
    methods: {
        change_router(nav_header_index) {
            this.nav_header_index = nav_header_index
            this._component = this.nav_list[nav_header_index]
        },
        click_user() {
            this.entring_status.show_click_user = !this.entring_status.show_click_user
            if (this.entring_status.show_click_user) {
                document.addEventListener('click', event_listener_to_toogle_show_click_user.bind(this))
            }
        },
        click_app_list_item(index) {
            this.entring_status.welcome = false
            this.entring_status.is_new_app = false
            this.active_app = this.app_list[index]
            jump_to_uri.call(this, '/apps', true)
            clearTimeout(this.timer)
            this.loading = true;
            this.timer = setTimeout(() => {
                this.loading = false;
            }, 500)
        },
        click_new_app() {
            this.entring_status.welcome = false
            this.entring_status.is_new_app = true
            jump_to_uri.call(this, '/new', false)
            this.active_app = {
                name: '',
                home_uri: '',
                redirect_uri: '',
                icon_url: '',
                description: ''
            }
        },
        add_new_app(app_id) {
            axios_get_app_list.call(this, app_id)
            this.entring_status.is_new_app = false
        },
        click_sign_out() {
            window.localStorage.clear()
            this.entring_status.show_click_user = false;
            setTimeout(() => {
                window.location.href = window.location.origin
            }, 100)
        },
        change_loading(state) {
            this.loading = state
        }
    },
    mounted() {
        init_page.call(this)
    },
}

function init_page() {
    this.all_loading = true
    tmp_uri = this.$route.path
    mounted_select_active_router.call(this)
    axios_get_me.call(this)
    axios_get_app_list.call(this)
}


function axios_get_me() {
    this.apis.get_me().then(res => {
        this.user_info = res
    })
}

function axios_get_app_list(app_id) {
    this.apis.get_apps().then(res => {
        this.app_list = res
        this.all_loading = false

        let route_active_index = this.app_list.findIndex(item => item.app_number === this.$route.params.app_number)
        if (route_active_index !== -1) {
            this.active_app = this.app_list[route_active_index]
            this._component = 'information'
        }
        if (!app_id) return;
        let target_index = res.findIndex(item => item.app_id === app_id)
        this.active_app = res[target_index]
    })
}


function mounted_select_active_router() {
    this.nav_header_index = 0

    if (this.$route.path === '/') {
        this.entring_status.welcome = true
    } else if (this.$route.name === 'new_app') {
        this.entring_status.welcome = false
        this.entring_status.is_new_app = true
        this._component = 'information'
    } else {
        this.entring_status.welcome = false
    }
}


function event_listener_to_toogle_show_click_user() {
    this.entring_status.show_click_user = false
}

function jump_to_uri(uri, has_app_number) {
    this._component = 'information'
    this.nav_header_index = 0
    uri = has_app_number ? (uri + '/' + this.active_app.app_number) : uri;
    if (uri === tmp_uri) return;
    tmp_uri = uri;
    this.$router.push(tmp_uri);
}
