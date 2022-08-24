<template>
  <teleport to="body #modal">
    <buy-app-modal />

    <confirm />
  </teleport>
</template>

<script>
import BuyAppModal from '@/components/Modals/BuyAppModal';
import Confirm from '@/components/Modals/ConfirmModal';

export default {
  name: 'modals',
  components: { BuyAppModal, Confirm },
};
</script>

<style scoped>

</style>
