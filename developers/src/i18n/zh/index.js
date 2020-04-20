export default {
  language: 'zh',
  home: {
    title: 'Mixin 开发者',
    menus: ['最新消息', '用户案例', '文档', '开发者后台'],
    main: {
      title: '在 Mixin 上构建任何分布式应用程序',
      info: [
        '<b>快速&nbsp;-&nbsp;</b>超过 1,000,000 TPS 的容量，最终确认时间不到 1 秒。',
        '<b>开发人员友好&nbsp;-&nbsp;</b>标准 REST API 接口，支持任何语言。',
        '<b>强大&nbsp;-&nbsp;</b>支持 26 个区块链，例如BTC，ETH，XMR。',
        '<b>安全&nbsp;-&nbsp;</b>所有资产都存储在 PoS-BFT-DAG 分布式网络中',
        '<b>免费&nbsp;-&nbsp;</b>没有交易费。',
        '<b>隐私&nbsp;-&nbsp;</b>端到端加密消息。',
        '<b>多重签名&nbsp;-&nbsp;</b>大型资产的安全管理。',
        '<b>方便使用&nbsp;-&nbsp;</b>由 6 位 D3M-PIN 保护',
      ],
      button: ['开始使用', 'API 参考', '开发者后台']
    },
    documentation: {
      title: "文献资料",
      left: [
        { title: '使用 Golang 快速入门', info: 'F1EX 是 Fox.ONE 的独立交换产品，具有较低的令牌发行成本，高性能，丰富的管理仪表板，多链支持和出色的生态系统。', button: '快速开始', href: '#' },
        { title: '使用 Golang 快速入门', info: 'F1EX 是 Fox.ONE 的独立交换产品，具有较低的令牌发行成本，高性能，丰富的管理仪表板，多链支持和出色的生态系统。', button: '快速开始', href: '#' },
      ],
      right: [
        { title: '快速开始', info: '如何工作？', href: '' },
        { title: '练习', info: '常见演练', href: '' },
        { title: '练习', info: 'API 和其他工具', href: '' },
        { title: '练习', info: 'API 和其他工具', href: '' },
      ]
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
          twitter: { name: '推特', href: 'https://twitter.com/Mixin_Network' },
          github: { name: 'Github', href: 'https://github.com/MixinNetwork/developers.mixin.one' },
          facebook: { name: '脸书', href: 'https://fb.com/MixinMessenger' },
          youtube: { name: '油管', href: 'https://www.youtube.com/channel/UCLWQ94gw7wRK-S5qy4LAVrA' },
          reddit: { name: 'Reddit', href: 'https://www.reddit.com/r/mixin' },
          telegram: { name: '电报', href: 'https://t.me/MixinCommunity' }
        }
      },
      resources: {
        title: "资源",
        list: [
          { name: '新闻资料袋', href: 'https://mixin.one/assets/Mixin-Logo.zip' },
          { name: '白皮书', href: 'https://mixin.one/assets/Mixin-Draft-2018-07-01.pdf' },
          { name: 'API', href: 'https://developers.mixin.one/api' }
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

  news: {
    title: "最新消息",
    route: "Mixin 新闻",
    list: [
      { title: '所有 BCH 支持者都是傻逼', info: '什么是比特币现金?<br />这是一个比特币核心软件分支，没有进行任何技术改进，但有三个缺点：', date: '2020/3/14', img: '2020-3-14', },
      { title: '开发者激励', filename: '开发者激励', info: '如果没有开发人员， Mixin 不可能成功，这就是为什么我们要准备 10,000 XIN作为 2018 年开发人员的奖励。开发人员始终可以通过向任何人贡献代码或文档来帮助 Mixin。', date: '2019/12/10', img: '2019-12-10' },
      { title: 'Ubuntu WireGuard 安装程序', info: '现在我使用 WireGuard 来保护我的网络连接，服务器和客户端都运行 Ubuntu ，以相同的方式在两台计算机上安装并生成一对密钥。', date: '2019/10/25', img: '2019-10-25' },
      { title: '那些失落的岁月', info: '自上一篇博客文章发布以来已有5年了，如果我一直写博客该怎么办，那对我来说是一个巨大的财富，让我能够在这段时期内找到自己的想法。 我内心有一些重大变化，一个明显的变化是...', date: '2019/10/15', img: '2019-10-15' },
      { title: 'Google Cloud Storage 图片处理', info: 'Shou.TV 中有很多图像处理工作，尤其是视频流的快照。 我们计划使用 Google App Engine ，而不是构建自己的分布式图像服务，因为我们...', date: '2014/10/08', img: '2014-10-08' },
      { title: 'Node.js 零停机流程管理器和...', info: '作为经验丰富的 Rails 开发人员，我熟悉许多零停机机架服务器，它们非常易于部署，并且可以在每次新部署与平衡之间实现零停机。', date: '2014/10/08', img: '2014-09-07' },
      { title: 'Google Cloud Storage 图片处理', info: 'Shou.TV 中有很多图像处理工作，尤其是视频流的快照。 我们计划使用 Google App Engine ，而不是构建自己的分布式图像服务，因为我们...', date: '2014/10/08', img: '2014-10-08' },
      { title: 'Node.js 零停机流程管理器和...', info: '作为经验丰富的 Rails 开发人员，我熟悉许多零停机机架服务器，它们非常易于部署，并且可以在每次新部署与平衡之间实现零停机。', date: '2014/10/08', img: '2014-09-07' },
      { title: '所有 BCH 支持者都是傻逼', info: '什么是比特币现金?<br />这是一个比特币核心软件分支，没有进行任何技术改进，但有三个缺点：', date: '2020/3/14', img: '2020-3-14', },
      { title: '开发者激励', info: '如果没有开发人员， Mixin 不可能成功，这就是为什么我们要准备 10,000 XIN作为 2018 年开发人员的奖励。开发人员始终可以通过向任何人贡献代码或文档来帮助 Mixin。', date: '2019/12/10', img: '2019-12-10' }, { title: '所有 BCH 支持者都是傻逼', info: '什么是比特币现金?<br />这是一个比特币核心软件分支，没有进行任何技术改进，但有三个缺点：', date: '2020/3/14', img: '2020-3-14', },
      { title: '开发者激励', info: '如果没有开发人员， Mixin 不可能成功，这就是为什么我们要准备 10,000 XIN作为 2018 年开发人员的奖励。开发人员始终可以通过向任何人贡献代码或文档来帮助 Mixin。', date: '2019/12/10', img: '2019-12-10' },
      { title: 'Ubuntu WireGuard 安装程序', info: '现在我使用 WireGuard 来保护我的网络连接，服务器和客户端都运行 Ubuntu ，以相同的方式在两台计算机上安装并生成一对密钥。', date: '2019/10/25', img: '2019-10-25' },
      { title: 'Google Cloud Storage 图片处理', info: 'Shou.TV 中有很多图像处理工作，尤其是视频流的快照。 我们计划使用 Google App Engine ，而不是构建自己的分布式图像服务，因为我们...', date: '2014/10/08', img: '2014-10-08' },
      { title: 'Node.js 零停机流程管理器和...', info: '作为经验丰富的 Rails 开发人员，我熟悉许多零停机机架服务器，它们非常易于部署，并且可以在每次新部署与平衡之间实现零停机。', date: '2014/10/08', img: '2014-09-07' },
      { title: '所有 BCH 支持者都是傻逼', info: '什么是比特币现金?<br />这是一个比特币核心软件分支，没有进行任何技术改进，但有三个缺点：', date: '2020/3/14', img: '2020-3-14', },
      { title: '开发者激励', info: '如果没有开发人员， Mixin 不可能成功，这就是为什么我们要准备 10,000 XIN作为 2018 年开发人员的奖励。开发人员始终可以通过向任何人贡献代码或文档来帮助 Mixin。', date: '2019/12/10', img: '2019-12-10' }, { title: '那些失落的岁月', info: '自上一篇博客文章发布以来已有5年了，如果我一直写博客该怎么办，那对我来说是一个巨大的财富，让我能够在这段时期内找到自己的想法。 我内心有一些重大变化，一个明显的变化是...', date: '2019/10/15', img: '2019-10-15' },
      { title: 'Google Cloud Storage 图片处理', info: 'Shou.TV 中有很多图像处理工作，尤其是视频流的快照。 我们计划使用 Google App Engine ，而不是构建自己的分布式图像服务，因为我们...', date: '2014/10/08', img: '2014-10-08' },
      { title: 'Node.js 零停机流程管理器和...', info: '作为经验丰富的 Rails 开发人员，我熟悉许多零停机机架服务器，它们非常易于部署，并且可以在每次新部署与平衡之间实现零停机。', date: '2014/10/08', img: '2014-09-07' },
      { title: '所有 BCH 支持者都是傻逼', info: '什么是比特币现金?<br />这是一个比特币核心软件分支，没有进行任何技术改进，但有三个缺点：', date: '2020/3/14', img: '2020-3-14', },
      { title: '开发者激励', info: '如果没有开发人员， Mixin 不可能成功，这就是为什么我们要准备 10,000 XIN作为 2018 年开发人员的奖励。开发人员始终可以通过向任何人贡献代码或文档来帮助 Mixin。', date: '2019/12/10', img: '2019-12-10' }, { title: 'Google Cloud Storage 图片处理', info: 'Shou.TV 中有很多图像处理工作，尤其是视频流的快照。 我们计划使用 Google App Engine ，而不是构建自己的分布式图像服务，因为我们...', date: '2014/10/08', img: '2014-10-08' },
      { title: 'Node.js 零停机流程管理器和...', info: '作为经验丰富的 Rails 开发人员，我熟悉许多零停机机架服务器，它们非常易于部署，并且可以在每次新部署与平衡之间实现零停机。', date: '2014/10/08', img: '2014-09-07' },
      { title: 'Google Cloud Storage 图片处理', info: 'Shou.TV 中有很多图像处理工作，尤其是视频流的快照。 我们计划使用 Google App Engine ，而不是构建自己的分布式图像服务，因为我们...', date: '2014/10/08', img: '2014-10-08' },
      { title: 'Node.js 零停机流程管理器和...', info: '作为经验丰富的 Rails 开发人员，我熟悉许多零停机机架服务器，它们非常易于部署，并且可以在每次新部署与平衡之间实现零停机。', date: '2014/10/08', img: '2014-09-07' },
      { title: '所有 BCH 支持者都是傻逼', info: '什么是比特币现金?<br />这是一个比特币核心软件分支，没有进行任何技术改进，但有三个缺点：', date: '2020/3/14', img: '2020-3-14', },
      { title: 'Google Cloud Storage 图片处理', info: 'Shou.TV 中有很多图像处理工作，尤其是视频流的快照。 我们计划使用 Google App Engine ，而不是构建自己的分布式图像服务，因为我们...', date: '2014/10/08', img: '2014-10-08' },
      { title: 'Node.js 零停机流程管理器和...', info: '作为经验丰富的 Rails 开发人员，我熟悉许多零停机机架服务器，它们非常易于部署，并且可以在每次新部署与平衡之间实现零停机。', date: '2014/10/08', img: '2014-09-07' },
      { title: '所有 BCH 支持者都是傻逼', info: '什么是比特币现金?<br />这是一个比特币核心软件分支，没有进行任何技术改进，但有三个缺点：', date: '2020/3/14', img: '2020-3-14', },
      { title: '开发者激励', info: '如果没有开发人员， Mixin 不可能成功，这就是为什么我们要准备 10,000 XIN作为 2018 年开发人员的奖励。开发人员始终可以通过向任何人贡献代码或文档来帮助 Mixin。', date: '2019/12/10', img: '2019-12-10' }, { title: '开发者激励', info: '如果没有开发人员， Mixin 不可能成功，这就是为什么我们要准备 10,000 XIN作为 2018 年开发人员的奖励。开发人员始终可以通过向任何人贡献代码或文档来帮助 Mixin。', date: '2019/12/10', img: '2019-12-10' }, { title: '所有 BCH 支持者都是傻逼', info: '什么是比特币现金?<br />这是一个比特币核心软件分支，没有进行任何技术改进，但有三个缺点：', date: '2020/3/14', img: '2020-3-14', },
      { title: '开发者激励', info: '如果没有开发人员， Mixin 不可能成功，这就是为什么我们要准备 10,000 XIN作为 2018 年开发人员的奖励。开发人员始终可以通过向任何人贡献代码或文档来帮助 Mixin。', date: '2019/12/10', img: '2019-12-10' },
      { title: 'Ubuntu WireGuard 安装程序', info: '现在我使用 WireGuard 来保护我的网络连接，服务器和客户端都运行 Ubuntu ，以相同的方式在两台计算机上安装并生成一对密钥。', date: '2019/10/25', img: '2019-10-25' },
      { title: 'Google Cloud Storage 图片处理', info: 'Shou.TV 中有很多图像处理工作，尤其是视频流的快照。 我们计划使用 Google App Engine ，而不是构建自己的分布式图像服务，因为我们...', date: '2014/10/08', img: '2014-10-08' },
      { title: 'Node.js 零停机流程管理器和...', info: '作为经验丰富的 Rails 开发人员，我熟悉许多零停机机架服务器，它们非常易于部署，并且可以在每次新部署与平衡之间实现零停机。', date: '2014/10/08', img: '2014-09-07' },
      { title: '所有 BCH 支持者都是傻逼', info: '什么是比特币现金?<br />这是一个比特币核心软件分支，没有进行任何技术改进，但有三个缺点：', date: '2020/3/14', img: '2020-3-14', },
      { title: '开发者激励', info: '如果没有开发人员， Mixin 不可能成功，这就是为什么我们要准备 10,000 XIN作为 2018 年开发人员的奖励。开发人员始终可以通过向任何人贡献代码或文档来帮助 Mixin。', date: '2019/12/10', img: '2019-12-10' }, { title: '那些失落的岁月', info: '自上一篇博客文章发布以来已有5年了，如果我一直写博客该怎么办，那对我来说是一个巨大的财富，让我能够在这段时期内找到自己的想法。 我内心有一些重大变化，一个明显的变化是...', date: '2019/10/15', img: '2019-10-15' },
      { title: 'Google Cloud Storage 图片处理', info: 'Shou.TV 中有很多图像处理工作，尤其是视频流的快照。 我们计划使用 Google App Engine ，而不是构建自己的分布式图像服务，因为我们...', date: '2014/10/08', img: '2014-10-08' },
      { title: 'Node.js 零停机流程管理器和...', info: '作为经验丰富的 Rails 开发人员，我熟悉许多零停机机架服务器，它们非常易于部署，并且可以在每次新部署与平衡之间实现零停机。', date: '2014/10/08', img: '2014-09-07' },
      { title: '所有 BCH 支持者都是傻逼', info: '什么是比特币现金?<br />这是一个比特币核心软件分支，没有进行任何技术改进，但有三个缺点：', date: '2020/3/14', img: '2020-3-14', },
      { title: '开发者激励', info: '如果没有开发人员， Mixin 不可能成功，这就是为什么我们要准备 10,000 XIN作为 2018 年开发人员的奖励。开发人员始终可以通过向任何人贡献代码或文档来帮助 Mixin。', date: '2019/12/10', img: '2019-12-10' }, { title: 'Node.js 零停机流程管理器和...', info: '作为经验丰富的 Rails 开发人员，我熟悉许多零停机机架服务器，它们非常易于部署，并且可以在每次新部署与平衡之间实现零停机。', date: '2014/10/08', img: '2014-09-07' },
      { title: 'Google Cloud Storage 图片处理', info: 'Shou.TV 中有很多图像处理工作，尤其是视频流的快照。 我们计划使用 Google App Engine ，而不是构建自己的分布式图像服务，因为我们...', date: '2014/10/08', img: '2014-10-08' },
      { title: 'Node.js 零停机流程管理器和...', info: '作为经验丰富的 Rails 开发人员，我熟悉许多零停机机架服务器，它们非常易于部署，并且可以在每次新部署与平衡之间实现零停机。', date: '2014/10/08', img: '2014-09-07' },
      { title: '开发者激励', info: '如果没有开发人员， Mixin 不可能成功，这就是为什么我们要准备 10,000 XIN作为 2018 年开发人员的奖励。开发人员始终可以通过向任何人贡献代码或文档来帮助 Mixin。', date: '2019/12/10', img: '2019-12-10' },
      { title: 'Google Cloud Storage 图片处理', info: 'Shou.TV 中有很多图像处理工作，尤其是视频流的快照。 我们计划使用 Google App Engine ，而不是构建自己的分布式图像服务，因为我们...', date: '2014/10/08', img: '2014-10-08' },
      { title: 'Node.js 零停机流程管理器和...', info: '作为经验丰富的 Rails 开发人员，我熟悉许多零停机机架服务器，它们非常易于部署，并且可以在每次新部署与平衡之间实现零停机。', date: '2014/10/08', img: '2014-09-07' },
      { title: '所有 BCH 支持者都是傻逼', info: '什么是比特币现金?<br />这是一个比特币核心软件分支，没有进行任何技术改进，但有三个缺点：', date: '2020/3/14', img: '2020-3-14', },
      { title: '开发者激励', info: '如果没有开发人员， Mixin 不可能成功，这就是为什么我们要准备 10,000 XIN作为 2018 年开发人员的奖励。开发人员始终可以通过向任何人贡献代码或文档来帮助 Mixin。', date: '2019/12/10', img: '2019-12-10' }, { title: 'Ubuntu WireGuard 安装程序', info: '现在我使用 WireGuard 来保护我的网络连接，服务器和客户端都运行 Ubuntu ，以相同的方式在两台计算机上安装并生成一对密钥。', date: '2019/10/25', img: '2019-10-25' },
      { title: '那些失落的岁月', info: '自上一篇博客文章发布以来已有5年了，如果我一直写博客该怎么办，那对我来说是一个巨大的财富，让我能够在这段时期内找到自己的想法。 我内心有一些重大变化，一个明显的变化是...', date: '2019/10/15', img: '2019-10-15' },
      { title: 'Google Cloud Storage 图片处理', info: 'Shou.TV 中有很多图像处理工作，尤其是视频流的快照。 我们计划使用 Google App Engine ，而不是构建自己的分布式图像服务，因为我们...', date: '2014/10/08', img: '2014-10-08' },
      { title: 'Node.js 零停机流程管理器和...', info: '作为经验丰富的 Rails 开发人员，我熟悉许多零停机机架服务器，它们非常易于部署，并且可以在每次新部署与平衡之间实现零停机。', date: '2014/10/08', img: '2014-09-07' },
      { title: '所有 BCH 支持者都是傻逼', info: '什么是比特币现金?<br />这是一个比特币核心软件分支，没有进行任何技术改进，但有三个缺点：', date: '2020/3/14', img: '2020-3-14', },
      { title: '开发者激励', info: '如果没有开发人员， Mixin 不可能成功，这就是为什么我们要准备 10,000 XIN作为 2018 年开发人员的奖励。开发人员始终可以通过向任何人贡献代码或文档来帮助 Mixin。', date: '2019/12/10', img: '2019-12-10' }, { title: 'Google Cloud Storage 图片处理', info: 'Shou.TV 中有很多图像处理工作，尤其是视频流的快照。 我们计划使用 Google App Engine ，而不是构建自己的分布式图像服务，因为我们...', date: '2014/10/08', img: '2014-10-08' },
      { title: 'Node.js 零停机流程管理器和...', info: '作为经验丰富的 Rails 开发人员，我熟悉许多零停机机架服务器，它们非常易于部署，并且可以在每次新部署与平衡之间实现零停机。', date: '2014/10/08', img: '2014-09-07' },
      { title: '所有 BCH 支持者都是傻逼', info: '什么是比特币现金?<br />这是一个比特币核心软件分支，没有进行任何技术改进，但有三个缺点：', date: '2020/3/14', img: '2020-3-14', },
      { title: '开发者激励', info: '如果没有开发人员， Mixin 不可能成功，这就是为什么我们要准备 10,000 XIN作为 2018 年开发人员的奖励。开发人员始终可以通过向任何人贡献代码或文档来帮助 Mixin。', date: '2019/12/10', img: '2019-12-10' },
      { title: 'Google Cloud Storage 图片处理', info: 'Shou.TV 中有很多图像处理工作，尤其是视频流的快照。 我们计划使用 Google App Engine ，而不是构建自己的分布式图像服务，因为我们...', date: '2014/10/08', img: '2014-10-08' },
      { title: 'Node.js 零停机流程管理器和...', info: '作为经验丰富的 Rails 开发人员，我熟悉许多零停机机架服务器，它们非常易于部署，并且可以在每次新部署与平衡之间实现零停机。', date: '2014/10/08', img: '2014-09-07' },
      { title: '所有 BCH 支持者都是傻逼', info: '什么是比特币现金?<br />这是一个比特币核心软件分支，没有进行任何技术改进，但有三个缺点：', date: '2020/3/14', img: '2020-3-14', },
      { title: '开发者激励', info: '如果没有开发人员， Mixin 不可能成功，这就是为什么我们要准备 10,000 XIN作为 2018 年开发人员的奖励。开发人员始终可以通过向任何人贡献代码或文档来帮助 Mixin。', date: '2019/12/10', img: '2019-12-10' }, { title: 'Ubuntu WireGuard 安装程序', info: '现在我使用 WireGuard 来保护我的网络连接，服务器和客户端都运行 Ubuntu ，以相同的方式在两台计算机上安装并生成一对密钥。', date: '2019/10/25', img: '2019-10-25' },
      { title: '那些失落的岁月', info: '自上一篇博客文章发布以来已有5年了，如果我一直写博客该怎么办，那对我来说是一个巨大的财富，让我能够在这段时期内找到自己的想法。 我内心有一些重大变化，一个明显的变化是...', date: '2019/10/15', img: '2019-10-15' },
    ]
  },
  cases: {
    title: '用户案例',
    route: "用户案例",
    list: [
      { title: 'Blockin 钱包', date: '2020/3/14', info: '特征: 多币种：BTC，ETH，USDT Omni，USDT ERC20，BSV，DCR，DOGE，BCH，RVN，VCash，ZEC，DASH，LTC当前可用。将会继续支持更多货币。安全性：多重安全性验证可确保资产安全。方便和用户友好：高效的交易，公告和资产变更的实时通知可改善用户体验。<a  href="/cases/0">更多.</a>' },
      { title: 'F1EX 交易所', date: '2020/3/14', info: 'F1EX 是 Fox.ONE 的独立交换产品，具有较低的令牌发行成本，高性能，丰富的管理仪表板，多链支持和出色的生态系统。F1EX 专注于安全性和用户体验。 我们在安全机制和易于使用的界面之间取得平衡，从而为所有用户提供最佳功能。<a  href="/cases/1">更多.</a>' },
      { title: 'ETF 投资 - BOX', date: '2020/3/14', info: 'F1EX 是 Fox.ONE 的独立交换产品，具有较低的令牌发行成本，高性能，丰富的管理仪表板，多链支持和出色的生态系统。F1EX 专注于安全性和用户体验。 我们在安全机制和易于使用的界面之间取得平衡，从而为所有用户提供最佳功能。<a  href="/cases/2">更多.</a>' },
      { title: '多重签名', date: '2020/3/14', info: 'F1EX 是 Fox.ONE 的独立交换产品，具有较低的令牌发行成本，高性能，丰富的管理仪表板，多链支持和出色的生态系统。F1EX 专注于安全性和用户体验。 我们在安全机制和易于使用的界面之间取得平衡，从而为所有用户提供最佳功能。<a  href="/cases/3">更多.</a>' },
      { title: 'ExinLocal，全球的点对点市场', date: '2020/3/14', info: 'F1EX 是 Fox.ONE 的独立交换产品，具有较低的令牌发行成本，高性能，丰富的管理仪表板，多链支持和出色的生态系统。F1EX 专注于安全性和用户体验。 我们在安全机制和易于使用的界面之间取得平衡，从而为所有用户提供最佳功能。<a  href="/cases/4">更多.</a>' },
      { title: '商家接受加密货币', date: '2020/3/14', info: 'F1EX 是 Fox.ONE 的独立交换产品，具有较低的令牌发行成本，高性能，丰富的管理仪表板，多链支持和出色的生态系统。F1EX 专注于安全性和用户体验。 我们在安全机制和易于使用的界面之间取得平衡，从而为所有用户提供最佳功能。<a  href="/cases/5">更多.</a>' },
      { title: '即时加密信用额度', date: '2020/3/14', info: 'F1EX 是 Fox.ONE 的独立交换产品，具有较低的令牌发行成本，高性能，丰富的管理仪表板，多链支持和出色的生态系统。F1EX 专注于安全性和用户体验。 我们在安全机制和易于使用的界面之间取得平衡，从而为所有用户提供最佳功能。<a  href="/cases/6">更多.</a>' }
    ]
  },

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

