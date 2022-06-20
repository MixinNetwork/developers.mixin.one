<template>
  <div></div>
</template>

<script>
  import { getED25519KeyPair } from '@mixin.dev/mixin-node-sdk'
  import tools from "@/assets/js/tools"

  export default {
    props: ['client', 'setKeystore'],
    async mounted() {
      let { getUrlParameter } = tools
      const error = getUrlParameter("error")
      if (error === "access_denied") return handle_access_denied.call(this)

      const code = getUrlParameter("code")

      const { privateKey, publicKey } = getED25519KeyPair()

      const resp = await this.client.oauth.getToken(
          process.env.VUE_APP_CLIENT_ID,
          code,
          publicKey,
      )

      if (!resp) return handle_access_denied.call(this)
      const { scope, authorization_id } = resp
      if (
        !scope ||
        scope.indexOf("APPS:READ") < 0 ||
        scope.indexOf("APPS:WRITE") < 0
      )
        return handle_access_denied.call(this)

      console.log(scope)
      const keystore = {
        user_id: process.env.VUE_APP_CLIENT_ID,
        scope,
        authorization_id,
        private_key: privateKey,
      }
      this.$emit('set-keystore', keystore)

      this.$router.push("/dashboard")
    }
  }

  function handle_access_denied() {
    this.$message.error({
      message: this.$t("message.errors.403"),
      showClose: true
    })
    return this.$router.push("/")
  }
</script>

<style>
</style>
