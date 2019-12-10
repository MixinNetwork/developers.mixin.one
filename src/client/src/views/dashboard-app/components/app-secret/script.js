import TInput from '@/components/t-input'
export default {
    name: 'app-information',
    components: {
        TInput
    },
    props: ['active_app'],
    data() {
        return {
            new_secret: ''
        }
    },
    methods: {
        tips_to_desktop() {
            this.$message.info(this.$t('message.app.secret_tips'))
        }
    },
    mounted() {
        !(this.active_app.app_id || this.$route.params.app_number) && this.$router.push('/')
    },
}