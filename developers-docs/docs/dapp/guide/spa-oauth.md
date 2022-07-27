---
title: OAuth for single-page applications
---

The current method of using OAuth introduced in `/docs/api/oauth` requires developers to redirect users to `https://mixin.one/oauth/authorize` first to get authenticated. Which in some cases doesn't fit the scenario. Here I introduce a way to authorize the user without leaving the current page and without exposing `client_secret`.

## Guide

If we look into the source code of [mixin.one](https://mixin.one), we can find how it handles OAuth. The code is [here](https://github.com/MixinNetwork/mixin.one/blob/master/src/oauth/index.js#L15), and [here](https://github.com/MixinNetwork/mixin.one/blob/master/src/api/authorization.js). Basically, it's about creating a WebSocket connection to `wss://blaze.mixin.one` and listening to `message` and `open` events. Then call the callback function determined by the connection state. 


It was separated into two files. I wrapped those two together in [spa-oauth.js](https://github.com/zed-wong/mixin-dev-log/blob/main/MixinBot/oauth/spa-oauth.js), and made an example [(spa-oauth.vue)](https://github.com/zed-wong/mixin-dev-log/blob/main/MixinBot/oauth/spa-oauth.vue) of using it in Vue. You can simply import `spa-oauth.js` as I did in `spa-oauth.vue`. Or you can edit it to fulfill your own need.

### Related Links

[fox-one/uikit/authorize.ts](https://github.com/fox-one/uikit/blob/main/packages/uikit/src/utils/authorize.ts)

[fox-one/uikit/oauth.js](https://github.com/fox-one/uikit/blob/main/packages/uikit/src/services/mixin/oauth.js)

[mixin.one/authorization.js](https://github.com/MixinNetwork/mixin.one/blob/master/src/api/authorization.js)

[mixin.one/oauth.js](https://github.com/MixinNetwork/mixin.one/blob/master/src/oauth/index.js)

[spa-oauth.js](https://gist.github.com/zed-wong/6dfcebcda9b5d16572f5dc4328949304)