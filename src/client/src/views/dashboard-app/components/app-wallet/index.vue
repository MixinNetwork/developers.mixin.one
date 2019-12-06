<template>
    <div class="dashboard-app-wallet">
        <div v-loading="loading" class="dashboard-app-wallet-loaing"></div>
        <div class="app-wallet-des" v-if="!is_edited">
            <div>
                <h3>Update token to access your assets</h3>
                <span @click="open_edit_modal = true">Update Token</span>
            </div>
        </div>
        <div v-show="open_edit_modal" class="edit-information">
            <t-modal :show="open_edit_modal" :width="310" :height="478">
                <div class="edit-main-modal">
                    <i @click="click_cancel" class="icon iconfont iconguanbi"></i>
                    <h3 class="edit-main-modal-title">Upload Token</h3>
                    <t-input v-model="submit_form.session_id" label="Session ID"></t-input>
                    <t-input v-model="submit_form.pin_token" label="Pin Token"></t-input>
                    <t-input v-model="submit_form.private_key" label="Private Key"></t-input>
                    <button @click="click_submit" class="btns-save primary">Save</button>
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
                >Withdrawal</button>
            </div>
        </div>
    </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import './style.scss';
</style>