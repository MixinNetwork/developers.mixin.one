import { MixinApi } from '@mixin.dev/mixin-node-sdk';
import { ls } from '@/utils/localStorage';
import { defaultApiConfig } from './config';

export const useClient = (clientInfo) => {
  const keystore = clientInfo || ls.get('token');
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
