---
title: Snapshots
description: Query Sequencer snapshots for users, bots, or sub-accounts.
---

import { APIEndpoint } from "@site/src/components/api";

import RespSnapshots from "@site/docs/_partials/_resp.safe.snapshots.md";

Use the snapshots endpoint to retrieve recent balance changes. When a bot authenticates the request
you can supply the `app` query parameter to aggregate activity across sub-users.

<APIEndpoint url="/safe/snapshots?app=UUID&asset=UUID&opponent=UUID&offset=RFC3339NANO&limit=500" method="GET" />

The `app`, `asset`, and `opponent` parameters are mutually exclusive.

<RespSnapshots />
