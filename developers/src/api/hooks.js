import { MixinApi } from '@mixin.dev/mixin-node-sdk';
import { ls } from '@/utils/localStorage';
import { userCbFactory, botCbFactory } from './config';

export const useUserClient = ($message, t, signingKeystore) => {
  const defaultApiConfig = {
    requestConfig: {
      responseCallback: userCbFactory($message, t),
    },
  };

  if (signingKeystore) {
    return MixinApi({ ...defaultApiConfig, keystore: signingKeystore });
  }

  const token = ls.get('token');
  return MixinApi({
    ...defaultApiConfig,
    keystore: {
      app_id: token.user_id,
      scope: token.scope,
      authorization_id: token.authorization_id,
      session_private_key: token.private_key,
    },
  });
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
