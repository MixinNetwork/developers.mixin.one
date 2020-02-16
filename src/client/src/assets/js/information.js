
function _render_file_to_base64(file) {
    let reader = new FileReader();
    reader.addEventListener('load', event => this.icon_base64 = event.target.result, false)
    reader.readAsDataURL(file);
}

let once_submit = false

function _submit_to_database() {
    if (once_submit) {
        this.$message.error({ message: this.$t('message.errors.saving'), showClose: true });
        return
    }
    let { app_id, capabilities, description, home_uri, redirect_uri } = this.active_app
    let name = this.app_name
    if (capabilities) {
        let index = capabilities.findIndex(item => item === 'IMMERSIVE')
        if (this.immersive_status) {
            index === -1 && capabilities.push('IMMERSIVE')
        } else {
            index !== -1 && capabilities.splice(index, 1)
        }
    } else {
        capabilities = ["CONTACT", "GROUP"]
        this.immersive_status && capabilities.push('IMMERSIVE')
    }
    let parmas = { capabilities, description, home_uri, name, redirect_uri }
    parmas.icon_base64 = this.icon_base64.substring(this.icon_base64.split('').findIndex(item => item === ',') + 1);

    parmas.resource_patterns = this.resource_patterns && this.resource_patterns.split('\n') || []
    once_submit = true;
    this.$emit('loading', true)
    this.apis.set_app(app_id, parmas).then(res => {
        if (res && res.type === 'app') {
            this.$message.success({ message: this.$t('message.success.save'), showClose: true })
            this.$emit('add_new_app', res.app_id)
            this.$store.dispatch('init_app', true)
        }
    }).finally(_ => {
        once_submit = false
        this.$emit('loading', false)
    })
}


function _check_is_finished() {

    if (this.app_name && this.active_app.home_uri && this.active_app.redirect_uri && this.active_app.description) {
        this.can_save = true;
    } else {
        this.can_save = false;
    }
}

export { _render_file_to_base64, _submit_to_database, _check_is_finished }