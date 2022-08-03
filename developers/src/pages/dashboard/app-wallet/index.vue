<template>
  <div class="container">
    <div class="des" v-if="needUpdate">
      <div>
        <h3>{{ t('wallet.update_token_desc') }}</h3>
        <button class="primary" @click="showSessionUpdateModal = true">{{ t('wallet.update') }}</button>
        <span @click="showSessionUpdateModal = true">{{ t('wallet.update_token') }}</span>
        <img src="@/assets/img/app-svg/right.svg" alt="update-wallet-token-logo"/>
      </div>
    </div>
    <div v-else class="list">
      <div
        v-for="(item, index) in assetList"
        :key="index"
        :style="{opacity: item.icon_url ? '1':'0'}"
        class="item"
      >
        <img :src="item.icon_url" alt="asset-logo"/>
        <div>
          <span class="num">{{ item.balance }}</span>
          <span class="symbol">{{ item.symbol }}</span>
        </div>
        <button
          v-if="item.icon_url"
          @click="useClickWithdrawal(item)"
          class="withdrawal primary"
        >{{ t('button.withdrawal') }}
        </button>
      </div>
      <div v-if="assetList.length" class="list-bottom-tips">
        <div>{{ t('wallet.des_1') }}</div>
        <div>{{ t('wallet.des_2', {app_number: route.params.app_number}) }}</div>
      </div>
    </div>

    <update-token
      :show="showSessionUpdateModal"
      :appId="appId"
      @success="fetchAssetList"
      @close-modal="closeModal"
    />
    <withdrawal-modal
      :show="showWithdrawalModal"
      :app_id="appId"
      :asset="withdrawalAsset"
      @close-modal="showWithdrawalModal=false"
      @update-list="fetchAssetList"
    ></withdrawal-modal>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
