<template>
  <div class="--app-modal">
    <div class="modal-mask">
      <transition name="fade-up">
        <div
          v-if="show"
          class="--modal-main"
          v-loading="loading"
        >
          <div class="withdrawal-modal-container">
            <header :style="{opacity: active_asset.icon_url ? '1':'0'}">
              <img :src="active_asset.icon_url" />
              <p>{{active_asset.balance}} {{active_asset.symbol}}</p>
            </header>
            <section>
              <div class="first-row">
                <t-input2 v-model="submit_form.amount" :label="$t('wallet.amount')"></t-input2>
                <div>
                  <label>PIN</label>
                  <input ref="pin_token" @input="change_style" />
                </div>
              </div>
              <t-input2 v-model="submit_form.opponent_id" label="Mixin ID"></t-input2>
            </section>
            <footer>
              <div class="btns">
                <button @click="click_submit" class="btns-copy primary">{{$t('button.withdraw')}}</button>
                <button @click="click_cancel" class="btns-cancel primary">{{$t('button.cancel')}}</button>
              </div>
            </footer>
            <img @click="click_cancel" class="iconguanbi" src="@/assets/img/svg/close.svg" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang="scss" scoped>
@import "style.scss";
</style>
