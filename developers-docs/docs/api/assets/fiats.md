---
title: Read Fiat Exchange Rates
sidebar_position: 24
---

import Request from '../../_partials/request'

## GET /fiats

Returns a list of all fiat exchange rates based on US Dollar.

<Request title="Get Fiats Rate" url="/fiats"/>

```json title="Response"
{
  "data": [
    { "code": "ISK", "rate": 121.13998 },
    { "code": "CNY", "rate": 6.9669 },
    ...
  ]
}
```