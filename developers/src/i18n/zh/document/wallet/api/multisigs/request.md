# 多签操作

在之前已经说过如何拿到多签的 outputs, 在拿到这些 outputs 之后就可以花费，多签有三种操作，分别是 `sign`, `cancel` 跟 `unlock`，注意事项:

- sign, unlock操作, 都需要先生成一个多签请求获得 request_id，然后再进行操作。
- sign 操作里，不能有已经 spent 的 output
- cancel 只能用来取消未签名的操作，相当于删除 request
- unlock 用来取消一个签名中的交易，例如 2/3 签的交易已经完成签名，则不能 unlock


整个多签的流程：

1. 转帐到多签帐号, 以 2/3 签为例, A, B, C 共同管理
2. 拿到相关资产的对应金额的 outputs, 需要少于 256, 如果需要的 outputs 太多，可以先进行一步合并 outputs 操作
3. A 创建多签 request, 并签名
4. B 创建多签 request, 并签名
5. 任何人发现 threshold >= 2 或者 signers 大于等于 2 人完成签名，发送交易

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
    $$XIN:multisig_body$$
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
    $$XIN:multisig_body$$
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
