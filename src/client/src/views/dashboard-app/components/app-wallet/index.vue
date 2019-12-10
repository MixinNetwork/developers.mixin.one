<template>
    <div class="dashboard-app-wallet">
        <div v-loading="loading" class="dashboard-app-wallet-loaing"></div>
        <div class="app-wallet-des" v-if="!is_edited">
            <div>
                <h3>{{$t('wallet.update_token_d')}}</h3>
                <span @click="open_edit_modal = true">{{$t('wallet.update_token')}}</span>
                <img src="@/assets/img/app-svg/right.svg" />
            </div>
        </div>
        <div v-show="open_edit_modal" class="edit-information">
            <t-modal :show="open_edit_modal" :width="310" :height="478">
                <div class="edit-main-modal">
                    <img @click="click_cancel" src="@/assets/img/app-svg/close.svg" />
                    <h3 class="edit-main-modal-title">{{$t('wallet.update_token')}}</h3>
                    <t-input v-model="submit_form.session_id" label="Session ID"></t-input>
                    <t-input v-model="submit_form.pin_token" label="Pin Token"></t-input>
                    <t-input v-model="submit_form.private_key" label="Private Key"></t-input>
                    <button @click="click_submit" class="btns-save primary">{{$t('button.save')}}</button>
                </div>
            </t-modal>
        </div>
        <div v-if="is_edited" class="assets-list">
            <div class="assets-item" v-for="item in assets_list">
                <img :style="{opacity: item.icon_url ? '1':'0'}" :src="item.icon_url" />
                <div>
                    <span class="assets-item-num">{{item.balance}}</span>
                    <span class="assets-item-symbol">{{item.symbol}}</span>
                </div>
                <button
                    @click="click_withdrawal(item)"
                    class="assets-item-withdrawal primary"
                >{{$t('button.withdraw')}}</button>
            </div>
            <div class="assets-list-bottom-tips">
                <div>{{$t('wallet.des_1')}}</div>
                <div>{{$t('wallet.des_2')}}</div>
            </div>
        </div>
    </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import './style.scss';
</style>