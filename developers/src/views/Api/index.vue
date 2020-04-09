<template>
  <div>
    <Header />
    <section>api</section>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/MainHeader";
import Footer from "@/components/MainFooter";
export default {
  name: "News",
  components: { Header, Footer },
  mounted() {
    this.$nextTick(() => {
      let t = require("@/assets/js/animate-up").default;
      t();
    });
  }
};
</script>

<style>
</style>