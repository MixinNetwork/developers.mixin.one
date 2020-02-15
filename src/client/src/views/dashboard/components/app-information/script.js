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
            app_name: '',
            can_save: false,
            tmp_resource_patterns: '',
            immersive_status: false
        }
    },
    watch: {
        active_app(val) {
            this.icon_base64 = '';
            this.app_name = val.name
            this.tmp_resource_patterns = val.resource_patterns && val.resource_patterns.join('\n')
            this.immersive_status = val.capabilities && val.capabilities.includes('IMMERSIVE')
            _check_is_finished.call(this)
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
        }
    },
    mounted() {
        let { name, resource_patterns, capabilities } = this.active_app
        this.app_name = name
        this.tmp_resource_patterns = resource_patterns && resource_patterns.join('\n')
        this.immersive_status = capabilities && capabilities.includes('IMMERSIVE')
        _check_is_finished.call(this)
    },
}
