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
import BuyAppModal from '@/components/Modals/BuyAppModal';
import Confirm from '@/components/Modals/ConfirmModal';
import SecretModal from '@/components/Modals/SecretModal';
import UpdateTokenModal from '@/components/Modals/UpdateTokenModal';
import WithdrawalModal from '@/components/Modals/WithdrawalModal';
import AppRegisterModal from '@/components/Modals/AppRegisterModal';

export default {
  name: 'modals',
  components: {
    BuyAppModal, Confirm, SecretModal, UpdateTokenModal, WithdrawalModal, AppRegisterModal
  },
};
</script>

<style scoped>

</style>
