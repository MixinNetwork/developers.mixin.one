---
title: Introduction
sidebar_position: 1
---


Mixin Asset（资产）是 Mixin Network 中对“某一种可转移价值”的统一抽象。无论资产来自哪条链（BTC、ETH、Solana 等）或是链上的合约代币，在 Mixin API 中都会以 `asset` 的形式返回。

## 关键字段说明

- **asset_id**
  - 资产在整个 Mixin Network 内的唯一标识。
  - 在 API 调用里通常用于“指定要操作的资产”，例如提现地址接口 `GET /safe/assets/:asset_id`。
- **chain_id**
  - 该资产所属链的标识（用来描述底层区块链/网络）。
  - 一个 `chain_id` 下可能存在多个资产（例如同一条链上的多种代币）。

## 通常用法

- **查询资产信息**：获取这个代币的基本信息，如果名称，符号，图标等
- **获取提现手续费**：读取该资产提现时需要的手续费

相关资产的 asset_id 可以在 https://mixin.space/ 里搜索到