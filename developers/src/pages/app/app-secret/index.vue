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
      <div class="item-billing">
        <div class="secret-item cost">
          <div>
            <div>
              <img src="@/assets/img/svg/secret.svg" alt="app-qrcode-icon"/>
              <span>{{t('secret.cc_title')}}</span>
            </div>
            <p>{{t('secret.cc_content')}}</p>
          </div>
          <div v-if="bill" class="btn-container billing">
            <div class="credit">
              <span>Credit:</span>
              <span class="value">${{ bill.credit }}</span>
            </div>
            <div class="h-px"></div>
            <div class="space-y-2">
              <h2 class="title">Cost</h2>
              <div class="credit">
                <span class="text-gray-600">Users:</span>
                <span class="text-gray-800 value">${{ bill.cost.users }}</span>
              </div>
              <div class="credit">
                <span class="text-gray-600">Resources:</span>
                <span class="text-gray-800 value">${{ bill.cost.resources }}</span>
              </div>
            </div>
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