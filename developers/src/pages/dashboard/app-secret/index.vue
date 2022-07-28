<template>
  <div class="container">
    <div v-loading="loading" class="secret-list f">
      <div class="item">
        <div class="secret-item">
          <img src="@/assets/img/svg/secret.svg" />
          <span>{{$t('secret.secret_title')}}</span>
          <p>{{$t('secret.secret_content')}}</p>
          <button @click="dispatch('openNewSecretConfirm')" class="primary">{{$t('secret.secret_btn')}}</button>
        </div>
      </div>
      <div class="item">
        <div class="secret-item">
          <img src="@/assets/img/svg/session.svg" />
          <span>{{$t('secret.session_title')}}</span>
          <p>{{$t('secret.session_content')}}</p>
          <div class="secrets">
            <button @click="dispatch('openNewSessionConfirm')" class="primary">{{$t('secret.session_ed25519_btn')}}</button>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="secret-item qrcode">
          <img src="@/assets/img/ic_qr_code.png" />
          <span>{{$t('secret.qrcode_title')}}</span>
          <p>{{$t('secret.qrcode_content')}}</p>
          <div class="qrcode-btns">
            <button @click="dispatch('showQRCode')" class="primary">{{$t('secret.qrcode_btn1')}}</button>
            <button @click="dispatch('openQRCodeRotateConfirm')" class="primary">{{$t('secret.qrcode_btn2')}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="tips">{{$t('secret.des')}}</div>
    <d-modal class="secret-modal" :show="!!modalContent">
      <div class="new-secret-modal">
        <h3>{{modalTitle}}</h3>
        <span :class="action==='updateSession' && 'session'">{{modalContent}}</span>
        <div class="btns">
          <button v-if="action==='updateSecret'" @click="closeModal" class="btn-close primary">{{$t('button.cancel')}}</button>
          <button v-if="action==='updateSession'" @click="downloadKeystoreJson" class="btn-close primary">{{$t('button.download')}}</button>
          <button
            v-clipboard:copy="modalContent"
            v-clipboard:success="onCopySuccess"
            v-clipboard:error="onCopyError"
            class="btn-copy primary"
          >{{$t('button.copy')}}
          </button>
        </div>
        <img @click="closeModal" class="iconguanbi" src="@/assets/img/svg/close.svg" />
      </div>
    </d-modal>
    <update-token
      :show="showUpdateToken"
      :app="app"
      @success="dispatch('rotateQRCode')"
      @close-modal="showUpdateToken=false"
    />
    <confirm
      :confirm_content="confirmContent"
      :show="!!confirmContent"
      @confirm="dispatch"
      @close-modal="closeConfirmModal"
    />
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
  @import "./style.scss";
</style>
