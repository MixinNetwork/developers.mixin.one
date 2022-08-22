<template>
  <teleport to="body #modal">
    <buy-app-modal />
  </teleport>
</template>

<script>
import BuyAppModal from '@/components/Modals/BuyAppModal';

export default {
  name: 'modals',
  components: { BuyAppModal },
};
</script>

<style scoped>

</style>
