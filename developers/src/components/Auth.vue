<template>
  <div></div>
</template>

<script>
import { getED25519KeyPair, MixinApi } from '@mixin.dev/mixin-node-sdk'
import tools from "@/assets/js/tools"
import defaultApiConfig from "@/api";

export default {
  props: ['client', 'setKeystore'],
  async mounted() {
    const { getUrlParameter } = tools
    const error = getUrlParameter("error")
    if (error === "access_denied") return this.handleAccessDenied()

    const code = getUrlParameter("code")
    const {privateKey, publicKey} = getED25519KeyPair()

    const client = MixinApi(defaultApiConfig)
    const resp = await client.oauth.getToken(
      process.env.VUE_APP_CLIENT_ID,
      code,
      publicKey,
    )
    if (!resp) return this.handleAccessDenied()

    const {scope, authorization_id} = resp
    if (
      !scope ||
      scope.indexOf("APPS:READ") < 0 ||
      scope.indexOf("APPS:WRITE") < 0
    ) return this.handleAccessDenied()

    const keystore = {
      user_id: process.env.VUE_APP_CLIENT_ID,
      scope,
      authorization_id,
      private_key: privateKey,
    }
    this.$ls.set('token', keystore)
    this.$emit('set-keystore', keystore)

    this.$router.push("/dashboard")
  },
  methods: {
    handleAccessDenied() {
      this.$message.error({
        message: this.$t("message.errors.403"),
        showClose: true
      })

      this.$router.push("/")
    }
  }
}
</script>

<style>
</style>
