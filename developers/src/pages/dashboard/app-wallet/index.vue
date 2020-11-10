<template>
  <div v-loading="whole_loading" class="container">
    <div class="des" v-if="!is_edited">
      <div>
        <h3>{{$t('wallet.update_token_desc')}}</h3>
        <button class="primary" @click="open_edit_modal = true">{{$t('wallet.update')}}</button>
        <span @click="open_edit_modal = true">{{$t('wallet.update_token')}}</span>
        <img src="@/assets/img/app-svg/right.svg" />
      </div>
    </div>

    <div v-if="is_edited" class="list">
      <div
        v-for="(item, index) in assets_list"
        :key="index"
        :style="{opacity: item.icon_url ? '1':'0'}"
        class="item"
      >
        <img :src="item.icon_url" />
        <div>
          <span class="num">{{item.balance}}</span>
          <span class="symbol">{{item.symbol}}</span>
        </div>
        <button
          v-if="item.icon_url"
          @click="click_withdrawal(item)"
          class="withdrawal primary"
        >{{$t('button.withdrawal')}}
        </button>
      </div>
      <div v-if="assets_list.length" class="list-bottom-tips">
        <div>{{$t('wallet.des_1')}}</div>
        <div>{{$t('wallet.des_2', {app_number: active_app.app_number})}}</div>
      </div>
    </div>
    <update-token
      :open_edit_modal="open_edit_modal"
      :loading="loading"
      :active_app="active_app"
      :submit_form="submit_form"
      @success="update_list"
      @close_modal="close_modal"
    />
    <withdrawal-modal
      @update-list="update_list"
      :app_id="active_app.app_id"
      :active_asset="active_asset"
      @close-modal="show_withdrawal=false"
      v-if="show_withdrawal"
      :show="show_withdrawal"
    ></withdrawal-modal>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
  @import "./style.scss";
</style>
