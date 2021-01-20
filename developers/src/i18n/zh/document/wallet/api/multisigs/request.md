# 多签

和上传文件类似，多签需要先生成一个多签请求获得 request_id，然后再发起多签操作。

### 生成多签请求
```
POST /multisigs/requests
```

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| action | String | 多签操作：签名 sign, 撤销多签 unlock |
| raw | String | 按照主网规范生成的交易，参考我们提供 go 和 js 的实现[代码](https://github.com/MixinNetwork/multisig-bot/tree/master/src/utils) |

```
$$XIN:curl$$ "https://api.mixin.one/multisigs/requests --data '{"action": "sign", "raw": "298281....4952f95768b7d1a925c4189b912c343dbb000180e"}'
```

```json
{  
  "data":{  
    "type":"multisig_request",
    "request_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "user_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":"10",
    "threshold":"2",
    "senders": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "receivers": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "signers": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "memo":"hello",
    "action":"sign",
    "state": "spent",
    "transaction_hash": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "raw_transaction": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "created_at":"2018-05-03T10:08:34.859542588Z",
    "code_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
  }
}
```

### 发起多签操作
```
POST /multisigs/requests/:id/:action
```
请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| action | String | 多签操作：签名 sign，取消签名 cancel, 撤销多签 unlock |
| pin | String | 加密后的 PIN |

```
$$XIN:curl$$ "https://api.mixin.one/multisigs/requests/:id/:action --data '{"pin": ""}'
```

```json
{  
  "data":{  
    "type":"multisig_request",
    "request_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "user_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":"10",
    "threshold":"2",
    "senders": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "receivers": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "signers": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "memo":"hello",
    "action":"sign",
    "state": "spent",
    "transaction_hash": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "raw_transaction": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "created_at":"2018-05-03T10:08:34.859542588Z",
    "code_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
  }
}
```

### 例子

- 发起或参与签名

  ```json
  // 生成多签请求
  POST /multisigs/requests
  {
    "action": "sign",
    "raw": "298281....000180e"
  }

  // 多签请求签名
  POST /multisigs/requests/:id/sign
  ```

- 取消我的签名

  ```json
  // 生成多签请求
  POST /multisigs/requests
  {
    "action": "sign",
    "raw": "298281....000180e"
  }

  // 发起多签取消请求
  POST /multisigs/requests/:id/cancel
  ```

- 撤销多签

  ```json
  // 生成多签请求
  POST /multisigs/requests
  {
    "action": "unlock",
    "raw": "298281....000180e"
  }

  // 发起多签解锁请求
  POST /multisigs/requests/:id/unlock
  ```
