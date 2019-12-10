export default {
    language: 'zh',
    home: {
        title: '仪表盘',
        new_app: '新应用',
        my_app: '我的应用',
        sign_out: '登出',
        welcome: '欢迎',
        welcome_d: '仪表盘是精选的最新开发人员控制台',
        welcome_d1: '在 Mixin 上构建任何分布式应用程序',
        create_b: '创建',
        create_b1: '创建你的第一个应用'
    },
    information: {
        title: '信息',
        app_id: '应用 ID',
        icon: '图标',
        icon_d: '至少 500*500 像素 PNG 或 JPG 文件。 ',
        name: '名称',
        name_d: '例如：Mixin',
        name_d1: '2-64 字符',
        home_url: '首页网址',
        home_url_d: '例如：https://mixin.one',
        oauth_url: '验证网址',
        oauth_url_d: '例如：https://mixin.one/auth',
        description: '简介',
        description_d: '您的应用的简介'
    },
    wallet: {
        title: '钱包',
        title1: '钱包',
        des_1: '只能通过 Mixin Messenger 充值',
        des_2: '打开 Mixin Messenger > 搜索 7000100101 以找到此应用 > 通过转帐完成充值',
        amount: '数量',
        mixin_id_d: 'Mixin ID 或 Mixin 地址',
        pin: 'PIN',
        update_token_d: '更新令牌以访问您的资产',
        update_token: '更新令牌',
        private_key: '密钥'
    },
    secret: {
        title: '密钥',
        secret_t: '应用密钥',
        secret_p: "如果您从机密服务器请求 API，建议使用应用程序机密。",
        secret_b: '生成新的密钥',
        secret_q: '你想要重置密钥吗？',
        session_t: '应用会话',
        session_p: "为此应用程序生成 PIN，会话 ID，PinToken，私钥。",
        session_b: '生成新的会话',
        session_q: '你想要重置会话吗？',
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
            20123: "创建的应用太多，最多 10 个。",
            20119: "PIN 码不正确。",
            session_id_f: '会话 ID 格式错误',
            pin_token_f: ' Pin令牌格式错误',
            saving: '正在保存，请稍候...',
            amount: '请输入正确的金额',
            pin: '请输入正确的密码',
            mixin_id: '请输入正确的Mixin ID',
            copy: '复制错误',
            reset: '正在重置，请稍候...'
        },
        app: {
            secret_tips: '请从您的计算机生成，谢谢'
        }
    }
}

