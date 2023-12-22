<template>
  <app-form
    :appId="appId"
  />
</template>

<script>
import AppForm from '@/components/AppForm.vue';

export default {
  name: 'app-information',
  components: { AppForm },
  props: {
    appId: String,
  },
};
</script>

<style scoped>
</style>
