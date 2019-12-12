import MixinInput from '@/components/t-input'

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
            not_finished: true
        }
    },
    watch: {
        active_app(val) {
            this.icon_base64 = '';
            this.app_name = val.name
            _check_is_finished.call(this)
        }
    },
    methods: {
        submit_to_database() {
            if (this.not_finished) return
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
        this.app_name = this.active_app.name
        _check_is_finished.call(this)
    },
}

function _check_is_finished() {
    if (this.app_name && this.active_app.home_uri && this.active_app.redirect_uri && this.active_app.description) {
        this.not_finished = false;
    } else {
        this.not_finished = true;
    }
}

function _render_file_to_base64(file) {
    let reader = new FileReader();
    reader.addEventListener('load', event => this.icon_base64 = event.target.result, false)
    reader.readAsDataURL(file);
}

let once_submit = false

function _submit_to_database() {
    if (once_submit) {
        this.$message.error(this.$t('message.errors.saving'));
        return
    }
    let {app_id, capabilities, description, home_uri, redirect_uri} = this.active_app
    let name = this.app_name
    let parmas = {capabilities, description, home_uri, name, redirect_uri}
    parmas.icon_base64 = this.icon_base64.substring(22);
    once_submit = true;
    this.$emit('loading', true)
    let post_url = '/apps/' + app_id
    if (!app_id) {
        post_url = '/apps'
    }
    this.apis.set_app(app_id, parmas).then(res => {
        if (res.type === 'app') {
            this.$message.success(this.$t('message.success.save'))
            this.$emit('add_new_app', res.app_id)
        }
    }).finally(_ => {
        once_submit = false
        this.$emit('loading', false)
    })
}
