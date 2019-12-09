<template>
    <div v-loading="loading" class="dashboard-app-wallet">
        <!-- <div class="tips f">
            <div class="tips-title">
                <i class="icon iconfont iconbiaoqian" />
                <span>TIP</span>
            </div>
            <div class="tips-content">
                <div>The deposit can only be made to your Mixin Messenger account.</div>
                <div>Open Mixin Messenger > Search 7000100101 to find this app > Deposit by transfer.</div>
            </div>
        </div>-->
        <div class="app-wallet-des" v-if="!is_edited">
            <div>
                <h3>Update token to access your assets</h3>
                <button class="primary" @click="open_edit_modal = true">UPDATE</button>
            </div>
        </div>
        <div v-show="open_edit_modal" class="edit-information">
            <t-modal :show="open_edit_modal" :width="700" :height="512">
                <div class="edit-main-modal">
                    <h3 class="edit-main-modal-title">Upload Token</h3>
                    <t-input v-model="submit_form.session_id" label="Session ID"></t-input>
                    <t-input v-model="submit_form.pin_token" label="Pin Token"></t-input>
                    <div class="edit-information-PK">
                        <label style="margin-bottom:16px">Private Key</label>
                        <textarea
                            style="ali"
                            placeholder="Private Key"
                            v-model="submit_form.private_key"
                        ></textarea>
                    </div>
                    <div class="btns">
                        <button @click="click_submit" class="btns-save primary">Save</button>
                        <button @click="click_cancel" class="btns-cancel primary">Cancel</button>
                    </div>
                    <img @click="click_cancel" class="iconguanbi" src="@/assets/img/svg/close.svg" />
                </div>
            </t-modal>
        </div>
        <div v-if="is_edited" class="assets-list">
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
        <div v-if="assets_list.length" class="assets-list-bottom-tips">
            <div>The deposit can only be made to your Mixin Messenger account.</div>
            <div>Open Mixin Messenger > Search 7000100101 to find this app > Deposit by transfer.</div>
        </div>
        <withdrawal-modal
            @update-list="update_list"
            :app_id="active_app.app_id"
            :active_asset="active_asset"
            @close-modal="show_withdrawal=false"
            v-show="show_withdrawal"
            :show="show_withdrawal"
        ></withdrawal-modal>
    </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import './style.scss';
</style>