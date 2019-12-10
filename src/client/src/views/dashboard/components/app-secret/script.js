import forge from 'node-forge'
import TInput from '@/components/t-input'
import TModal from '@/components/t-modal'
export default {
    name: 'app-information',
    components: {
        TInput, TModal
    },
    props: ['active_app'],
    data() {
        return {
            new_secret: '',
            loading: false
        }
    },
    methods: {
        request_new_secret() {
            this.$confirm(this.$t('secret.secret_q'), '', {
                confirmButtonText: this.$t('button.ok'),
                cancelButtonText: this.$t('button.cancel'),
            })
                .then(_ => {
                    _request_new_secret.call(this)
                })
                .catch(_ => {
                    return
                })

        },
        request_new_session() {
            this.$confirm(this.$t('secret.session_q'), '', {
                confirmButtonText: this.$t('button.ok'),
                cancelButtonText: this.$t('button.cancel'),
            })
                .then(_ => {
                    _request_new_sseion.call(this)
                })
                .catch(_ => {
                    return
                })
        },
        click_copy_succuess() {
            this.$message.success(this.$t('message.success.copy'));
        },
        click_copy_error() {
            this.$message.error(this.$t('message.errors.copy'));
        },
        click_close_new_secret() {
            this.new_secret = ''
        }
    },
    mounted() {
        !(this.active_app.app_id || this.$route.params.app_number) && this.$router.push('/')
    },
}
let once_submit = false
function _request_new_secret() {
    if (once_submit) {
        this.$message.error(this.$t('message.errors.reset'));
        return
    }
    this.loading = true
    once_submit = true;
    this.$axios.post('/apps/' + this.active_app.app_id + '/secret').then(res => {
        this.$message.success(this.$t('message.success.reset'));
        this.new_secret = res.app_secret;
    }).finally(_ => { once_submit = false; this.loading = false })
}


function _request_new_sseion() {
    if (once_submit) {
        this.$message.error(this.$t('message.errors.reset'));
        return
    }
    let pin = _get_pin()
    let { session_secret, private_key } = _get_private_key()
    once_submit = true;
    this.loading = true;
    this.$axios.post('/apps/' + this.active_app.app_id + '/session', { pin, session_secret }).then(res => {
        this.$message.success(this.$t('message.success.reset'));
        let { session_id, pin_token } = res;
        _download_app_json(this.$refs.download_ssesion_json, pin, this.active_app.app_id, session_id, pin_token, private_key, this.active_app.app_number)
        window.localStorage.removeItem(this.active_app.app_id)

    }).finally(_ => { once_submit = false; this.loading = false })
}

function _download_app_json(dom, pin, client_id, session_id, pin_token, private_key, app_number) {
    let data = { pin, client_id, session_id, pin_token, private_key };
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, ' '));
    dom.setAttribute("href", dataStr)
    dom.setAttribute("download", `keystore-${app_number}.json`);
    dom.click();
}
function _get_private_key() {
    let keypair = forge.pki.rsa.generateKeyPair({ bits: 1024, e: 0x10001 });
    let body = forge.asn1.toDer(forge.pki.publicKeyToAsn1(keypair.publicKey)).getBytes();
    let session_secret = forge.util.encode64(body, 64);
    let private_key = forge.pki.privateKeyToPem(keypair.privateKey);
    return { session_secret, private_key }
}

function _get_pin() {
    let pin = ''
    for (let i = 0; i < 6; i++) {
        if (i) {
            _get_pin_num(9) + 1
        }
        pin += i ? _get_pin_num(9) + 1 : _get_pin_num(10)
    }
    return pin
}

function _get_pin_num(max) {
    return Math.floor(Math.random() * Math.floor(max));
}