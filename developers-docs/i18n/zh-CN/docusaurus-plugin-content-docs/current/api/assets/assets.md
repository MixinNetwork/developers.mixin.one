---
title: Read Asset List
sidebar_position: 1
---

import Request from '../../_partials/request'
import RespAssets from '../../_partials/_resp.assets.md'

## GET /assets

To obtain the asset list of a user, the `ASSETS:READ` permission is required.

<Request title="Get Assets" url="/assets"/>

<RespAssets />

:::info
This interface will only return a list of assets with a balance greater than 0, and an empty list will be returned when a user is new.
:::