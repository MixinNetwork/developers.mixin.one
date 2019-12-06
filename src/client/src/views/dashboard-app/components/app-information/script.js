export default {
    name: 'app-information',
    props: ['active_app', 'is_new_app'],
    data() {
        return {
            can_save: true,
            new_app: true,
            icon_base64: '',
            app_name: ''
        }
    },
    watch: {
        active_app(val) {
            this.app_name = val.name
        }
    },
    methods: {
        submit_to_database() {
            _submit_to_database.call(this)
        },
        getFile(event) {
            _render_file_to_base64.call(this, event.target.files[0])
        }
    },
    mounted() {
        this.app_name = this.active_app.name
    },
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
    let { app_id, capabilities, description, home_uri, name, redirect_uri } = this.active_app
    name = this.app_name
    let parmas = { capabilities, description, home_uri, name, redirect_uri }
    if (JSON.stringify(parmas) === JSON.stringify(tmp_commit_form)) {
        this.$message.error('Contents remain unchanged, please do not submit repeatedly');
        return;
    }
    parmas.icon_base64 = this.icon_base64.substring(this.icon_base64.split('').findIndex(item => item === ',') + 1);
    tmp_commit_form = parmas;
    once_submit = true;
    let post_url = '/apps/' + app_id
    if (!app_id) {
        post_url = '/apps'
    }
    this.$emit('loading', true)
    this.$axios.post(post_url, parmas)
        .then(res => {
            if (res.type === 'app') {
                this.$message.success('Submitted successfully')
                this.$emit('add_new_app', res.app_id)
                this.$store.dispatch('init_app', true).then(_ => {
                    this.$store.commit('change_state', { can_transition: true });
                    this.$router.push('/')
                })
            }
        })
        .catch(err => {
            let error = err.response.data.error
            this.$message.error(`${error.code}: ${error.description}`)
        })
        .finally(_ => {
            once_submit = false;
            this.$emit('loading', false)
        })
}