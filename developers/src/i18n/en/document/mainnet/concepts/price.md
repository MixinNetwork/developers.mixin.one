# 价格

Mixin API 返回资产的价格主要采集自第三方，优先采集 [CoinGecko](https://www.coingecko.com) 的数据，其次采集 Ocean 和 4swap 的价格：

- [CoinGecko](https://www.coingecko.com)

  自 CoinMarketCap 被币安收购后 Mixin 抓取价格的 API 就切换到了更为独立的 CoinGecko 平台，除了跟踪价格、数量和市值，CoinGecko 还跟踪社区增长情况、开源代码的开发情况、重大事件和链上指标。

- 4swap

  与 XIN 或者 USDT 的相关的交易对，资金池在 $1500 以上，并且 24 小时交易量在 $160 以上。

- Ocean 撮合引擎

  每小时抓取一次，1 小时内成交 10 美元即有价格。


### 注意事项
- 如果突然价格为 0 也不必惊慌资产是安全的不受影响
- 开发者注意业务不要完全依赖 Mixin API 的价格以避免第三方价格数据故障时带来可能的损失。

---
项目方如需在 Mixin 显示价格推荐在 4swap 做市提供流动性。
