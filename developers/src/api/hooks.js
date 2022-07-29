import { MixinApi } from "@mixin.dev/mixin-node-sdk";
import { ls } from '@/utils/localStorage'
import { defaultApiConfig } from './config'

export const useClient = (clientInfo) => {
  const keystore = clientInfo ? clientInfo : ls.get('token')
  const config = keystore
    ?
    {
      ...defaultApiConfig,
      keystore
    }
    :
    defaultApiConfig
  return MixinApi(config)
}

export const useUserInfo = async (client) => await client.user.profile()

export const useApp = async (client, appId) => await client.app.fetch(appId)

export const useAppList = async (client) => await client.app.fetchList()

export const useAppProperty = async (client) => await client.app.properties()

export const useUpdateApp = async (client, app_id, params) => await client.app.update(app_id, params)

export const useCreateApp = async (client, params) => await client.app.create(params)

export const useAssetList = async (client) => await client.asset.fetchList()