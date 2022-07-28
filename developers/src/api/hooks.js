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

export const useAppList = async (client) => await client.app.fetchList()

export const useAppProperty = async (client) => await client.app.properties()

