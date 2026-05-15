---
title: Quick Start
sidebar_position: 3
---

# Quick Start

This page does not ask you to memorize every Mixin SDK call. Instead, it shows how to let an AI coding assistant read `mixin-skills` and a runnable demo repository in a clean directory, then complete the first real action for you.

## Step 1: Prepare a workspace

Create a new directory and place your bot `keystore.json` inside it:

```bash
mkdir mixin-agent-playground
cd mixin-agent-playground
cp /path/to/keystore.json ./keystore.json
chmod 600 keystore.json
```

:::warning
Do not commit `keystore.json` to a repository, and do not let the AI assistant print the full keystore in its response. The `spend_private_key` can move assets from the bot.
:::

## Step 2: Give the task to AI

Open your AI coding assistant in this directory and send it this prompt:

```text
You are now in a clean Mixin development directory. The current directory contains keystore.json.

Download and read these two repositories in the current directory:

1. https://github.com/LixvYang/mixin-skills
2. https://github.com/LixvYang/mixin-ai-agent-demo

Requirements:

- First read mixin-skills/README.md and understand which skill applies to each task.
- Then read mixin-ai-agent-demo/README.md and the examples directory.
- Do not print the full keystore.json content, and do not commit the keystore to git.
- List which demo examples can run directly, such as 01-ping, 02-balance, and 03-send-message.
- Run the smallest validation command first to confirm the keystore works.
- Then complete one real action: send a Mixin message to this bot's creator.
- If the existing demo cannot directly discover the creator user_id, check whether client.user.profile() returns app.creator_id. If it does, use that value. If it does not, tell me which user_id I need to provide.
```

The assistant will usually start with commands like these:

```bash
git clone https://github.com/LixvYang/mixin-skills.git
git clone https://github.com/LixvYang/mixin-ai-agent-demo.git
cd mixin-ai-agent-demo
npm install
node examples/01-ping.mjs --config=../keystore.json
```

`01-ping` reads the keystore and requests the bot's own Mixin profile. If it succeeds, `app_id`, `session_id`, and `session_private_key` can sign API requests correctly.

## Step 3: Run the first action

Ask the assistant to find the message-sending example. In the current demo, it is usually:

```bash
node examples/03-send-message.mjs \
  --config=../keystore.json \
  --to=CREATOR_USER_ID \
  --text="Hello from my Mixin bot"
```

If the assistant can read `app.creator_id` from `client.user.profile()`, it can use that creator `user_id` as `--to`. If it cannot discover the creator automatically, provide your own Mixin `user_id` and let the assistant replace `CREATOR_USER_ID`.

## What you should see

After the command runs, you should receive a message from the bot in Mixin Messenger. This confirms three things:

1. The keystore works for API authentication.
2. The AI assistant can use `mixin-skills` to find the right Mixin development context.
3. The demo code can run locally and complete a real Mixin message send.

Next, ask the assistant to inspect `02-balance`, `04-echo-bot`, or `05-transfer` to validate Safe balance queries, the Blaze realtime message loop, and Safe transfers.
