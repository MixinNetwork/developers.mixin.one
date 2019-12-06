<template>
    <div class="dashboard-app-secret">
        <div class="secret-list">
            <div class="secret-item">
                <i class="icon iconfont iconsuo"></i>
                <span>APP SECRET</span>
                <p>
                    If you are requesting the API from your secret server,
                    it's recommended to use app secret.
                </p>
                <button @click="tips_to_desktop" class="primary">Generate a new secret</button>
            </div>
            <div class="secret-item">
                <i class="icon iconfont iconcaidan"></i>
                <span>APP SESSION</span>
                <p>
                    Generate PIN, Session ID, PinToken, Private Key
                    for this App.
                </p>
                <button @click="tips_to_desktop" class="primary">Generate a new session</button>
            </div>
            <div
                class="bottom-tips"
            >Mixin server and the browser did not keep the information at all. If you forgot, you can generate a new one.</div>
        </div>
        <a v-show="false" ref="download_ssesion_json"></a>
    </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import './style.scss';
</style>