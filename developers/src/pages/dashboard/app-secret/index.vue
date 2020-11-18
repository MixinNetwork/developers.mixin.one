<template>
  <div class="container">
    <div v-loading="loading" class="secret-list f">
      <div class="item">
        <div class="secret-item">
          <img src="@/assets/img/svg/secret.svg" />
          <span>{{$t('secret.secret_title')}}</span>
          <p>{{$t('secret.secret_content')}}</p>
          <button @click="request_new_secret" class="primary">{{$t('secret.secret_btn')}}</button>
        </div>
      </div>
      <div class="item">
        <div class="secret-item">
          <img src="@/assets/img/svg/session.svg" />
          <span>{{$t('secret.session_title')}}</span>
          <p>{{$t('secret.session_content')}}</p>
          <div class="secrets">
            <button @click="request_new_session" class="primary">{{$t('secret.session_btn')}}</button>
            <button @click="request_ed25519_session" class="primary">{{$t('secret.session_ed25519_btn')}}</button>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="secret-item qrcode">
          <img src="@/assets/img/ic_qr_code.png" />
          <span>{{$t('secret.qrcode_title')}}</span>
          <p>{{$t('secret.qrcode_content')}}</p>
          <div class="qrcode-btns">
            <button @click="request_show_qrcode" class="primary">{{$t('secret.qrcode_btn1')}}</button>
            <button @click="request_rotate_qrcode" class="primary">{{$t('secret.qrcode_btn2')}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="tips">{{$t('secret.des')}}</div>
    <d-modal class="secret-modal" :show="modal_content ? true : false">
      <div class="new-secret-modal">
        <h3>{{modal_title}}</h3>
        <span :class="tmp_action==='session' && 'session'">{{modal_content}}</span>
        <div class="btns">
          <button v-if="tmp_action==='secret'" @click="click_close_new_secret" class="btn-close primary">{{$t('button.cancel')}}</button>
          <button v-if="tmp_action==='session'" @click="click_download_session" class="btn-close primary">{{$t('button.download')}}</button>
          <button
            v-clipboard:copy="modal_content"
            　　v-clipboard:success="click_copy_success"
            　　v-clipboard:error="click_copy_error"
            class="btn-copy primary"
          >{{$t('button.copy')}}
          </button>
        </div>
        <img @click="click_close_new_secret" class="iconguanbi" src="@/assets/img/svg/close.svg" />
      </div>
    </d-modal>
    <a v-show="false" ref="download_session_json"></a>
    <update-token
      :open_edit_modal="open_edit_modal"
      :active_app="active_app"
      :submit_form="submit_form"
      @success="confirm_action"
      @close_modal="close_modal"
    />
    <confirm
      :confirm_content="confirm_content"
      :confirm_modal="confirm_modal"
      @confirm="confirm_action"
      @close_modal="close_modal"
    />
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
  @import "./style.scss";
</style>
