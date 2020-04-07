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
    create_btn1: '创建你的第一个应用',
    buy: {
      title: '购买 App',
      desc1: '您的免费额度已用完，请先购买',
      desc2: '注意：完成付款后，请尽快创建应用，否则可能会因为价格变化，无法创建。',
      btn: "买 {count} 个",
      btns: "买 {count} 个"
    }
  },
  information: {
    title: '信息',
    app_id: '应用 ID',
    icon: '图标',
    icon_desc: '至少 500 * 500 像素 PNG 或 JPG 文件。 ',
    name: '名称',
    name_desc: '例如：Mixin',
    name_desc1: '2-64 字符',
    home_url: '首页网址',
    home_url_desc: '例如：https://mixin.one',
    oauth_url: '验证网址',
    oauth_url_desc: '例如：https://mixin.one/auth',
    description: '简介',
    description_desc: '您的应用的简介, 最少 16 个字符, 最多 128 个字符',
    resource_patterns: '域名白名单',
    resource_patterns_desc: '您应用的域名白名单，按行划分，最多 10 个域名。',
    immersive: '沉浸式',
    errors: {
      no_app_name: '应用名称不能为空。',
      no_home_uri: '首页网址不能为空。',
      no_redirect_uri: '验证网站不能为空',
      no_description: '简介不能为空',
      app_name_length: '应用名称长度为 2 ~ 64',
      description_length: '简介的长度为 16 ~ 128',
    }
  },
  wallet: {
    title: '钱包',
    des_1: '通过 Mixin Messenger 充值',
    des_2: '打开 Mixin Messenger > 搜索 {app_number} 以找到此应用 > 通过转帐完成充值',
    amount: '数量',
    mixin_id_placeholder: '',
    pin: '',
    update_token_desc: '更新令牌以访问您的资产',
    update: '更新',
    update_token: '更新令牌',
    private_key: '密钥',
    snapshot_info: '快照',
    snapshot: {
      snapshot_id: '快照 ID',
      trace_id: '交易 ID',
      account: '帐户',
      amount: '数量',
      transaction_hash: '交易哈希'
    }
  },
  secret: {
    title: '密钥',
    secret_title: '应用密钥',
    secret_content: "如果您从机密服务器请求 API，建议使用应用程序密钥。",
    secret_btn: '生成新的密钥',
    secret_question: '确认重置密钥？',
    session_title: '应用 Session',
    session_content: "为此应用程序生成 PIN，Session ID，PinToken，私钥。",
    session_btn: '生成新的 Session',
    session_question: '确认重置Session ？',
    qrcode_title: 'QR 码',
    qrcode_content: "显示或重置此应用程序的 QR 码。",
    qrcode_btn1: '显示 QR 码',
    qrcode_btn2: '重置 QR 码',
    rotate_qrcode_question: '确认重置 QR 码？',
    des: '服务器和浏览器都不保存敏感信息。如果忘记，你可以生成一个新的。',
  },
  button: {
    save: '保存',
    cancel: '取消',
    withdrawal: '提现',
    update: '更新',
    copy: '复制',
    ok: '是的'
  },
  message: {
    success: {
      save: '保存成功',
      withdrawal: '提现成功',
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
      20112: "无效的邀请码。",
      20113: "无效的电话验证码。",
      20117: "余额不足。",
      20123: "创建的应用太多，最多 {count} 个。",
      20119: "PIN 码不正确。",
      20120: "转账金额太小。",
      session_id_format: '会话 ID 格式错误',
      pin_token_format: ' Pin 令牌格式错误',
      saving: '正在保存，请稍候...',
      amount: '请输入正确的金额',
      clip_img: '请检查图片文件...',
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

