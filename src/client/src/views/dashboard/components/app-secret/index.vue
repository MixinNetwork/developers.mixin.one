<template>
    <div v-loading="loading" class="dashboard-app-secret">
        <div class="secret-list f">
            <div class="secret-item">
                <i class="icon iconfont iconsuo"></i>
                <span>APP SECRET</span>
                <p>
                    If you are requesting the API from your secret server,
                    it's recommended to use app secret.
                </p>
                <button @click="request_new_secret" class="primary">Generate a new secret</button>
            </div>
            <div class="secret-item">
                <i class="icon iconfont iconcaidan"></i>
                <span>APP SESSION</span>
                <p>
                    Generate PIN, Session ID, PinToken, Private Key
                    for this App.
                </p>
                <button @click="request_new_session" class="primary">Generate a new session</button>
            </div>
        </div>
        <t-input
            label="NEW SECRET"
            v-model="new_secret"
            :class="[(new_secret? 'active': ''), 'new-secret-content']"
            type="text"
            disabled
        />
        <t-modal v-show="new_secret" :show="new_secret ? true : false" width="612" height="294">
            <div class="new-secret-modal">
                <h3>App Secret</h3>
                <span>{{new_secret}}</span>
                <div class="btns">
                    <button
                        v-clipboard:copy="new_secret"
                        　　v-clipboard:success="click_copy_succuess"
                        　　v-clipboard:error="click_copy_error"
                        class="btn-copy primary"
                    >Copy</button>
                    <button @click="click_close_new_secret" class="btn-close primary">Close</button>
                </div>
            </div>
        </t-modal>
        <a v-show="false" ref="download_ssesion_json"></a>
    </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import './style.scss';
</style>