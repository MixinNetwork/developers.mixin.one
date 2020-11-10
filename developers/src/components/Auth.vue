<template>
  <div></div>
</template>

<script>
  import tools from "@/assets/js/tools"

  export default {
    async mounted() {
      let { getUrlParameter } = tools
      const error = getUrlParameter("error")
      if (error === "access_denied") return handle_access_denied.call(this)
      const code = getUrlParameter("code")
      const resp = await this.apis.authenticate(code)
      if (!resp) return handle_access_denied.call(this)
      const { scope, access_token } = resp
      if (
        !scope ||
        scope.indexOf("APPS:READ") < 0 ||
        scope.indexOf("APPS:WRITE") < 0
      )
        return handle_access_denied.call(this)
      this.$ls.set("token", access_token)
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
