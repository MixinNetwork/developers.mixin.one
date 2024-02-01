import BigNumber from 'bignumber.js';
import { WebViewApi } from '@mixin.dev/mixin-node-sdk';

const client = WebViewApi();

function cmpBalance(a, b) {
  a = new BigNumber(a);
  b = new BigNumber(b);
  if (a.gt(b)) return -1;
  if (a.lt(b)) return 1;
  return 0;
}

export const getUrlParameter = (name) => {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const getMixinEnvironment = () => {
  const ctx = client.getMixinContext();
  return ctx.platform;
};

export const getImmersive = () => {
  const ctx = client.getMixinContext();
  return !!ctx.immersive;
};

export const changeTheme = (color) => {
  const head = document.getElementsByTagName('head')[0];
  const metas = document.getElementsByTagName('meta');
  for (let i = 0; i < metas.length; i++) {
    if (metas[i].name === 'theme-color') {
      head.removeChild(metas[i]);
    }
  }
  const meta = document.createElement('meta');
  meta.name = 'theme-color';
  meta.content = color;
  head.appendChild(meta);

  client.reloadTheme();
};

export const randomPin = () => {
  let r = Math.random();
  while (r < 0.1) {
    r = Math.random();
  }
  return Math.floor((r * 1000000)).toString();
};

export const assetSortCompare = (a, b) => {
  const ap = new BigNumber(a.balance).times(a.price_usd);
  const bp = new BigNumber(b.balance).times(b.price_usd);

  let cmp = cmpBalance(ap, bp);
  if (cmp === 0) cmp = cmpBalance(a.balance, b.balance);
  if (cmp === 0) cmp = cmpBalance(a.price_usd, b.price_usd);
  return cmp;
};

export const getImageUrl = (path) =>
  new URL(path, import.meta.url).href;