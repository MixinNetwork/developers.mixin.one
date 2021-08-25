---
title: RSA To Ed25519 Migration
sidebar_position: 14
---

import Request from '../_partials/request'

The upgrade from RSA to Ed25519 mainly involves PIN encryption and API access signature. After the Ed25519 key is generated locally, the successful call of the `POST /session/secret` interface means the migration is successful. Note that the process is irreversible and cannot be rolled back from Ed25519 to RSA.

## POST /session/secret

| Parameter | Description |
| :----- | :---- |
| session_secret | Ed25519 public key in base64. |

<Request title="Add to share list" method="POST" url="/session/secret --data '{&quot;session_secret&quot;:&quot;AAAAC3NzaC1lZDI1NTE5AAAAIB8Ht8Z3j6yDWPBHQtOp/R9rjWvfMYo3MSA/K6q8D86r&quot;}'"/>


The response:

```json
{
  "data": [
  {
    "pin_token": "..."
  }
}
```