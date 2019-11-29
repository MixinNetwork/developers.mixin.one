<template>
    <div class="dashboard-app-secret">
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
        <a v-show="false" ref="download_ssesion_json"></a>
    </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import './style.scss';
</style>