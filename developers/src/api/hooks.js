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
      keystore: {
        app_id: keystore.user_id,
        scope: keystore.scope,
        authorization_id: keystore.authorization_id,
        session_private_key: keystore.private_key
      },
    }
    : defaultApiConfig;
  return MixinApi(config);
};

export const useBotClient = ($message, t, keystore, onError = undefined) => {
  const defaultApiConfig = {
    requestConfig: {
      responseCallback: botCbFactory($message, t, onError),
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
      keystore: {
        app_id: keystore.user_id,
        session_id: keystore.session_id,
        server_public_key: keystore.pin_token,
        session_private_key: keystore.private_key
      },
    }
    : defaultApiConfig;
  return MixinApi(config);
};
