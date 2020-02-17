import MHeader from './components/header'
import MContent from './components/content'
import TModal from '@/components/t-modal'
import tools from '@/assets/js/tools'
import Main from './components'

export default {
  name: 'dashboard-container',
  components: { MHeader, MContent, TModal, Main },
  data() {
    return {
      nav_header_index: 0,
      nav_list: ['Information', 'Wallet', 'Secret'],
      all_loading: false,
      is_pad: document.documentElement.clientWidth > 500,
      show_click_user: false,
      component_name: '',
      transition_name: '',
      is_immersive: false,
      balance_modal: false,
      tmp_money: 0
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
      this.component_name = to_withdraw ? Main : ''
      setTimeout(() => {
        this.transition_name = 'slide-none'
      }, 300);
    },
    click_app_item(app_info) {
      this.transition_name = 'slide-left'
      this.$store.commit('change_state', { can_transition: true })
      if (!app_info) {
        this.all_loading = true
        this.$store.dispatch('get_apps_property').then(res => {
          if (res > 0) {
            this.tmp_money = res
            this.balance_modal = true
          } else {
            this.$router.push('/apps/new')
            this.$store.commit("cache_new_app", null);
            this.component_name = Main
          }
        }).finally(_ => this.all_loading = false)
        return
      }
      this.$store.commit('change_state', { active_app: app_info })
      this.$router.push('/apps/' + app_info.app_number)
      this.component_name = Main
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
    },
    click_buy_item(count) {
      let trace = tools.getUUID()
      let amount = Number(count) * Number(this.tmp_money)
      window.location.href = `https://mixin.one/pay?recipient=fbd26bc6-3d04-4964-a7fe-a540432b16e2&asset=c94ac88f-4671-3976-b60a-09064f1811e8&amount=${amount}&trace=${trace}&memo=PAY_FOR_APP`
    }
  },
  mounted() {
    tools.changeTheme('#fff')
    this.is_immersive = tools.isImmersive()
    this.all_loading = true
    this.$store.dispatch('init_app').then(_ => {
      this.all_loading = false
      if (this.$route.path !== '/') {
        this.component_name = Main
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
