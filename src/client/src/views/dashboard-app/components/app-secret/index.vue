<template>
  <div class="dashboard-app-secret">
    <div class="secret-list">
      <div class="secret-item">
        <img src="@/assets/img/svg/secret.svg" />
        <span>{{$t('secret.secret_title')}}</span>
        <p>{{$t('secret.secret_content')}}</p>
        <button @click="request_new_secret" class="primary">{{$t('secret.secret_btn')}}</button>
      </div>
      <div class="secret-item">
        <img src="@/assets/img/svg/session.svg" />
        <span>{{$t('secret.session_title')}}</span>
        <p>{{$t('secret.session_content')}}</p>
        <button @click="tips_to_desktop" class="primary">{{$t('secret.session_btn')}}</button>
      </div>
      <div class="secret-item">
        <img src="@/assets/img/ic_qr_code.png" />
        <span>{{$t('secret.qrcode_title')}}</span>
        <p>{{$t('secret.qrcode_content')}}</p>
        <div class="qrcode-btns">
          <button @click="request_show_qrcode" class="primary">{{$t('secret.qrcode_btn1')}}</button>
          <button @click="request_rotate_qrcode" class="primary">{{$t('secret.qrcode_btn2')}}</button>
        </div>
      </div>
      <div class="bottom-tips">{{$t('secret.des')}}</div>
    </div>
    <t-modal v-show="modal_content" :show="modal_content ? true : false" :width="300" :height="264">
      <div class="new-secret-modal">
        <h3>{{modal_title}}</h3>
        <span>{{modal_content}}</span>
        <button
          v-clipboard:copy="modal_content"
          　　v-clipboard:success="click_copy_succuess"
          　　v-clipboard:error="click_copy_error"
          class="btn-copy primary"
        >Copy</button>
        <img @click="click_close_new_secret" class="iconguanbi" src="@/assets/img/svg/close.svg" />
      </div>
    </t-modal>

    <div v-show="open_edit_modal" class="edit-information">
      <t-modal :show="open_edit_modal" :loading="loading" :width="310" :height="478">
        <div class="edit-main-modal">
          <img @click="click_cancel" src="@/assets/img/app-svg/close.svg" />
          <h3 class="edit-main-modal-title">{{$t('wallet.update_token')}}</h3>
          <t-input v-model="submit_form.session_id" label="Session ID"></t-input>
          <t-input v-model="submit_form.pin_token" label="Pin Token"></t-input>
          <t-input v-model="submit_form.private_key" label="Private Key"></t-input>
          <button @click="click_submit" class="btns-save primary">{{$t('button.save')}}</button>
        </div>
      </t-modal>
    </div>

    <template v-if="confirm_modal">
      <t-modal class="confirm-modal" :show="confirm_modal" :width="270" :height="117">
        <h3>{{confirm_content}}</h3>
        <div>
          <span @click="confirm_modal=false">Cancel</span>
          <span @click="click_confirm">OK</span>
        </div>
      </t-modal>
    </template>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
@import "./style.scss";
</style>