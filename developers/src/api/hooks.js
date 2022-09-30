import { MixinApi } from '@mixin.dev/mixin-node-sdk';
import { ls } from '@/utils/localStorage';
import { userCbFactory, botCbFactory } from './config';

export const useUserClient = ($message, t) => {
  const defaultApiConfig = {
    requestConfig: {
      responseCallback: userCbFactory($message, t),
    },
  };

  const keystore = ls.get('token');
  const config = (
    keystore
    && !!keystore.user_id
    && !!keystore.private_key
    && !!keystore.scope
    && !!keystore.authorization_id
  )
    ? {
      ...defaultApiConfig,
      keystore,
    }
    : defaultApiConfig;
  return MixinApi(config);
};

export const useBotClient = ($message, t, keystore, cbOn401 = undefined) => {
  const defaultApiConfig = {
    requestConfig: {
      responseCallback: botCbFactory($message, t, cbOn401),
    },
  };

  const config = (
    keystore
    && !!keystore.user_id
    && !!keystore.private_key
    && !!keystore.session_id
    && !!keystore.pin_token
  )
    ? {
      ...defaultApiConfig,
      keystore,
    }
    : defaultApiConfig;
  return MixinApi(config);
};
