
import tools from '@/assets/js/tools'
let once_submit = false
function _request_show_qrcode() {
    if (once_submit) {
        this.$message.error({ message: this.$t('message.errors.reset'), showClose: true });
        return
    }
    this.loading = true
    once_submit = true;
    let uid = this.active_app.app_id
    let { sid, privateKey } = JSON.parse(this.app_str)
    let token = _get_token({ sid, uid, privateKey }, 'GET', '/me', '')
    _vm._not_through_interceptor = true
    this.apis.app_show_qrcode(token).then(res => {
        if (!res) {
            window.localStorage.removeItem(uid)
            this.open_edit_modal = true
        }
        this.modal_title = 'QR Code'
        this.modal_content = res.code_url;
    }).finally(_ => {
        once_submit = false;
        this.loading = false
        _vm._not_through_interceptor = false
    })
}

function _request_rotate_qrcode() {
    if (once_submit) {
        this.$message.error({ message: this.$t('message.errors.reset'), showClose: true });
        return
    }
    this.loading = true
    once_submit = true;
    let uid = this.active_app.app_id
    let { sid, privateKey } = JSON.parse(this.app_str)
    let token = _get_token({ sid, uid, privateKey }, 'GET', '/me/code', '')
    _vm._not_through_interceptor = true
    this.apis.app_rotate_qrcode(token).then(res => {
        if (!res) {
            window.localStorage.removeItem(uid)
            this.open_edit_modal = true
        }
        this.$message.success({ message: this.$t('message.success.reset'), showClose: true });
        this.modal_title = 'QR Code'
        this.modal_content = res.code_url;
    }).finally(_ => {
        once_submit = false;
        this.loading = false
        _vm._not_through_interceptor = false
    })
}


function _request_new_secret() {
    if (once_submit) {
        this.$message.error({ message: this.$t('message.errors.reset'), showClose: true });
        return
    }
    this.loading = true
    once_submit = true;
    this.apis.app_new_secret(this.active_app.app_id).then(res => {
        this.$message.success({ message: this.$t('message.success.reset'), showClose: true });
        this.modal_title = 'App Secret'
        this.modal_content = res.app_secret;
    }).finally(_ => {
        once_submit = false;
        this.loading = false
    })
}

function _get_token({ sid, uid, privateKey }, method, url, body) {
    return tools.getJwtToken({ sid, uid, privateKey }, method, url, body)
}

export { _request_show_qrcode, _request_rotate_qrcode, _request_new_secret }