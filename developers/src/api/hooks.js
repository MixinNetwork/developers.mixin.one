import { MixinApi } from '@mixin.dev/mixin-node-sdk';
import { ls } from '@/utils/localStorage';
import cbFactory from './config';

export const useClient = ($message, t, clientInfo, ignoreError = false) => {
  const defaultApiConfig = {
    requestConfig: {
      responseCallback: cbFactory($message, t, ignoreError),
    },
  };

  const keystore = clientInfo || ls.get('token');
  const config = (keystore && !!keystore.user_id && !!keystore.private_key)
  && (
    (!!keystore.scope && !!keystore.authorization_id)
    || (!!keystore.session_id && !!keystore.pin_token)
  )
    ? {
      ...defaultApiConfig,
      keystore,
    }
    : defaultApiConfig;
  return MixinApi(config);
};

export const useUserInfo = (client) => client.user.profile();

export const useApp = (client, appId) => client.app.fetch(appId);

export const useAppList = (client) => client.app.fetchList();

export const useAppProperty = (client) => client.app.properties();

export const useUpdateApp = (client, app_id, params) => client.app.update(app_id, params);

export const useCreateApp = (client, params) => client.app.create(params);

export const useAssetList = (client) => client.asset.fetchList();
