import DHeader from '@/components/DHeader'
import Information from './app-information'
import Secret from './app-secret'
import Wallet from './app-wallet'
import DModal from '@/components/DModal'
import tools from '@/assets/js/tools'

let tmp_uri = ''

export default {
  name: 'dashboard-container',
  components: { Information, Secret, Wallet, DModal, DHeader },
  data() {
    return {
      show_click_user: false,
      is_welcome: true,
      is_new_app: false,
      nav_header_index: 0,
      nav_list: ['information', 'wallet', 'secret'],
      tmp_component: 'information',
      loading: false,
      all_loading: false,
      init_status: false,
      timer: null,
      balance_modal: false,
      tmp_money: 0,
      is_immersive: false,
      is_mobile: false,
      user_info: {},
      app_list: [],
      active_app: {},
      apps_property: {}
    }
  },
  watch: {
    '$route.path'(val) {
      if (val === '/apps/new') {
        this.click_new_app()
      } else if (val.includes('/apps')) {
        let { app_number } = this.$route.params
        update_active_app.call(this, app_number)
      }
    }
  },
  methods: {
    back() {
      tmp_uri = ''
      this.$router.go(-1)
    },
    change_router(nav_header_index) {
      this.nav_header_index = nav_header_index
      this.tmp_component = this.nav_list[nav_header_index]
    },
    click_app_list_item(index) {
      this.is_welcome = false
      this.is_new_app = false
      this.active_app = this.app_list[index]
      jump_to_uri.call(this, '/apps', true)
      clearTimeout(this.timer)
      this.loading = true
      this.timer = setTimeout(() => {
        this.loading = false
      }, 500)
    },
    async click_new_app() {
      this.all_loading = true
      let app_nums = this.app_list.length
      let { count, price } = this.apps_property
      let add_one_app_price = (app_nums + 1 - Number(count)) * Number(price)
      if (add_one_app_price <= 0) {
        this.active_app = {}
        this.is_welcome = false
        this.is_new_app = true
        jump_to_uri.call(this, '/apps/new', false)
      } else {
        let { count, price } = await this.apis.get_apps_property()
        add_one_app_price = (app_nums + 1 - Number(count)) * Number(price)
        if (add_one_app_price > 0) {
          this.tmp_money = add_one_app_price
          this.balance_modal = true
        }
      }
      this.all_loading = false
    },
    add_new_app(app_number) {
      axios_get_app_list.call(this, app_number)
      this.is_new_app = false
    },
    click_user() {
      this.show_click_user = !this.show_click_user
      if (this.show_click_user) {
        document.onclick = () => this.show_click_user = false
      }
    },
    click_sign_out() {
      window.localStorage.clear()
      this.show_click_user = false
      setTimeout(() => {
        window.location.href = window.location.origin
      }, 100)
    },
    change_loading(state) {
      this.loading = state
    },
    click_buy_item(count) {
      let trace = tools.getUUID()
      let amount = this.tmp_money + (count - 1) * Number(this.apps_property.price)
      window.location.href = `https://mixin.one/pay?recipient=fbd26bc6-3d04-4964-a7fe-a540432b16e2&asset=c94ac88f-4671-3976-b60a-09064f1811e8&amount=${amount}&trace=${trace}&memo=PAY_FOR_APP`
    }
  },
  async mounted() {
    this.is_mobile = document.documentElement.clientWidth < 769
    window.onresize = () => {
      this.is_mobile = document.documentElement.clientWidth < 769
    }
    await init_page.call(this)
  }
}

async function init_page() {
  tools.changeTheme('#fff')
  this.is_immersive = tools.isImmersive()
  this.init_status = false
  this.all_loading = true
  tmp_uri = this.$route.path
  mounted_select_active_router.call(this)
  this.user_info = await this.apis.get_me()
  if (!this.user_info) return
  let app_number = await axios_get_app_list.call(this)
  update_active_app.call(this, app_number)
  this.init_status = true
  this.apps_property = await this.apis.get_apps_property()
}

async function axios_get_app_list(app_number) {
  this.all_loading = true
  this.app_list = await this.apis.get_apps()
  app_number = app_number || this.$route.params.app_number
  if (app_number) {
    jump_to_uri.call(this, '/apps/' + app_number, false)
    update_active_app.call(this, app_number)
  }
  this.all_loading = false
  return app_number
}


function mounted_select_active_router() {
  switch (this.$route.name) {
    case 'dashboard':
      this.is_welcome = true
      break
    case 'new_app':
      this.is_welcome = false
      this.is_new_app = true
      this.tmp_component = 'information'
      break
    default:
      this.is_welcome = false
  }
}

function update_active_app(app_number) {
  if (!app_number) return
  let active_index = this.app_list.findIndex(item => item.app_number === app_number)
  this.active_app = this.app_list[active_index] || {}
}

function jump_to_uri(uri, has_app_number) {
  this.tmp_component = 'information'
  this.nav_header_index = 0
  uri = has_app_number ? (uri + '/' + this.active_app.app_number) : uri
  if (uri === tmp_uri) return
  tmp_uri = uri
  this.$router.push(tmp_uri)
}
