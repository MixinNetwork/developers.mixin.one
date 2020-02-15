export default {
    language: 'zh',
    home: {
        title: '仪表盘',
        new_app: '新应用',
        my_app: '我的应用',
        sign_out: '登出',
        welcome: '欢迎',
        welcome_d: '在 Mixin 上构建任何分布式应用程序',
        create_btn: '创建',
        create_btn1: '创建你的第一个应用'
    },
    information: {
        title: '信息',
        app_id: '应用 ID',
        icon: '图标',
        icon_desc: '至少 500*500 像素 PNG 或 JPG 文件。 ',
        name: '名称',
        name_desc: '例如：Mixin',
        name_desc1: '2-64 字符',
        home_url: '首页网址',
        home_url_desc: '例如：https://mixin.one',
        oauth_url: '验证网址',
        oauth_url_desc: '例如：https://mixin.one/auth',
        description: '简介',
        description_desc: '您的应用的简介',
        resource_patterns: '资源模式',
        resource_patterns_desc: '您应用的资源模式，按行划分，最多 10 个项目。',
        immersive: '沉浸式'
    },
    wallet: {
        title: '钱包',
        des_1: '只能通过 Mixin Messenger 充值',
        des_2: '打开 Mixin Messenger > 搜索 {app_number} 以找到此应用 > 通过转帐完成充值',
        amount: '数量',
        mixin_id_placeholder: '',
        pin: '',
        update_token_desc: '更新令牌以访问您的资产',
        update: '更新',
        update_token: '更新令牌',
        private_key: '密钥'
    },
    secret: {
        title: '密钥',
        secret_title: '应用密钥',
        secret_content: "如果您从机密服务器请求 API，建议使用应用程序机密。",
        secret_btn: '生成新的密钥',
        secret_question: '你想要重置密钥吗？',
        session_title: '应用会话',
        session_content: "为此应用程序生成 PIN，会话 ID，PinToken，私钥。",
        session_btn: '生成新的会话',
        session_question: '你想要重置会话吗？',
        qrcode_title: 'QR 码',
        qrcode_content: "显示或重置此应用程序的QR码。",
        qrcode_btn1: '显示 QR 码',
        qrcode_btn2: '重置 QR 码',
        rotate_qrcode_question: '你想要重置 QR 码吗？',
        des: 'Mixin 服务器和浏览器不保存敏感信息。如果忘记，你可以生成一个新的。',
    },
    button: {
        save: '保存',
        cancel: '取消',
        withdraw: '提现',
        update: '更新',
        copy: '复制',
        ok: '是的'
    },
    message: {
        success: {
            save: '保存成功',
            withdraw: '提现成功',
            reset: '重置成功',
            copy: '复制成功'
        },
        errors: {
            0: "网络错误。",
            401: '请求未经授权，可能是无效的令牌。',
            403: "拒绝访问。",
            429: "您的请求超出了速率限制，请稍后重试。",
            500: "服务器内部错误。",
            10001: "服务器内部错误。",
            10002: "提交的数据无效。",
            20110: "无效的电话号码。",
            20112: "邀请码无效。",
            20113: "无效的电话验证码。",
            20123: "创建的应用太多，最多 2 个。",
            20119: "PIN 码不正确。",
            session_id_format: '会话 ID 格式错误',
            pin_token_format: ' Pin 令牌格式错误',
            saving: '正在保存，请稍候...',
            amount: '请输入正确的金额',
            pin: '请输入正确的密码',
            mixin_id: '请输入正确的 Mixin ID',
            copy: '复制错误',
            reset: '正在重置，请稍候...',
            overtime: '请求失败，请检查网络...'
        },
        app: {
            secret_tips: '请从您的计算机生成，谢谢'
        }
    }
}

