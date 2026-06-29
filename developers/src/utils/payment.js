import { base64RawURLEncode } from '@mixin.dev/mixin-node-sdk';
import qs from 'qs';
import { v4 as uuid, parse } from 'uuid';

const MIXPAY_BASE_URL = 'https://mixpay.me/pay';
const PAYEE_ID = '3c2bf6e7-fa74-4764-a4f3-79a24fab814f';
const PAYER_ID = 'fbd26bc6-3d04-4964-a7fe-a540432b16e2';

export const generateMixPayUrl = ({ assetId, amount, memo, returnTo }) => {
  const params = {
    payeeId: PAYEE_ID,
    settlementAssetId: assetId,
    quoteAssetId: 'usd',
    quoteAmount: amount,
    traceId: uuid(),
    settlementMemo: memo,
    returnTo,
  };

  return `${MIXPAY_BASE_URL}?${qs.stringify(params)}`;
};

export const generateMixinOnePaymentUrl = ({ assetId, amount, memo, returnTo }) => {
  const baseUrl = `https://mixin.one/pay/${PAYEE_ID}`;
  const params = {
    asset: assetId,
    amount,
    trace: uuid(),
    memo,
    return_to: returnTo,
  };

  return `${baseUrl}?${qs.stringify(params)}`;
};

export const buildPaymentMemo = ({ targetId, event }) => {
  const extra = JSON.stringify({
    u: targetId,
    e: event,
  });
  const version = Buffer.from([1]);
  const payer = Buffer.from(parse(PAYER_ID));
  const extraBuf = Buffer.from(extra);

  return base64RawURLEncode(Buffer.concat([version, payer, extraBuf]));
};
