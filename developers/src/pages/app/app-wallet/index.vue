<template>
  <div class="container">
    <div class="des" v-if="!assetList.length">
      <div>
        <h3>{{ t('wallet.update_token_desc') }}</h3>
        <button class="primary" @click="useShowUpdateToken">{{ t('wallet.update') }}</button>
        <span @click="useShowUpdateToken">{{ t('wallet.update_token') }}</span>
        <img src="@/assets/img/app-svg/right.svg" alt="update-wallet-token-logo"/>
      </div>
    </div>
    <div v-else class="list">
      <div
        v-for="(item, index) in assetList"
        :key="index"
        class="item"
      >
        <div class="icon-container">
          <img class="asset-icon" :src="item.icon_url" :alt="item.name"/>
          <img 
            v-if="!!item.chain_icon_url"
            class="chain-asset-icon" 
            :src="item.chain_icon_url" 
            :alt="item.chain_name"
          />
        </div>
        <div class="balance">
          <span class="num">{{ item.balance }}</span>
          <span class="symbol">{{ item.symbol }}</span>
        </div>
        <button
            @click="useClickWithdrawal(item)"
            class="withdrawal primary"
            >{{ t('button.withdrawal') }}
        </button>
      </div>
      <div class="list-bottom-tips">
        <div>{{ t('wallet.des_1') }}</div>
        <div>{{ t('wallet.des_2', {app_number: route.params.app_number}) }}</div>
      </div>
    </div>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
