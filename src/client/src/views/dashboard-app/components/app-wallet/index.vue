<template>
    <div v-loading="loading" class="dashboard-app-wallet dashboard-app">
        <template v-if="">
            <div class="tips f">
                <div class="tips-content">
                    <div>The deposit can only be made to your Mixin Messenger account.</div>
                    <div>Open Mixin Messenger > Search 7000100101 to find this app > Deposit by transfer.</div>
                </div>
            </div>
            <div v-if="!is_edited" class="edit-information">
                <div class="app-info-item">
                    <div>Session ID</div>
                    <div>
                        <input v-model="submit_form.session_id" />
                    </div>
                </div>
                <div class="app-info-item">
                    <div>Pin Token</div>
                    <div>
                        <input v-model="submit_form.pin_token" />
                    </div>
                </div>
                <div class="app-info-item">
                    <div>Private Key</div>
                    <div>
                        <textarea v-model="submit_form.private_key"></textarea>
                    </div>
                </div>
                <button @click="click_submit" class="primary">Submit</button>
            </div>
            <div v-else class="assets-list">
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
        </template>
    </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import './style.scss';
</style>