<template>
  <div v-loading="whole_loading" class="dashboard-desktop-wallet">
    <div class="app-wallet-des" v-if="!is_edited">
      <div>
        <h3>{{$t('wallet.update_token_desc')}}</h3>
        <button class="primary" @click="open_edit_modal = true">{{$t('wallet.update')}}</button>
      </div>
    </div>
    <div v-show="open_edit_modal" class="edit-information">
      <t-modal
        :loading="loading"
        class="--edit-modal"
        :show="open_edit_modal"
        :width="700"
        :height="512"
      >
        <div class="edit-main-modal">
          <h3 class="edit-main-modal-title">{{$t('wallet.update_token')}}</h3>
          <t-input v-model="submit_form.session_id" label="Session ID"></t-input>
          <t-input v-model="submit_form.pin_token" label="Pin Token"></t-input>
          <div class="edit-information-PK">
            <label style="margin-bottom:16px">Private Key</label>
            <textarea v-model="submit_form.private_key"></textarea>
          </div>
          <div class="btns">
            <button @click="click_submit" class="btns-save primary">{{$t('button.save')}}</button>
            <button @click="click_cancel" class="btns-cancel primary">{{$t('button.cancel')}}</button>
          </div>
          <img @click="click_cancel" class="iconguanbi" src="@/assets/img/svg/close.svg" />
        </div>
      </t-modal>
    </div>
    <div v-if="is_edited" class="assets-list">
      <div
        v-for="(item, index) in assets_list"
        :key="index"
        :style="{opacity: item.icon_url ? '1':'0'}"
        class="assets-item"
      >
        <img :src="item.icon_url" />
        <div>
          <span class="assets-item-num">{{item.balance}}</span>
          <span class="assets-item-symbol">{{item.symbol}}</span>
        </div>
        <button
          v-if="item.icon_url"
          @click="click_withdrawal(item)"
          class="assets-item-withdrawal primary"
        >{{$t('button.withdraw')}}</button>
      </div>
      <div v-if="assets_list.length" class="assets-list-bottom-tips">
        <div>{{$t('wallet.des_1')}}</div>
        <div>{{$t('wallet.des_2', {app_number: active_app.app_number})}}</div>
      </div>
    </div>
    <withdrawal-modal
      @update-list="update_list"
      :app_id="active_app.app_id"
      :active_asset="active_asset"
      @close-modal="show_withdrawal=false"
      v-show="show_withdrawal"
      :show="show_withdrawal"
    ></withdrawal-modal>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
@import "./style.scss";
</style>