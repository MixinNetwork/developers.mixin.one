<template>
  <div class="dashboard-desktop-secret">
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
    <div class="secret-list-bottom-tips">{{$t('secret.des')}}</div>
    <t-modal v-show="modal_content" :show="modal_content ? true : false" :width="612" :height="294">
      <div class="new-secret-modal">
        <h3>{{modal_title}}</h3>
        <span>{{modal_content}}</span>
        <div class="btns">
          <button
            v-clipboard:copy="modal_content"
            　　v-clipboard:success="click_copy_succuess"
            　　v-clipboard:error="click_copy_error"
            class="btn-copy primary"
          >Copy</button>
          <button @click="click_close_new_secret" class="btn-close primary">Close</button>
        </div>
        <img @click="click_close_new_secret" class="iconguanbi" src="@/assets/img/svg/close.svg" />
      </div>
    </t-modal>

    <div v-show="open_edit_modal" class="edit-information">
      <t-modal
        :loading="modal_loading"
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
    <a v-show="false" ref="download_ssesion_json"></a>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
