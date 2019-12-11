export default {
    language: 'en',
    home: {
        title: 'DASHBOARD',
        new_app: 'New App',
        my_app: 'MY APPS',
        sign_out: 'Sign Out',
        welcome: 'WELCOME',
        welcome_d: 'Build any decentralized applications on Mixin',
        create_btn: 'CREATE',
        create_btn1: 'Create Your First App'
    },
    information: {
        title: 'Information',
        app_id: 'App ID',
        icon: 'Icon',
        icon_desc: 'At least 500*500 px PNG or JPG file. ',
        name: 'Name',
        name_desc: 'E.g. Mixin',
        name_desc1: '2-64 characters',
        home_url: 'Home URL',
        home_url_desc: 'E.g. https://mixin.one',
        oauth_url: 'OAuth URL',
        oauth_url_desc: 'E.g. https://mixin.one/auth',
        description: 'Description',
        description_desc: 'A short description of your app'
    },
    wallet: {
        title: 'Withdrawal',
        title1: 'Wallet',
        des_1: 'The deposit can only be made to your Mixin Messenger account.',
        des_2: 'Open Mixin Messenger > Search {app_number} to find this app > Deposit by transfer.',
        amount: '',
        mixin_id_placeholder: '',
        pin: '',
        update_token_desc: 'Update token to access your assets',
        update_token: 'Upload Token',
        private_key: 'Private Key'
    },
    secret: {
        title: 'Secret',
        secret_title: 'APP SECRET',
        secret_content: "If you are requesting the API from your secret server, it's recommended to use app secret.",
        secret_btn: 'Generate a new secret',
        secret_question: 'Do you want to reset secret?',
        session_title: 'APP SESSION',
        session_content: "Generate PIN, Session ID, PinToken, Private Key for this App.",
        session_btn: 'Generate a new session',
        session_question: 'Do you want to reset session?',
        des: 'Mixin server and the browser did not keep the information at all. If you forgot,you can generate a new one.',
    },
    button: {
        save: 'Save',
        cancel: 'Cancel',
        withdraw: 'Withdraw',
        update: 'UPDATE',
        copy: 'Copy',
        ok: 'OK'
    },
    message: {
        success: {
            withdraw: 'Withdrawal Success',
            save: 'Save Success',
            reset: 'Reset Success',
            copy: 'Copy Success'
        },
        errors: {
            0: "Network error.",
            401: 'Unauthorized, maybe invalid token.',
            403: "Access denied.",
            429: "Your requests exceed the rate limit, please try again later.",
            500: "Internal server error.",
            10001: "Internal server error.",
            10002: "Invalid data submitted.",
            20110: "Invalid phone number.",
            20112: "Invalid invitation code.",
            20113: "Invalid phone verification code.",
            20123: "Too many apps created, the maximum is 10.",
            20119: "PIN incorrect.",
            session_id_format: 'Session Id Format Error',
            pin_token_format: 'Pin Token Format Error',
            saving: 'Saving, please wait...',
            amount: 'Please enter the correct Amount',
            pin: 'Please enter the correct Pin',
            mixin_id: 'Please enter the correct Mixin ID',
            copy: 'Copy error',
            reset: 'Resetting, please wait...'
        },
        app: {
            secret_tips: 'Please generate from your computer, thank you'
        }
    }
}

