---
title: 快照
description: 查询 Sequencer 中用户、机器人或子账号的快照记录。
---

import { APIEndpoint } from "@site/src/components/api";

import RespSnapshots from "@site/docs/_partials/_resp.safe.snapshots.md";

使用快照接口可以获取最近的余额变动。当请求由机器人发起时，可以提供 `app` 查询参数，将子用户的活动聚合在一起。

<APIEndpoint url="/safe/snapshots?app=UUID&asset=UUID&opponent=UUID&offset=RFC3339NANO&limit=500" method="GET" />

`app`、`asset` 与 `opponent` 参数互斥不可同时出现。

<RespSnapshots />
