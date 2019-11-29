<template>
    <div v-loading="loading" class="dashboard-app-wallet">
        <div class="tips f">
            <div class="tips-title">
                <i class="icon iconfont iconbiaoqian" />
                <span>TIP</span>
            </div>
            <div class="tips-content">
                <div>The deposit can only be made to your Mixin Messenger account.</div>
                <div>Open Mixin Messenger > Search 7000100101 to find this app > Deposit by transfer.</div>
            </div>
        </div>
        <div v-if="!is_edited" class="edit-information">
            <t-input v-model="submit_form.session_id" label="Session ID"></t-input>
            <t-input v-model="submit_form.pin_token" label="Pin Token"></t-input>
            <div class="edit-information-PK">
                <label style="margin-bottom:16px">Private Key</label>
                <textarea v-model="submit_form.private_key"></textarea>
            </div>
            <button @click="click_submit" class="primary">Submit</button>
        </div>
        <div v-else class="assets-list">
            <div class="assets-item" v-for="item in assets_list">
                <img :style="{opacity: item.icon_url ? '1':'0'}" :src="item.icon_url" />
                <span class="assets-item-num">{{item.balance}}</span>
                <span class="assets-item-symbol">{{item.symbol}}</span>
                <button
                    @click="click_withdrawal(item)"
                    class="assets-item-withdrawal primary"
                >Withdrawal</button>
            </div>
        </div>
        <withdrawal-modal
            @update-list="update_list"
            :app_id="active_app.app_id"
            :active_asset="active_asset"
            @close-modal="show_withdrawal=false"
            v-if="show_withdrawal"
        ></withdrawal-modal>
    </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import './style.scss';
</style>