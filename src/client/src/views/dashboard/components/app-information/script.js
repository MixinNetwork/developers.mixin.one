import MixinInput from '@/components/t-input'
import { _render_file_to_base64, _submit_to_database, _check_is_finished } from '@/assets/js/information'

export default {
    name: 'app-information',
    components: {
        MixinInput
    },
    props: ['active_app'],
    data() {
        return {
            icon_base64: '',
            can_save: false,
        }
    },
    computed: {
        app_name: {
            get() {
                return this.$store.state.app_name
            },
            set(val) {
                this.$store.commit('change_state', { app_name: val })
            }
        },
        resource_patterns: {
            get() {
                return this.$store.state.resource_patterns
            },
            set(val) {
                this.$store.commit('change_state', { resource_patterns: val })
            }
        },
        immersive_status: {
            get() {
                return this.$store.state.immersive_status
            },
            set(val) {
                this.$store.commit('change_state', { immersive_status: val })
            }
        }
    },
    watch: {
        active_app(val) {
            this.init_app(val)
        }
    },
    methods: {
        submit_to_database() {
            if (!this.can_save) return
            _submit_to_database.call(this)
        },
        getFile(event) {
            _render_file_to_base64.call(this, event.target.files[0])
        },
        check_is_finished() {
            _check_is_finished.call(this)
        },
        init_app(app) {
            this.icon_base64 = '';
            let { name, resource_patterns, capabilities } = app
            if (name) this.app_name = name
            if (resource_patterns) this.resource_patterns = resource_patterns && resource_patterns.join('\n')
            if (capabilities) this.immersive_status = capabilities && capabilities.includes('IMMERSIVE')
            _check_is_finished.call(this)
        }
    },
    mounted() {
        this.init_app(this.active_app)
    }
}
