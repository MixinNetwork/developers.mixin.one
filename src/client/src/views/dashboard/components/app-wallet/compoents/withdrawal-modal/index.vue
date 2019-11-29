<template>
    <div class="app-wallet-withdrawal-modal">
        <div class="modal-mask">
            <div class="modal-container" v-loading="loading">
                <header :style="{opacity: active_asset.icon_url ? '1':'0'}">
                    <img :src="active_asset.icon_url" />
                    <p>{{active_asset.balance}} {{active_asset.symbol}}</p>
                </header>
                <section>
                    <div class="first-row f">
                        <t-input2 v-model="submit_form.amount" label="Amount"></t-input2>
                        <t-input2 v-model="submit_form.pin" private label="PIN"></t-input2>
                    </div>
                    <t-input2 v-model="submit_form.opponent_id" label="Mixin ID"></t-input2>
                    <t-input2 private v-model="submit_form.pin_token" label="Pin Token"></t-input2>
                    <t-input2 private v-model="submit_form.private_key" label="Private Key"></t-input2>
                </section>
                <footer>
                    <div class="btns">
                        <button @click="click_submit" class="btns-copy primary">Copy</button>
                        <button @click="click_cancel" class="btns-cancel primary">Cancel</button>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>
<script type='text/javascript' charset='utf-8' src='./script.js'></script>


<style lang="scss">
@import 'style.scss';
</style>