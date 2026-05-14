---
title: 快速开始
sidebar_position: 2
---

# 快速开始

这一页不是让你手动记住所有 Mixin SDK 调用，而是让 AI 助手在一个干净目录里读取 `mixin-skills` 和可运行 demo，然后帮你完成第一个真实动作。

## 第一步：准备工作目录

新建一个目录，并把 Bot 的 `keystore.json` 放进去：

```bash
mkdir mixin-agent-playground
cd mixin-agent-playground
cp /path/to/keystore.json ./keystore.json
chmod 600 keystore.json
```

:::warning
不要把 `keystore.json` 提交到代码仓库，也不要让 AI 在回复里打印完整 keystore。尤其是 `spend_private_key`，它拥有转移 Bot 资产的权限。
:::

## 第二步：把任务交给 AI

在这个目录里打开你的 AI 编程助手，把下面这段话发给它：

```text
你现在位于一个干净的 Mixin 开发目录，当前目录里有 keystore.json。

请在当前目录下载并阅读这两个代码库：

1. https://github.com/LixvYang/mixin-skills
2. https://github.com/LixvYang/mixin-ai-agent-demo

要求：

- 先阅读 mixin-skills/README.md，理解每个 skill 适合什么场景。
- 再阅读 mixin-ai-agent-demo/README.md 和 examples 目录。
- 不要打印 keystore.json 的完整内容，不要把 keystore 提交到 git。
- 列出 demo 里有哪些可以直接运行的示例，例如 01-ping、02-balance、03-send-message。
- 先运行最小验证命令，确认 keystore 可用。
- 然后帮我完成一个真实动作：给这个 Bot 的创建者发送一条 Mixin 消息。
- 如果现有 demo 不能直接获取创建者 user_id，请先检查 client.user.profile() 的返回值里是否有 app.creator_id；如果有，就使用它。如果没有，请告诉我需要提供哪个 user_id。
```

AI 通常会先执行类似下面的命令：

```bash
git clone https://github.com/LixvYang/mixin-skills.git
git clone https://github.com/LixvYang/mixin-ai-agent-demo.git
cd mixin-ai-agent-demo
npm install
node examples/01-ping.mjs --config=../keystore.json
```

`01-ping` 会读取 keystore，并请求 Bot 自己的 Mixin profile。这个步骤通过后，说明 `app_id`、`session_id`、`session_private_key` 可以正常签名请求。

## 第三步：运行第一个动作

让 AI 找到发送消息的示例。当前 demo 中通常是：

```bash
node examples/03-send-message.mjs \
  --config=../keystore.json \
  --to=CREATOR_USER_ID \
  --text="Hello from my Mixin bot"
```

如果 AI 能从 `client.user.profile()` 里读取到 `app.creator_id`，它可以直接用创建者的 `user_id` 作为 `--to`。如果不能自动获取，就把你的 Mixin `user_id` 提供给 AI，让它代入 `CREATOR_USER_ID`。

## 你应该看到什么

完成后，你应该在 Mixin Messenger 里收到 Bot 发来的消息。这个说明三件事已经跑通：

1. keystore 可以用于 API 认证。
2. AI 已经能根据 `mixin-skills` 找到正确的开发上下文。
3. demo 代码可以在你的本地目录里运行，并完成真实的 Mixin 消息发送。

下一步可以继续让 AI 查看 `02-balance`、`04-echo-bot` 或 `05-transfer`，分别验证 Safe 余额查询、Blaze 实时消息循环和 Safe 转账。
