<template>
  <div class="container">
    <div class="secret-list f">
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
          <div class="secrets">
            <button @click="request_show_qrcode" class="primary">{{$t('secret.qrcode_btn1')}}</button>
            <button @click="request_rotate_qrcode" class="primary">{{$t('secret.qrcode_btn2')}}</button>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="secret-item qrcode">
          <img src="@/assets/img/transfer-app.png" />
          <span>{{$t('secret.transfer_title')}}</span>
          <p>{{$t('secret.transfer_content')}}</p>
          <div>
            <button @click="request_show_transfer" class="primary">{{$t('secret.transfer_btn')}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="tips">{{$t('secret.des')}}</div>
    <d-modal class="secret-modal" :show="!!modal_content">
      <div class="new-secret-modal">
        <h3>{{modal_title}}</h3>
        <input
          v-if="tmp_action==='transfer'"
          class="session"
          :placeholder="$t('secret.transfer_input')" 
          v-model="recipient_user.identity_number"
        />
        <span v-else :class="tmp_action==='session' && 'session'">{{modal_content}}</span>
        <div class="btns">
          <template v-if="tmp_action!=='transfer'">
            <button v-if="tmp_action==='secret'" @click="click_close_new_secret" class="btn-close primary">{{$t('button.cancel')}}</button>
            <button v-if="tmp_action==='session'" @click="click_download_session" class="btn-close primary">{{$t('button.download')}}</button>
            <button
              v-clipboard:copy="modal_content"
              　　v-clipboard:success="click_copy_success"
              　　v-clipboard:error="click_copy_error"
              class="btn-copy primary"
            >{{$t('button.copy')}}
            </button>
          </template>
          <template v-else>
            <button @click="click_close_new_secret" class="btn-close">{{$t('button.cancel')}}</button>
            <button @click="click_continue_transfer(1)" class="btn-copy primary">{{$t('button.continue')}}</button>
          </template>
        </div>
        <img @click="click_close_new_secret" class="iconguanbi" src="@/assets/img/svg/close.svg" />
      </div>
    </d-modal>
    <d-modal class="secret-modal" :show="show_transfer_step">
      <div class="new-secret-modal transfer-modal">
        <img @click="click_close_transfer_modal" class="iconguanbi" src="@/assets/img/svg/close.svg" />
        <template v-if="transfer_step===1">
          <img key="1" class="avatar" :src="recipient_user.avatar_url" alt="">
          <p class="transfer-confirm">{{$t('secret.transfer_confirm', {name: recipient_user.full_name, id: recipient_user.identity_number})}}</p>
          <div class="btns">
            <button class="btn-close" @click="click_close_transfer_modal">{{$t('button.cancel')}}</button>
            <button class="primary" @click="click_continue_transfer(2)">{{$t('button.ok')}}</button>
          </div>
        </template>
        <template v-else-if="transfer_step===2">
          <img key="2" class="avatar" src="https://mixin-images.zeromesh.net/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128" alt="">
          <p class="transfer-info">{{$t('secret.transfer_info', {name: active_app.name, id: active_app.app_number, r_id: recipient_user.identity_number})}}</p>
          <canvas ref="qr" />
          <p class="transfer-tips" v-html="$t('secret.transfer_tips')" />
        </template>
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
