# Price

The prices of assets returned by Mixin APIs are collected from a list of third parties, data from [CoinGecko](https://www.coingecko.com) is prioritized, and followed by the prices of Ocean and 4swap.

- [CoinGecko](https://www.coingecko.com)

  Since the acquisition of CoinMarketCap by Binance, Mixin's APIs for capturing prices has been switched to a more independent CoinGecko platform. In addition to tracking price, quantity and market value, CoinGecko also tracks community growth, open source code development, major events and on-chain indicators .

- 4swap

  For trading pairs related to XIN or USDT, the fund pool is more than $1500, and the 24-hour trading volume is more than $160.

- Ocean Maching Engine

  Crawled every hour, the price will be generated if the trading volume is more than 10 dollars within an hour.


### Precautions

- Don’t panic if the price becomes 0 suddenly, the asset is safe and unaffected
- Developers should be careful not to rely solely on Mixin API prices to avoid possible losses when third-party price data fails.


---
If any project wants to display its price in Mixin, it is recommended to make a market in 4swap to provide liquidity.
