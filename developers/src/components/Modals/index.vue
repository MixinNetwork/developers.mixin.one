<template>
  <teleport to="body #modal">
    <buy-app-modal />

    <withdrawal-modal />

    <confirm />

    <secret-modal />

    <update-token-modal />

    <app-register-modal />
  </teleport>
</template>

<script>
import BuyAppModal from '@/components/Modals/BuyAppModal.vue';
import Confirm from '@/components/Modals/ConfirmModal.vue';
import SecretModal from '@/components/Modals/SecretModal.vue';
import UpdateTokenModal from '@/components/Modals/UpdateTokenModal.vue';
import WithdrawalModal from '@/components/Modals/WithdrawalModal.vue';
import AppRegisterModal from '@/components/Modals/AppRegisterModal.vue';

export default {
  name: 'modals',
  components: {
    BuyAppModal, Confirm, SecretModal, UpdateTokenModal, WithdrawalModal, AppRegisterModal
  },
};
</script>

<style scoped>

</style>
