<template>
    <t-modal :loading="loading" :show="show" :width="700" :height="558">
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
                        <input placeholder="PIN" ref="pin_token" @input="change_style" />
                    </div>
                </div>
                <t-input2 v-model="submit_form.opponent_id" label="Mixin ID"></t-input2>
            </section>
            <footer>
                <div class="btns">
                    <button
                        @click="click_submit"
                        class="btns-copy primary"
                    >{{$t('button.withdraw')}}</button>
                    <button
                        @click="click_cancel"
                        class="btns-cancel primary"
                    >{{$t('button.cancel')}}</button>
                </div>
            </footer>
            <img @click="click_cancel" class="iconguanbi" src="@/assets/img/svg/close.svg" />
        </div>
    </t-modal>
</template>
<script type='text/javascript' charset='utf-8' src='./script.js'></script>


<style lang="scss">
@import 'style.scss';
</style>