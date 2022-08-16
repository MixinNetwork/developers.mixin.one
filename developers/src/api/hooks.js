import { MixinApi } from '@mixin.dev/mixin-node-sdk';
import { ls } from '@/utils/localStorage';
import cbFactory from './config';

export const useClient = ($message, t, clientInfo) => {
  const defaultApiConfig = {
    requestConfig: {
      responseCallback: cbFactory($message, t),
    },
  };

  const keystore = clientInfo || ls.get('token');
  if (keystore && (
    !keystore.private_key
    || !keystore.scope
    || !keystore.user_id
    || !keystore.authorization_id
  )) {
    setTimeout(() => {
      window.localStorage.clear();
      // eslint-disable-next-line max-len
      window.location.href = `https://mixin-www.zeromesh.net/oauth/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&scope=PROFILE:READ+APPS:READ+APPS:WRITE&response_type=code`;
    }, 100);
  }

  const config = keystore
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
