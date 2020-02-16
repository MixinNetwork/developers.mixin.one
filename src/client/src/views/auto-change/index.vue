<template>
  <div>
    <template v-if="is_mobile">
      <H5Page />
    </template>
    <template v-else>
      <PcPage />
    </template>
  </div>
</template>

<script>
import H5Page from "../dashboard-app";
import PcPage from "../dashboard";
export default {
  components: { H5Page, PcPage },
  data() {
    return {
      screenWidth: document.documentElement.clientWidth
    };
  },
  computed: {
    is_mobile() {
      return this.screenWidth < 680;
    }
  },
  mounted() {
    window.onresize = () => {
      this.screenWidth = document.documentElement.clientWidth;
    };
  }
};
</script>
<style scoped>
div {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
