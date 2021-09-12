---
title: 充值与提现
sidebar_position: 7
---

充值和取款是钱包最重要的功能之一，也是最容易出错的功能。

:::caution
一旦发生充值或取款错误，资产将无法取回。 请用户第一次尝试小额充值或提现
:::

### 充值

- 充值地址

  充值界面按 destinations 和 tags 显示充值信息。一些资产（如 EOS、BTS）需要同时使用 destinations 和 tags 来完成充值。您可以简单地检查 tags 是否为空来区分。

  同一条主链的充值地址是一样的，只需要使用 destination 即可。比如你可以直接将 Omni USDT 存入 BTC 的存入地址，所有符合 ERC-20 的代币都可以存入 ETH 的存入地址。

- 获取充值地址

  充值地址是按需创建的。调用`GET /assets` 不会生成新的充值地址。在调用`GET /assets/:id`时，如果用户还没有充值地址，会为他生成一个新的地址，需要一些时间，但一般很快。建议钱包应用在 API 返回之前，在充值按钮的位置显示加载状态。您可以通过检查“destination”字段是否有值来检查地址是否准备好。

- 充值确认

  Mixin 所需的充值确认数是普通钱包和交易所的两倍以上，因此为了安全起见，充值会更慢，这是为了防止双花等问题。开发者可以通过 `confirmations` 字段动态获取所需确认的数量并显示给用户。

- 充值进度

  您可以使用`GET /external/transactions`并同时指定`asset`、`destination`和`tag`来检索当前充值地址是否有持续充值记录，参见[文档](../../api/network/pending-deposits)

:::tip
建议关注 Mixin bot 7000103056，查看当前公链同步状态。 如果充值延提现可能是由于区块数据同步失败。 那就不用担心了，你只需要让用户等待，这将是 Mixin 主网团队解决这个问题的首要任务。
:::

:::tip
敬请用户提醒，一旦充值失败，资产将无法找回。 Mixin 团队目前为用户的充值失败提供了一些协助。 如有需要，请在 Mixin Messenger 中通过 7000 联系 Mixin 客服。
:::

:::caution
强烈建议提醒用户：首次充值请小额尝试。
:::

### 提现

注意用户提现前需要添加提现地址，请参考[API 文档](../../api/withdrawal/withdrawal)。

- 提现地址

  参考[文档](../../api/withdrawal/address-add)通过`POST /addresses`添加提现地址，注意提现地址只能是[Add](../../api/withdrawal/address-add) 和 [Delete](../../api/withdrawal/address-delete)，如果要编辑，可以先删除再添加。
  不支持提币到 TRON 和 EOS 的合约地址！

- 提现限制

  最小提现用`dust`字段显示，一般为 0.0001。一些代币提现需要账户中有准备金（不能提现为零），这由“reserve”字段决定，例如 XRP。

- 提现费

  提现费用显示在“费用”字段中。费用是动态的（根据公链的网络拥堵情况自动调整），可以从“费用”字段获取。

- 内部提现

  内部充提（Mixin Network Dapp 之间的充提）免费且快速。
  例如，从 Mixin Messenger 充值或提现到币印钱包，从 FOX.ONE 充值或提现到 Mixin Messenger。
  不过，出于商业考虑，部分钱包仍会收取提现费。

请注意，充值和提现地址不同。提现时，用户可以从一个或多个链上资产地址提现。 详情请参考 Mixin 的技术白皮书。

:::caution
强烈建议提醒用户：首次提现请小额尝试。
:::
