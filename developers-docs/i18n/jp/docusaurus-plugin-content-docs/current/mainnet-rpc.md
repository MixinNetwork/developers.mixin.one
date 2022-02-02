---
title: メインネットRPC
sidebar_position: 3
---

:::注意
最新のRPCの実装については、[Mixinのソース](https://github.com/MixinNetwork/mixin/blob/master/rpc/http.go)をご覧ください。
:::

## RPCリクエストの送信

MixinメインネットノードはRPC用のポートを公開しますので、それを使ってMixinメインネットノードとやりとりすることができます。

The default RPC port is the service port + 1000. For example, if the public port is `8001`, the RPC port is `9001`.
RPCポートのデフォルトは、サービスポート＋1000です。例えば、公開ポートが `8001` であれば、RPCポートは `9001` となります。

**RPCベース**

RPCベースは、`http://<node_host>:<rpc_port>/`で形成されます。例：`http://127.0.0.1:9001/`

**ペイロード**

| パラメータ | タイプ | 説明 |
| :----- | :----: | :---- |
| method | String | サポートされているメソッドは、以下のセクションを参照してください。 |
| params | Array | メソッドのパラメータ |


**利用例**

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"method":"getinfo","params":[],"id":1}' http://127.0.0.1:9001
```

## RPCメソッド

### getinfo

**params**:

```json
[]
```

**return**: 現在のノードの情報

### dumpgraphhead

**params**:

```json
[]
```

**return**: 現在のノードのグラフヘッド

### sendrawtransaction

**params**:

```json
[
  the hex format of transaction:string
]
```

**return**:

```json
{
  "hash": the hash of the transcation
}
```

### gettransaction

**params**:

```json
[
  the hash of the transaction:string
]
```

**return**:

```json
{
  the transaction
}
```

### getcachetransaction

**params**:

```json
[
  the hash of the transaction:string
]
```

**return**:

```json
{
  the transaction
}
```

### getutxo

**params**:

```json
[
  the hash of the utxo:string,
  the index:string formed uint64
]
```

**return**:

```json
{
  the utxo
}
```

### getsnapshot

**params**:

```json
[
  the hash of the snapshot:string,
]
```

**return**:

```json
{
  the snapshot
}
```

### listsnapshots

**params**:

```json
[
  offset:string formed uint64,
  count:string formed uint64,
  sig:string formed bool,
  tx:string formed bool,
]
```

**return**:

```json
{
  snapshots: [ the snapshot ... ],
}
```

### listmintworks

**params**:

```json
[
  offset:string formed uint64,
]
```

**return**:

```json
{
  node_hash_id: work,
  ...
}
```

### listmintdistributions

**params**:

```json
[
  offset:string formed uint64,
  count:string formed uint64,
  tx:string formed bool,
]
```

**return**:

```json
{
  mints: [ the mint ... ],
}
```

### listallnodes

**params**:

```json
[
  threshold:string formed uint64,
  state:string formed bool,
]
```

**return**:

```json
{
  nodes: [ the node ... ],
}
```

### getroundbynumber

**params**:

```json
[
  node:string formed uint64,
  number:string formed uint64,
]
```

**return**:

```json
{
  "node":       node,
  "hash":       hash,
  "start":      start,
  "end":        end,
  "number":     number,
  "references": references,
  "snapshots":  snapshots,
}
```

### getroundbyhash

**params**:

```json
[
  round_hash:string,
]
```

**return**:

```json
{
  "node":       node,
  "hash":       hash,
  "start":      start,
  "end":        end,
  "number":     number,
  "references": references,
  "snapshots":  snapshots,
}
```

### getroundlink

**params**:

```json
[
  from:string,
  to:string,
]
```

**return**:

```json
{
  "link": link,
}
```
