<template>
  <teleport to="body #modal">
    <buy-app-modal />

    <confirm />

    <secret-modal />
  </teleport>
</template>

<script>
import BuyAppModal from '@/components/Modals/BuyAppModal';
import Confirm from '@/components/Modals/ConfirmModal';
import SecretModal from '@/components/Modals/SecretModal';

export default {
  name: 'modals',
  components: { BuyAppModal, Confirm, SecretModal },
};
</script>

<style scoped>

</style>
