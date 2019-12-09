
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
            this.app_name = this.$route.name === 'new_app' ? '' : this.active_app.name
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
        this.app_name = this.$route.name === 'new_app' ? '' : this.active_app.name
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

let tmp_commit_form = {}
let once_submit = false
function _submit_to_database() {
    if (once_submit) {
        this.$message.error('Submitting, please wait...')
        return
    }
    let { app_id, capabilities, description, home_uri, redirect_uri } = this.active_app
    let name = this.app_name
    let parmas = { capabilities, description, home_uri, name, redirect_uri }
    if (JSON.stringify(parmas) === JSON.stringify(tmp_commit_form)) {
        this.$message.error('Contents remain unchanged, please do not submit repeatedly');
        return;
    }
    parmas.icon_base64 = this.icon_base64.substring(22);
    tmp_commit_form = parmas;
    once_submit = true;
    let post_url = '/apps/' + app_id
    if (!app_id) {
        post_url = '/apps'
    }
    this.$axios.post(post_url, parmas).then(res => {
        if (res.type === 'app') {
            this.$message.success('Submitted successfully')
            this.$emit('add_new_app', res.app_id)
        }
    }).finally(_ => once_submit = false)
}