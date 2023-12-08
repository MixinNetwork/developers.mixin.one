<template>
  <div class="container">
    <div class="secret-list flex">
      <div class="item">
        <div class="secret-item">
          <div>
            <div>
              <img src="@/assets/img/svg/session.svg" alt="app-session-icon"/>
              <span>{{keyModuleTexts.title}}</span>
            </div>
            <p v-html="keyModuleTexts.content"></p>
          </div>
          <div class="btn-container">
            <button @click="useDoubleCheck('UpdateSafeSession')" class="primary">{{keyModuleTexts.btn}}</button>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="secret-item">
          <div>
            <div>
              <img src="@/assets/img/svg/secret.svg" alt="app-secret-icon"/>
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
  @import "./style.scss";
</style>