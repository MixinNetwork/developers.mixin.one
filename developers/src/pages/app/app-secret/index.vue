<template>
  <div class="container">
    <div class="secret-list flex">
      <div class="item">
        <div class="secret-item">
          <img src="@/assets/img/svg/session.svg" alt="app-session-icon"/>
          <span>{{t('secret.session_title')}}</span>
          <p>{{t('secret.session_content')}}</p>
          <div class="secrets">
            <button @click="useDoubleCheck('UpdateSession')" class="primary">{{t('secret.session_ed25519_btn')}}</button>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="secret-item">
          <img src="@/assets/img/svg/secret.svg" alt="app-secret-icon"/>
          <span>{{t('secret.secret_title')}}</span>
          <p>{{t('secret.secret_content')}}</p>
          <button @click="useDoubleCheck('UpdateSecret')" class="primary">{{t('secret.secret_btn')}}</button>
        </div>
      </div>
      <div class="item">
        <div class="secret-item qrcode">
          <img src="@/assets/img/ic_qr_code.png" alt="app-qrcode-icon"/>
          <span>{{t('secret.qrcode_title')}}</span>
          <p>{{t('secret.qrcode_content')}}</p>
          <div class="qrcode-btns">
            <button @click="useDoubleCheck('ShowQRCode')" class="primary">{{t('secret.qrcode_btn1')}}</button>
            <button @click="useDoubleCheck('RotateQRCode')" class="primary">{{t('secret.qrcode_btn2')}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="tips">{{t('secret.des')}}</div>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
  @import "./style.scss";
</style>