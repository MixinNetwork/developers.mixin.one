<template>
  <div class="container">
    <div class="secret-list flex">
      <div class="item">
        <div class="secret-item">
          <div>
            <div>
              <img src="@/assets/img/svg/secret.svg" alt="app-session-icon"/>
              <span>{{t('secret.session_title')}}</span>
            </div>
            <p v-html="t('secret.session_content')"></p>
          </div>
          <div class="btn-container">
            <button @click="useDoubleCheck('UpdateSafeSession')" class="primary">{{t('secret.session_btn')}}</button>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="secret-item">
          <div>
            <div>
              <img src="@/assets/img/svg/secret.svg" alt="app-session-icon"/>
              <span>{{t('secret.key_title')}}</span>
            </div>
            <p v-html="keyConfig.text"></p>
          </div>
          <div v-if="keyConfig.showBtn" class="btn-container">
            <button @click="useDoubleCheck('RegisterSafe')" class="primary">{{t('secret.key_btn')}}</button>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="secret-item">
          <div>
            <div>
              <img src="@/assets/img/svg/session.svg" alt="app-secret-icon"/>
              <span>{{t('secret.secret_title')}}</span>
            </div>
            <p>{{t('secret.secret_content')}}</p>
          </div>
          <div class="btn-container">
            <button @click="useDoubleCheck('UpdateSecret')" class="primary">{{t('secret.secret_btn')}}</button>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="secret-item qrcode">
          <div>
            <div>
              <img src="@/assets/img/ic_qr_code.png" alt="app-qrcode-icon"/>
              <span>{{t('secret.qrcode_title')}}</span>
            </div>
            <p>{{t('secret.qrcode_content')}}</p>
          </div>
          <div class="btn-container qrcode-btns">
            <button @click="useShowCodeUrl" class="primary">{{t('secret.qrcode_btn1')}}</button>
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
  @use "./style.scss";
</style>