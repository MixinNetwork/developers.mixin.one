---
title: Safe APIs
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespUser from "@site/docs/_partials/_resp.safe.me.md";
import RespEntry from "@site/docs/_partials/_resp.safe.entry.md";
import RespDeposits from "@site/docs/_partials/_resp.safe.deposits.md";
import RespOutputs from "@site/docs/_partials/_resp.safe.outputs.md";
import RespGhosts from "@site/docs/_partials/_resp.safe.ghosts.md";
import RespRequest from "@site/docs/_partials/_resp.safe.request.md";
import RespRequests from "@site/docs/_partials/_resp.safe.requests.md";
import RespSnapshots from "@site/docs/_partials/_resp.safe.snapshots.md";

# Mixin Sequencer API

最新的 Mixin 整体网络是以 Mixin Safe 为基础的，网络主要是 Mixin Kernel 和 Mixin Safe 两部分。为了方便使用，我们开发了 Mixin Sequencer 来索引排序 Kernel 的所有相关交易，所以产品上我们会说基于 Mixin Safe 的新网络，但是这里主要介绍基于 Mixin Sequencer 的 API。

基于最新的 Mixin Sequencer 服务的 API 与旧版本的 API 相比主要是更底层更去中心化，同时 API 也更简化了。这个 API 本质上所有操作都是在通过一个代理调用主网的 RPC 接口，这个代理的主要作用是方便查询用户与索引交易记录。

## 注册

使用新版本的 API 之前，所有用户，包括机器人，都需要在新 API 注册。只有注册之后才能使用后续的 API，而且无法给那些未注册的老用户发送转账等操作。

在使用最新的 Mixin Sequencer API 之前，需要确保用户或者机器人已经更新到了最新的 TIP 协议的 PIN 码格式。

### 检查是否注册

通过下面的 API 可以检查用户是不是注册了新的 Sequencer API

<APIEndpoint url="/safe/me" method="GET" />

<RespUser />

### 注册用户

不管是新用户，还是老用户，在新版本 API 面前都是一样的未注册用户，注册需要使用下面的 API

<APIEndpoint url="/safe/users" method="POST" />

<APIPayload>
{`{
  "public_key": "ED25519-PUBLIC-KEY-HEX",
  "signature": "ED25519-SIGNATURE-OF-USER-UUID-HEX",
  "pin_base64": "TIP-PIN-BASE64"
}`}
</APIPayload>

<RespUser />

每个用户都需要有一个自己的 ed25519 私钥，这个私钥可以是当前机器人或者用户的 session private key 相同的私钥，也可以生成一个新的。我们推荐生成一个新的私钥，这样方便权限分离。

相应的 PIN 的签名格式是 sha256.Sum256([]byte("SEQUENCER:REGISTER:" + USER-UUID + PUBLIC-KEY-HEX))。


## 获取充值地址

新版本的 API 可以给任意用户包括一个多签组获取充值地址，暂时一个用户或者一个多签组只能获取一个地址，重复获取得到的都是同一个地址。

<APIEndpoint url="/safe/deposit/entries" method="POST" />

<APIPayload>
{`{
  "members": ["UUID-USER-1", "UUID-USER-2"],
  "threshold": 1,
  "chain_id": "CHAIN-UUID"
}`}
</APIPayload>

<RespEntry />

## 充值中的交易

如果要获取正在充值确认中的交易可以通过下面的 API 获取，这个 API 是为了方便一些应用展示充值进度等方面的工作。

<APIEndpoint url="/safe/deposits?asset=UUID&destination=ADDRESS&tag=TAG&offset=RFC3339NANO&limit=500" method="GET" />

<RespDeposits />


## 获取 UTXO 列表

因为新版本 API 只是主网 RPC 的代理，所有操作都是基于 UTXO 的。一个用户，或者一个多签组，想要得到自己的资产情况，需要访问 UTXO 列表 API 得到所有的 UTXO 并且累加就是相关资产账户的余额。

<APIEndpoint url="/safe/outputs?members=HASH&threshold=NUMBER&offset=NUMBER&limit=NUMBER&state=unspent&order=ASC" method="GET" />

<RespOutputs />

