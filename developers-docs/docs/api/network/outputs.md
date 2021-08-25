---
title: Read Outputs
sidebar_position: 24
---

import Request from '../../_partials/request'

## POST /outputs

Get one-time user keys.

| Parameter | Type | Description |
| :----- | :----: | :---- |
| receivers | String Array | A array of user id. |
| index | Integer | Output index. |
| hint | String | Unique ghosts generated for users. |

<Request title="Read outputs" isPublic url="/outputs" />

```json title="Response"
{
  "data":{
    "type": "ghost_key",
    "mask": "ab56be4cxxxx244f9a433f35",
    "keys": ["ab56be4cxxxx244f9a433f35"],
  }
}
```
