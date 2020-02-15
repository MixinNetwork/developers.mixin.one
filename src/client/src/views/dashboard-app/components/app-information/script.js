
import { _render_file_to_base64, _submit_to_database, _check_is_finished } from '@/assets/js/information'

export default {
    name: 'app-information',
    props: {
        active_app: {
            type: Object,
            default() {
                return {}
            }
        },
        is_new_app: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            can_save: false,
            new_app: true,
            icon_base64: '',
            app_name: '',
            tmp_resource_patterns: '',
            immersive_status: false,
        }
    },
    watch: {
        active_app(val) {
            this.icon_base64 = '';
            this.app_name = val.name
            this.tmp_resource_patterns = val.resource_patterns && val.resource_patterns.join('\n')
            this.immersive_status = val.capabilities && val.capabilities.includes('IMMERSIVE')
            this.check_is_finished.call(this)
        },
    },
    methods: {
        submit_to_database() {
            if (!this.can_save) return
            _submit_to_database.call(this, true)
        },
        getFile(event) {
            _render_file_to_base64.call(this, event.target.files[0])
        },
        check_is_finished() {
            if (this.app_name && this.active_app.home_uri && this.active_app.redirect_uri && this.active_app.description) {
                this.can_save = true;
            } else {
                this.can_save = false;
            }
        },
        click_copy_succuess() {
            this.$message.success(this.$t("message.success.copy"));
        },
        click_copy_error() {
            this.$message.error(this.$t("message.errors.copy"));
        }
    },
    mounted() {
        this.app_name = this.active_app.name
        this.tmp_resource_patterns = this.active_app.resource_patterns && this.active_app.resource_patterns.join('\n')
        this.immersive_status = this.active_app.capabilities && this.active_app.capabilities.includes('IMMERSIVE')
        this.icon_base64 = '';
        this.check_is_finished()
    },
}
