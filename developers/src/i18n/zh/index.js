export default {
  language: 'zh',
  home: {
    title: 'Mixin 开发者',
    menus: ['公告', '案例', '文档', '后台'],
    main: {
      title: '在 Mixin 上构建任何分布式应用程序',
      info: [
        '<b>安全&nbsp;-&nbsp;</b>所有资产都安全的存储在 PoS-BFT-DAG 分布式网络中',
        '<b>高性能&nbsp;-&nbsp;</b>超过 1,000,000 TPS 的容量，数据最终确认小于 1 秒',
        '<b>隐私&nbsp;-&nbsp;</b>交易使用 CryptoNote 协议，聊天使用 Signal 协议',
        '<b>强大&nbsp;-&nbsp;</b>支持 32 条公链，例如 BTC，ETH，EOS，DASH，ZEC，XMR 等。',
        '<b>免费&nbsp;-&nbsp;</b>没有交易手续费。',
        '<b>便捷&nbsp;-&nbsp;</b>6 位数字密码轻松管理资产',
        '<b>多重签名&nbsp;-&nbsp;</b>适用于多人团队共同管理大额数字资产和 C2C 交易',
        '<b>开发友好&nbsp;-&nbsp;</b>标准 REST API 接口，用你熟悉的语言快速开发',
      ],
      button: ['开始使用', '开发者后台']
    },
    documentation: {
      title: "文档资料",
      left: [
        { title: '使用 Golang 快速入门', info: 'F1EX 是 Fox.ONE 的独立交换产品，具有较低的令牌发行成本，高性能，丰富的管理仪表板，多链支持和出色的生态系统。', button: '快速开始', href: '#' },
        { title: '使用 Golang 快速入门', info: 'F1EX 是 Fox.ONE 的独立交换产品，具有较低的令牌发行成本，高性能，丰富的管理仪表板，多链支持和出色的生态系统。', button: '快速开始', href: '#' },
      ],
      right: [
        { title: '快速开始', info: '如何工作？', href: '' },
        { title: '练习', info: '常见演练', href: '' },
        { title: '练习', info: 'API 和其他工具', href: '' },
        { title: '练习', info: 'API 和其他工具', href: '' },
      ],
      github: {
        view: "点此此处在 github 上查看",
        edit: "如需编辑，请点击这里"
      }
    },
    nextstep: {
      title: "下一步",
      left: [
        { info: '开始您的下一个项目，探索交互式教程，并管理您的帐户。', button: '前往开发者后台', href: '#' },
      ],
      right: [
        { title: '快速开始', info: '需要入门帮助吗？', href: '#' },
        { title: '练习', info: '要加入开发者小组吗？', href: '#' },
      ]
    },
    footer: {
      community: {
        title: "社区",
        list: {
          twitter: { name: 'Twitter', href: 'https://twitter.com/Mixin_Network' },
          github: { name: 'Github', href: 'https://github.com/MixinNetwork/developers.mixin.one' },
          facebook: { name: 'Facebook', href: 'https://fb.com/MixinMessenger' },
          youtube: { name: 'YouTube', href: 'https://www.youtube.com/channel/UCLWQ94gw7wRK-S5qy4LAVrA' },
          reddit: { name: 'Reddit', href: 'https://www.reddit.com/r/mixin' },
          telegram: { name: 'Telegram', href: 'https://t.me/MixinCommunity' }
        }
      },
      resources: {
        title: "资源",
        list: [
          { name: '媒体资源', href: 'https://mixin.one/assets/Mixin-Logo.zip' },
          { name: '白皮书', href: 'https://mixin.one/assets/Mixin-Draft-2018-07-01.pdf' }
        ]
      },
      others: {
        title: "其他",
        list: [
          { name: 'PRESS KIT', href: 'https://mixin.one/assets/Mixin-Logo.zip' },
          { name: 'WHITEPAPER', href: 'https://mixin.one/assets/Mixin-Draft-2018-07-01.pdf' },
          { name: 'API', href: 'https://developers.mixin.one/api' }
        ]
      }
    },
    button: {
      readmore: '阅读更多'
    },
  },
  search: {
    all: "全部",
    news: "最新资讯",
    cases: "用户案例",
    docs: "文档资料"
  },

  news: {
    title: "最新公告",
    route: "公告",
    list: [
      { title: '支持 MobileCoin 公链', filename: 'blockchain-mobilecoin', info: '', date: '2021/03/23', img: '' },
      { title: '支持 Polkadot 公链', filename: 'blockchain-polkadot', info: '', date: '2020/11/06', img: '' },
      { title: 'Mixin Messenger 机器人支持返回 currency 和 locale ', filename: 'messenger-currency-and-locale', info: '', date: '2020/04/29', img: '' },
      { title: 'Mixin Messenger 支持机器人置顶首页', filename: 'messenger-bottom-navigation', info: '', date: '2020/04/27', img: '' },
      { title: 'Blockchair 支持 Mixin Network', filename: 'network-explorer-blockchair', info: '', date: '2020/04/21', img: '' },
      { title: 'Mixin 支持 DGD 溶解计划', filename: 'dgd-dissolution', info: '', date: '2020/03/31', img: '' },
      { title: 'Mixin 多重签名支持已扩充至 6 种币', filename: 'network-multisig-box', info: '', date: '2020/03/31', img: '' },
      { title: '支持 Handshake 公链', filename: 'blockchain-handshake', info: '', date: '2020/03/23', img: '' },
      { title: '支持 Nervos 公链', filename: 'blockchain-nervos', info: '', date: '2020/03/19', img: '' },
      { title: '支持 VCash 公链', filename: 'blockchain-vcash', info: '', date: '2020/02/02', img: '' },
      { title: '支持 Grin 公链', filename: 'blockchain-grin', info: '', date: '2020/01/27', img: '' },
      { title: '支持 Ravencoin 公链', filename: 'blockchain-ravencoin', info: '', date: '2020/01/06', img: '' },
      { title: '加入 HackerOne 的 Bug 赏金计划', filename: 'hackerone', info: '', date: '2019/09/30', img: '' },
      { title: '提币手续费补贴活动', filename: 'withdrawal-sponsor', info: '', date: '2019/02/28', img: '' },
    ]
  },
  cases: {
    title: '用户案例',
    route: "案例",
    list: [
      {
        title: 'ETF 基金产品 - BOX',
        filename: 'etf-box',
        img: 'etf-box.png',
        date: '2020/4/30',
        info: 'BOX 是一个完全公开、透明的基金产品，由李笑来设计。<br/>BOX 的成分由三个标的构成，它们分别是 BTC、EOS 和 XIN。所以，第一个字母换成 B，最后一个字母换成 X，就成了 “BOX”。每一份 BOX 中，包含 0.0001 个 BTC、0.15 个 EOS 和 0.0008 个 XIN。<br/>BOX Token 是参与 BOX 投资的权益证明，它是一个 ERC20 Token，<a  href="/cases/etf-box">更多内容</a>'
      },
      {
        title: '点对点多签交易系统 - ExinLocal',
        filename: 'exin-local',
        img: 'exin-local.png',
        date: '2020/5/11',
        info: 'ExinLocal 是一个全球买卖加密货币的点对点市场，支持任意合法用户挂单，通过 Mixin Network 多签保障资金安全，交易是真正的点对点，支持任意的付款方式和法定货币。<a  href="/cases/exin-local">更多内容</a>'
      },
      {
        title: 'ExinOne C2C 币币交易系统',
        filename: 'exin-c2c',
        img: 'exin-c2c.png',
        date: '2020/5/15',
        info: 'ExinOne 致力于为全球用户提供安全的数字资产金融服务以及优质的用户体验。使用 ExinOne，用户可以在方便的进行交易及使用服务的同时确保资产 100% 由自己掌控，平台目前提供的主要功能包含法币 C2C、币币闪兑、定投、理财、借贷等。本文将着重介绍 C2C 部分的实现和交易流程。<a  href="/cases/exin-c2c">更多内容</a>'
      },
      {
        title: '比特币奖励平台 - 水龙头',
        filename: 'exin-earn',
        img: 'exin-earn.png',
        date: '2020/5/18',
        info: '水龙头 App 是第一个通过网购就能轻松获得比特币奖励的平台，目前已经接入淘宝、天猫、京东、拼多多、饿了么等电商平台，通过水龙头完成网购就能获得来自相应的电商平台的佣金，而我们会将这些佣金兑换成相应的比特币奖励给您。<a  href="/cases/exin-earn">更多内容</a>'
      },
      {
        title: 'W3c.Group 创作者社区通证系统',
        filename: 'w3c-group',
        img: 'w3c-group.png',
        date: '2020/05/01',
        info: 'W3C（Web3.0 Content Group）创作者社区，是以小组形式聚集各类主题的内容平台，是由多个小组组成的一个整体，努力方向是运用区块链特性促进小组成员间的协作。<a href="/cases/w3c-group">更多内容</a>'
      },
      {
        title: '公平可验证骰子游戏 - DICEOS',
        filename: 'diceos',
        img: 'diceos.png',
        date: '2020/5/27',
        info: 'Diceos 骰子游戏基于 Mixin 开发，现支持 BTC、EOS、BOX、XIN、ETH、DOGE 下注，界面美观、交互体验友好，游戏公平可验证。<a  href="/cases/diceos">更多内容</a>'
      },
      {
        title: '去中心化交易所 - Ocean ONE',
        filename: 'ocean-one',
        img: 'ocean-one.png',
        date: '2020/05/02',
        info: 'Ocean ONE 是基于 Mixin Network 构建的新一代去中心化交易所，这是第一个用户体验匹敌中心化交易所的去中心化交易所。<a href="/cases/ocean-one">更多内容</a>'
      },
      {
        title: '全币种钱包 - Web 版',
        filename: 'wallet-web',
        img: 'wallet-web.png',
        date: '2020/05/04',
        info: '基于 Mixin 提供的标准 REST API ，开发者很容易集成 Mixin 全币种钱包，并且向前兼容。本演示版完整的实现了一个 Web 版全币种钱包的所有功能 <a href="/cases/wallet-web">更多内容</a>'
      },
      {
        title: 'C2C 购物平台 - 安信购物',
        filename: 'flowin',
        img: 'flowin.png',
        date: '2020/05/12',
        info: '安信购物 https://flowin.xin 是基于 Mixin Messenger 构建的一个 C2C 购物平台。通过安信购物平台，用户可以方便地使用各种加密货币出售或者购买各种商品或服务。 <a href="/cases/flowin">更多内容</a>'
      },
      {
        title: '机器人托管服务 - 我信',
        filename: 'ohmy',
        img: 'ohmy.png',
        date: '2020/05/13',
        info: '我信 https://ohmy.xin 是基于 Mixin Messenger 建立的托管 Mixin 机器人的 SaaS 服务平台。通过我信平台，用户可以非常容易地上线一个具备各种功能的标准化 Mixin 机器人。 <a href="/cases/ohmy">更多内容</a>'
      },
    ]
  },
  documentation: [
    {
      name: "主网",
      path: "mainnet",
      router: "mainnet",
      child: [
        { name: "简介", path: "mainnet/overview", router: "mainnet/overview" },
        { name: "概念", child: [
          { name: "工作原理", path: "mainnet/concepts/how-it-works", router: "mainnet/concepts/how-it-works" },
          { name: "XIN", path: "mainnet/concepts/xin", router: "mainnet/concepts/xin" },
          { name: "全节点", path: "mainnet/concepts/full-node", router: "mainnet/concepts/full-node" },
          { name: "D3M-PIN", path: "mainnet/concepts/d3m-pin", router: "mainnet/concepts/d3m-pin" },
          { name: "多重签名", path: "mainnet/concepts/multisig", router: "mainnet/concepts/multisig" },
          { name: "公链", path: "mainnet/concepts/chain", router: "mainnet/concepts/chain" },
          { name: "价格", path: "mainnet/concepts/price", router: "mainnet/concepts/price" },
          /*
          { name: "DAG", path: "mainnet/concepts/dag", router: "mainnet/concepts/dag" },
          { name: "TEE", path: "mainnet/concepts/tee", router: "mainnet/concepts/tee" },
          */
        ]},
        { name: "MTG", child: [
          { name: "简介", path: "mainnet/mtg/overview", router: "mainnet/mtg/overview" },
          { name: "公链", path: "mainnet/mtg/chains", router: "mainnet/mtg/chains" },
          { name: "借贷", path: "mainnet/mtg/lend", router: "mainnet/mtg/lend" },
          { name: "交易所", path: "mainnet/mtg/exchange", router: "mainnet/mtg/exchange" },
          { name: "自动做市商", path: "mainnet/mtg/amm", router: "mainnet/mtg/amm" },
          { name: "稳定币发行", path: "mainnet/mtg/stablecoin", router: "mainnet/mtg/stablecoin" },
          { name: "跨链资产锚定", path: "mainnet/mtg/wappercoin", router: "mainnet/mtg/wappercoin" },
        ]},
        { name: "教程", child: [
          { name: "加入主网", path: "mainnet/tutorials/full-node-join", router: "mainnet/tutorials/full-node-join" },
          { name: "同步节点", path: "mainnet/tutorials/sync-full-node", router: "mainnet/tutorials/sync-full-node" },
          { name: "提交图标", path: "mainnet/tutorials/submit-asset-icon", router: "mainnet/tutorials/submit-asset-icon" },
        ]},
      ]
    },
    {
      name: "钱包",
      path: "wallet",
      router: "wallet",
      child: [
        { name: "简介", path: "wallet/overview", router: "wallet/overview" },
        {
          name: "开发教程", child: [
            { name: "新建钱包", path: "wallet/get-started/create-app", router: "wallet/get-started/create-app" },
            { name: "生成用户", path: "wallet/get-started/create-network-user", router: "wallet/get-started/create-network-user" },
            { name: "授权访问", path: "wallet/get-started/authentication-token", router: "wallet/get-started/authentication-token" },
            { name: "设置密码", path: "wallet/get-started/pin", router: "wallet/get-started/pin" },
            { name: "用户资产", path: "wallet/get-started/assets", router: "wallet/get-started/assets" },
            { name: "用户转账", path: "wallet/get-started/transfer", router: "wallet/get-started/transfer" },
            { name: "充值提现", path: "wallet/get-started/deposit-withdrawal", router: "wallet/get-started/deposit-withdrawal" },
          ]
        },
        {
          name: "开源案例", child: [
            { name: "OceanONE", path: "wallet/samples/oceanone", router: "wallet/samples/oceanone" },
            { name: "网页钱包", path: "wallet/samples/online-wallet", router: "wallet/samples/online-wallet" },
          ]
        },
        {
          name: "SDK", child: [
            { name: "简介", path: "wallet/sdk/overview", router: "wallet/sdk/overview" },
            { name: "Go", path: "wallet/sdk/go", router: "wallet/sdk/go" },
            { name: "Kotlin", path: "wallet/sdk/kotlin", router: "wallet/sdk/kotlin" },
            { name: "Node.js", path: "wallet/sdk/nodejs", router: "wallet/sdk/nodejs" },
            { name: "PHP", path: "wallet/sdk/php", router: "wallet/sdk/php" },
            { name: "Ruby", path: "wallet/sdk/ruby", router: "wallet/sdk/ruby" },
          ]
        },
        {
          name: "API", child: [
            { name: "简介", path: "wallet/api/overview", router: "wallet/api/overview" },
            { name: "注册用户", path: "wallet/api/user", router: "wallet/api/user" },
            { name: "密码", child: [
              { name: "修改密码", path: "wallet/api/pin-update", router: "wallet/api/pin-update" },
              { name: "验证密码", path: "wallet/api/pin-verify", router: "wallet/api/pin-verify" },
              { name: "密码错误日志", path: "wallet/api/logs", router: "wallet/api/logs" },
            ]},
            { name: "转账", child: [
              { name: "转账", path: "wallet/api/transfer", router: "wallet/api/transfer/transfer" },
              { name: "转账到主网", path: "wallet/api/transfer-to-mainnet", router: "wallet/api/transfer/transfer-to-mainnet" },
              { name: "转账记录", path: "wallet/api/snapshots", router: "wallet/api/transfer/snapshots" },
              { name: "转账详情", path: "wallet/api/snapshot", router: "wallet/api/transfer/snapshot" },
            ]},
            { name: "资产", child: [
              { name: "资产列表", path: "wallet/api/assets", router: "wallet/api/assets/assets" },
              { name: "资产详情", path: "wallet/api/asset", router: "wallet/api/assets/asset" },
              { name: "资产历史价格", path: "wallet/api/ticker", router: "wallet/api/assets/ticker" },
            ]},
            { name: "提现", child: [
              { name: "新增提现地址", path: "wallet/api/address-add", router: "wallet/api/withdrawal/address-add" },
              { name: "删除提现地址", path: "wallet/api/address-delete", router: "wallet/api/withdrawal/address-delete" },
              { name: "提现地址详情", path: "wallet/api/address", router: "wallet/api/withdrawal/address" },
              { name: "提现地址列表", path: "wallet/api/addresses", router: "wallet/api/withdrawal/addresses" },
              { name: "提现", path: "wallet/api/withdrawal", router: "wallet/api/withdrawal/withdrawal" },
              { name: "提现手续费", path: "wallet/api/fee", router: "wallet/api/withdrawal/fee" },
            ]},
            { name: "多重签名", child: [
              { name: "多签教程", path: "wallet/api/multisigs/tutorial", router: "wallet/api/multisigs/tutorial" },
              { name: "查询多签", path: "wallet/api/multisigs/outputs", router: "wallet/api/multisigs/outputs" },
              { name: "多签", path: "wallet/api/multisigs/request", router: "wallet/api/multisigs/request" },
            ]},
            { name: "公开数据", child: [
              { name: "公链", path: "wallet/api/network/chains", router: "wallet/api/network/chains" },
              { name: "全网转账", path: "wallet/api/network/snapshots", router: "wallet/api/network/snapshots" },
              { name: "转账详情", path: "wallet/api/network/snapshot", router: "wallet/api/network/snapshot" },
              { name: "一次性 keys", path: "wallet/api/network/keys", router: "wallet/api/network/keys" },
              { name: "全网充值", path: "wallet/api/network/pending-deposits", router: "wallet/api/network/pending-deposits" },
              { name: "热门资产", path: "wallet/api/network/assets-top", router: "wallet/api/network/assets-top" },
              { name: "多签资产", path: "wallet/api/network/assets-multisig", router: "wallet/api/network/assets-multisig" },
              { name: "资产详情", path: "wallet/api/network/asset", router: "wallet/api/network/asset" },
              { name: "资产搜索", path: "wallet/api/network/assets-search", router: "wallet/api/network/assets-search" },
              { name: "内部地址", path: "wallet/api/network/network", router: "wallet/api/network/network" },
            ]},
            { name: "实时汇率", path: "wallet/api/fiats", router: "wallet/api/fiats" },
            { name: "RSA 迁移", path: "wallet/api/session-secret", router: "wallet/api/session-secret" },
            { name: "错误码", path: "wallet/api/error-codes", router: "wallet/api/error-codes" },
          ]
        },
      ]
    },
    {
      name: "机器人",
      path: "bot",
      router: "bot",
      child: [
        { name: "简介", path: "bot/overview", router: "bot/overview" },
        {
          name: "开发教程", child: [
            { name: "新建机器人", path: "bot/getting-started/create", router: "bot/getting-started/create" },
            { name: "OAuth 授权", path: "bot/getting-started/oauth", router: "bot/getting-started/oauth" },
            { name: "访问用户数据", path: "bot/getting-started/api", router: "bot/getting-started/api" },
            { name: "Schema 唤起", path: "bot/getting-started/schema", router: "bot/getting-started/schema" },
            { name: "JS 容器交互", path: "bot/getting-started/js", router: "bot/getting-started/js" },
            { name: "收发消息", path: "bot/getting-started/websocket", router: "bot/getting-started/websocket" },
          ]
        },
        {
          name: "设计指南", child: [
            { name: "概述", path: "bot/design/overview", router: "bot/design/overview" },
            { name: "用户交互", path: "bot/design/user-interaction", router: "bot/design/user-interaction" },
            { name: "标题栏", path: "bot/design/title-bar", router: "bot/design/title-bar" },
            { name: "悬浮菜单", path: "bot/design/floating-menu", router: "bot/design/floating-menu" },
            { name: "颜色", path: "bot/design/color", router: "bot/design/color" },
            { name: "沉浸模式", path: "bot/design/immersive-mode", router: "bot/design/immersive-mode" },
            { name: "暗黑模式", path: "bot/design/dark-mode", router: "bot/design/dark-mode" },
            { name: "贴纸规范", path: "bot/design/sticker", router: "bot/design/sticker" },
          ]
        },
        {
          name: "开源案例", child: [
            { name: "DonateCafe", path: "bot/samples/donate-cafe", router: "bot/samples/donate-cafe" },
            { name: "PRSDigg", path: "bot/samples/prsdigg", router: "bot/samples/prsdigg" },
            { name: "Mixin 中文群", path: "bot/samples/super-group", router: "bot/samples/super-group" },
            { name: "Mixcoin", path: "bot/samples/mixcoin", router: "bot/samples/mixcoin" },
          ]
        },
        {
          name: "API", child: [
            { name: "个人信息", path: "bot/api/profile", router: "bot/api/profile" },
            { name: "用户", child: [
              { name: "获取用户信息", path: "bot/api/users/user", router: "bot/api/users/user" },
              { name: "批量获取用户", path: "bot/api/users/users", router: "bot/api/users/users" },
              { name: "关系", path: "bot/api/users/relationships", router: "bot/api/users/relationships" },
              { name: "搜索", path: "bot/api/users/search", router: "bot/api/users/search" },
              { name: "联系人", path: "bot/api/users/contacts", router: "bot/api/users/contacts" },
              { name: "屏蔽名单", path: "bot/api/users/blocking", router: "bot/api/users/blocking" },
            ]},
            { name: "会话", child: [
              { name: "创建", path: "bot/api/conversations/create", router: "bot/api/conversations/create" },
              { name: "读取", path: "bot/api/conversations/read", router: "bot/api/conversations/read" },
              { name: "更新", path: "bot/api/conversations/update", router: "bot/api/conversations/update" },
            ]},
            { name: "圈子", child: [
              { name: "创建圈子", path: "bot/api/circles/create", router: "bot/api/circles/create" },
              { name: "删除圈子", path: "bot/api/circles/delete", router: "bot/api/circles/delete" },
              { name: "修改圈子名称", path: "bot/api/circles/update", router: "bot/api/circles/update" },
              { name: "查询所有圈子", path: "bot/api/circles/list", router: "bot/api/circles/list" },
              { name: "查询圈子详情", path: "bot/api/circles/detail", router: "bot/api/circles/detail" },
              { name: "查询圈子会话", path: "bot/api/circles/circle-conversations", router: "bot/api/circles/circle-conversations" },
              { name: "设置用户圈子", path: "bot/api/circles/user-circles", router: "bot/api/circles/user-circles" },
              { name: "设置群组圈子", path: "bot/api/circles/group-circles", router: "bot/api/circles/group-circles" },
            ]},
            { name: "资产", child: [
              { name: "资产列表", path: "bot/api/assets/list", router: "bot/api/assets/list" },
              { name: "资产详情", path: "bot/api/assets/asset", router: "bot/api/assets/asset" },
              { name: "转账记录", path: "bot/api/assets/snapshots", router: "bot/api/assets/snapshots" },
              { name: "通过 id 获取转账详情", path: "bot/api/assets/snapshot", router: "bot/api/assets/snapshot" },
              { name: "通过 trace 获取转账详情", path: "bot/api/assets/trace", router: "bot/api/assets/trace" },
              { name: "手续费", path: "bot/api/assets/fee", router: "bot/api/assets/fee" },
            ]},
            { name: "消息", child: [
              { name: "类型", path: "bot/api/messages/category", router: "bot/api/messages/category" },
              { name: "上传附件", path: "bot/api/messages/attachment-upload", router: "bot/api/messages/attachment-upload" },
              { name: "下载附件", path: "bot/api/messages/attachment-download", router: "bot/api/messages/attachment-download" },
              { name: "批量发状态", path: "bot/api/messages/acknowledgements", router: "bot/api/messages/acknowledgements" },
              { name: "批量发消息", path: "bot/api/messages/send", router: "bot/api/messages/send" },
            ]},
            { name: "分享机器人", path: "bot/api/shared-apps", router: "bot/api/shared-apps" },
            { name: "错误码", path: "bot/api/error-codes", router: "bot/api/error-codes" },
          ]
        },
      ]
    },
    {
      name: "知识库",
      path: "knowledge",
      router: "knowledge",
      child: [
        { name: "词典", child: [
          { name: "加密货币", path: "knowledge/glossary/cryptocurrency", router: "knowledge/glossary/cryptocurrency" },
          { name: "挖矿", path: "knowledge/glossary/mining", router: "knowledge/glossary/mining" },
          { name: "交易所", path: "knowledge/glossary/exchange", router: "knowledge/glossary/exchange" },
          { name: "空投", path: "knowledge/glossary/airdrop", router: "knowledge/glossary/airdrop" },
          { name: "ICO", path: "knowledge/glossary/ico", router: "knowledge/glossary/ico" },
        ]},
        { name: "公链", child: [
          { name: "资产类", child: [
            { name: "比特币", path: "knowledge/chains/bitcoin", router: "knowledge/chains/bitcoin" },
            { name: "莱特币", path: "knowledge/chains/litecoin", router: "knowledge/chains/litecoin" },
            { name: "瑞波币", path: "knowledge/chains/ripple", router: "knowledge/chains/ripple" },
            { name: "比原链", path: "knowledge/chains/bytom", router: "knowledge/chains/bytom" },
            { name: "狗狗币", path: "knowledge/chains/dogecoin", router: "knowledge/chains/dogecoin" },
          ]},
          { name: "平台类", child: [
            { name: "以太坊", path: "knowledge/chains/ethereum", router: "knowledge/chains/ethereum" },
            { name: "EOS", path: "knowledge/chains/eos", router: "knowledge/chains/eos" },
            { name: "波卡", path: "knowledge/chains/polkadot", router: "knowledge/chains/polkadot" },
            { name: "波场", path: "knowledge/chains/tron", router: "knowledge/chains/tron" },
          ]},
          { name: "隐私类", child: [
            { name: "门罗币", path: "knowledge/chains/monero", router: "knowledge/chains/monero" },
            { name: "MobileCoin", path: "knowledge/chains/mobilecoin", router: "knowledge/chains/mobilecoin" },
            { name: "达世币", path: "knowledge/chains/dash", router: "knowledge/chains/dash" },
            { name: "大零币", path: "knowledge/chains/zcash", router: "knowledge/chains/zcash" },
            { name: "Horizen", path: "knowledge/chains/horizen", router: "knowledge/chains/horizen" },
            { name: "古灵币", path: "knowledge/chains/grin", router: "knowledge/chains/grin" },
          ]},
          { name: "Filecoin", path: "knowledge/chains/filecoin", router: "knowledge/chains/filecoin" },
        ]},
      ]
    }
  ],

  dashboard: {
    title: '开发者后台',
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
    category: '分类',
    category_list: {
      WALLET: '钱包',
      TRADING: '交易',
      BUSINESS: '商业',
      SOCIAL: '社交',
      SHOPPING: '购物',
      EDUCATION: '教育',
      NEWS: '新闻',
      TOOLS: '工具',
      GAMES: '游戏',
      BOOKS: '图书',
      MUSIC: '音乐',
      PHOTO: '照片',
      VIDEO: '视频',
      OTHER: '其他'
    },
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
    session_btn: 'RSA 私钥',
    session_ed25519_btn: 'Ed25519 私钥',
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
    ok: '是的',
    close: '关闭',
    download: '下载'
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
      404: "请求未找到",
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

