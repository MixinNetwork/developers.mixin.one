---
title: 主网 RPC 接口
sidebar_position: 3
---

:::info
最新的 RPC 实现参见 [Mixin 的源码](https://github.com/MixinNetwork/mixin/blob/master/rpc/http.go)。
:::


## 发送 RPC 请求

Mixin 主网节点会公开一个用于 RPC 的端口，您可以使用它来与 Mixin 主网节点进行交互。

默认的RPC端口为服务端口+1000。例如，如果公共端口为`8001`，则RPC端口为`9001`。

**RPC Base**

RPC API Base 由 `http://<node_host>:<rpc_port>/` 构成。 例如，`http://127.0.0.1:9001/`。

**请求体**

| 参数 | 类型 | 描述 |
| :----- | :----: | :---- |
| method | String | 支持的 PRC 方法，请参阅下面的部分  |
| params | Array | PRC 方法的参数  |


**例子**

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"method":"getinfo","params":[],"id":1}' http://127.0.0.1:9001
```

## RPC 方法

### getinfo

**params**:

```json
[]
```

**return**: the information of current node

### dumpgraphhead

**params**:

```json
[]
```

**return**: the graph head of current node

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
