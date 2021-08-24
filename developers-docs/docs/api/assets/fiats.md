---
title: Read Fiat Exchange Rates
sidebar_position: 24
---

### `GET /fiats`

Returns a list of all fiat exchange rates based on US Dollar.

```bash
$$XIN:curl$$ "https://api.mixin.one/fiats"
```

```json
{
  "data": [
    { "code": "ISK", "rate": 121.13998 },
    { "code": "CNY", "rate": 6.9669 },
    ...
  ]
}
```