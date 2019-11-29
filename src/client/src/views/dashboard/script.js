
export default {
    name: 'dashboard-container',
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
            header_index: 0,
            active_app: {},
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
        change_router(header_index) {
            this.header_index = header_index
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
            this.$router.push('/information')
            this.header_index = 0
            this.active_app = this.app_list[index]
            clearTimeout(this.timer)
            this.loading = true;
            this.timer = setTimeout(() => {
                this.loading = false;
            }, 1000)
        },
        click_new_app() {
            this.entring_status.welcome = false
            this.entring_status.is_new_app = true
            this.$router.push('/information')
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
        }
    },
    mounted() {
        init_page.call(this)
    },
}

function init_page() {
    this.all_loading = true
    mounted_select_active_router.call(this)
    axios_get_me.call(this)
    axios_get_app_list.call(this)
}


function axios_get_me() {
    this.$axios.get('/me').then(res => {
        this.user_info = res
    })
}
function axios_get_app_list(app_id) {
    this.$axios.get('/apps').then(res => {
        this.app_list = res
        this.all_loading = false
        if (!app_id) return;
        let target_index = res.findIndex(item => item.app_id === app_id)
        this.active_app = res[target_index]
    })
}


function mounted_select_active_router() {
    const header_index = { 'information': 0, 'wallet': 1, 'secret': 2 }
    this.header_index = header_index[this.$route.name]
}


function event_listener_to_toogle_show_click_user() {
    this.entring_status.show_click_user = false
}