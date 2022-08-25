import { MixinApi } from '@mixin.dev/mixin-node-sdk';
import { ls } from '@/utils/localStorage';
import { userErrorFactory, botErrorFactory } from './config';

export const useUserClient = ($message, t) => {
  const defaultApiConfig = {
    requestConfig: {
      responseCallback: userErrorFactory($message, t),
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

export const useBotClient = ($message, t, clientInfo, botRequestOn401 = undefined) => {
  const defaultApiConfig = {
    requestConfig: {
      responseCallback: botErrorFactory($message, t, botRequestOn401),
    },
  };

  const keystore = clientInfo;
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
