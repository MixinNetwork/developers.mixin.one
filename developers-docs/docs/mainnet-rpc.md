---
title: Mainnet RPC
sidebar_position: 3
---

:::info
For latest RPC implementation, see [Mixin's source](https://github.com/MixinNetwork/mixin/blob/master/rpc/http.go).
:::

## Send RPC Request

Mixin Mainnet Node will public a port for RPC, you can use it to interact with Mixin Mainnet Node.

The default RPC port is the service port + 1000. For example, if the public port is `8001`, the RPC port is `9001`.

**RPC Base**

The RPC base is formed by `http://<node_host>:<rpc_port>/`. For example, `http://127.0.0.1:9001/`.

If you don't want to launch your own Mixin Kernel node, we have a public available RPC node `https://rpc.mixin.dev`.

**Payload**

| Parameter | Type | Description |
| :----- | :----: | :---- |
| method | String | Supported methods, please see the section below |
| params | Array | The parameters of the methods |

**Example**

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"method":"getinfo","params":[],"id":1}' http://127.0.0.1:9001
```

## RPC Methods

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
  "hash": the hash of the transaction
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
