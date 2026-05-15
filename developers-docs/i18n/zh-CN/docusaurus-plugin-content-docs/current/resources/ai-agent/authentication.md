---
title: 认证
sidebar_position: 2
---

# 认证

所有需要访问 Mixin API 的 Bot 都要使用 keystore。它是一个 JSON 文件，保存应用身份和签名请求所需的凭证。

## 第一步：创建应用

1. 打开 [developers.mixin.one](https://developers.mixin.one)，使用 Mixin Messenger 登录。
2. 点击 **New App**，填写应用名称并保存。
3. 进入 **密钥** → **会话密钥**，点击 **生成新的密钥**。
4. 立即下载生成的 keystore JSON 文件。

## 第二步：添加 spend key

下载的 keystore 通常不包含 `spend_private_key`。如果 Bot 需要执行 Safe 转账、提现等资产操作，需要在 **Secret** → **App Wallet** 中生成并复制 spend key，然后手动加入 keystore：

```json
{
  "app_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "session_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "server_public_key": "hex...",
  "session_private_key": "hex...",
  "spend_private_key": "hex..."
}
```

:::warning
`spend_private_key` 只会显示一次。它拥有转移 Bot 资产的权限，请妥善保存，不要提交到代码仓库或写入日志。
:::

将这个文件保存为 `keystore.json` 后，就可以运行示例或让 AI 助手基于它生成 Mixin 代码。
