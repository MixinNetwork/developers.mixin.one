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
          <button @click="request_new_session" class="primary">{{$t('secret.session_btn')}}</button>
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
    <t-modal class="secret-modal" :show="modal_content ? true : false">
      <div class="new-secret-modal">
        <h3>{{modal_title}}</h3>
        <span>{{modal_content}}</span>
        <div class="btns">
          <button @click="click_close_new_secret" class="btn-close primary">Close</button>
          <button
            v-clipboard:copy="modal_content"
            　　v-clipboard:success="click_copy_succuess"
            　　v-clipboard:error="click_copy_error"
            class="btn-copy primary"
          >Copy</button>
        </div>
        <img @click="click_close_new_secret" class="iconguanbi" src="@/assets/img/svg/close.svg" />
      </div>
    </t-modal>
    <a v-show="false" ref="download_ssesion_json"></a>
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