这个 API 的 offset 不是使用的时间，是因为所有 UTXO 在 Mixin Sequencer 里都有一个唯一的数字序号 sequence，可以直接使用这个序号来排序更方便。


## 交易相关

新版本的交易只有一个 API，不管是普通的转账还是多签转账，甚至是提现等，统一都需要客户端自己生成 Mixin 主网兼容的交易并完成签名后，发送到主网。

不管交易发起方是一个普通用户还是多签组，首先通过 UTXO API 得到这个用户或者多签组的所有 UTXO，然后通过获取或者构造收款人的信息来得到一个完整的主网交易，最后发送到主网 RPC。

### 获取收款信息

如果是提现或者直接将资产转给一个 Mixin Kernel 地址，是不需要这一步的。只有想要将资产转给 Sequencer 的注册用户或者多签组时，需要通过这个 API 得到对方的一次性收款信息。


<APIEndpoint url="/safe/keys" method="POST" />

<APIPayload>
{`[{
  "receivers": ["USER-1-UUID", "USER-2-UUID"],
  "index": 3,
  "hint": "UNIQUE-UUID"
}]`}
</APIPayload>

<RespGhosts />


### 验证交易格式

不论收款人是不是 Sequencer 用户，在交易构造完成后，都需要将交易发送给 Sequencer 验证交易格式没有问题，那 Sequencer 会返回相应的 view key 签名。

<APIEndpoint url="/safe/transaction/requests" method="POST" />

<APIPayload>
{`[{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}]`}
</APIPayload>

<RespRequests />

成功返回的 views 数组就是完全按顺序对应的每个 input 的 view key 部分签名。需要注意的是这个 API 传入和返回的都是数组，这是为了方便批量验证交易。

### 签名发送交易

收到 Sequencer 的 view key 签名后，客户端可以使用自己的 ed25519 private key 进行第二步正式签名，签名的具体代码可以使用相关的 SDK 来操作。这时候整个交易才算完全构造完成，然后就可以通过下面的 API 发送出去。

<APIEndpoint url="/safe/transaction" method="POST" />

<APIPayload>
{`[{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}]`}
</APIPayload>

<RespRequests />

需要注意的是，这笔交易完全可以通过 Mixin Kernel 主网 RPC 直接发送，但是我们不推荐这样操作，因为如果直接发送后 Sequencer 无法正确索引这笔交易，就无法提供交易和 snapshot 查询服务。

### 查询交易

如果交易正确的通过 Sequencer API 发送出去之后，就可以通过 request UUID 来查询交易的状态。

<APIEndpoint url="/safe/transactions/:id" method="GET" />

<RespRequest />


## Snapshot 相关

新版本的 API 为了方便使用，提供一个相对兼容旧版本习惯的 snapshots API，这个 API 与旧版本 API 类似，只能获取单个用户的交易列表，包括这个用户所有的转入与转出。

如果请求这个 API 的认证信息是一个机器人，可以通过添加 app 参数来返回这个机器人创建的所有子用户的 snapshots。

<APIEndpoint url="/safe/snapshots?asset=UUID&app=UUID&opponent=UUID&offset=RFC3339NANO&limit=500" method="GET" />

<RespSnapshots />


## 注意事项

新版本 API 与旧版本 API 在请求与返回的数据格式上没有变化，包括认证的 JWT 与 OAuth 方式都没有变化。另外大部分旧的 API，只要与资产无关的，都依然是正常可用的，比如联系人、消息、群组等。

### MEMO 格式

新版本 API 里的所有 memo 或者 extra 字段现在都是统一的 HEX 编码的原始数据，也就是用户或者机器人传入的是啥就是啥，不再有 msgpack 或者 base64 等特殊的编码要求。

### 新的错误码

需要注意的就是一个新的错误码 10404，代表这个用户还没注册到最新的 API，这时推荐给用户发送提醒让他们尽快升级才能使用。

### 批量转账

因为新的 API 完全基于 Mixin Kernel 的主网交易格式，所以可以自由的组合使用 UTXO，比如想要同时对 100 个人转账，可以一次请求 100 个人的收款信息然后构造一个 transactin 即可完成。
