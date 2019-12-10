<template>
    <div class="dashboard-app-secret">
        <div class="secret-list">
            <div class="secret-item">
                <img src="@/assets/img/app-svg/secret.svg" />
                <span>{{$t('secret.secret_t')}}</span>
                <p>{{$t('secret.secret_p')}}</p>
                <button @click="tips_to_desktop" class="primary">{{$t('secret.secret_b')}}</button>
            </div>
            <div class="secret-item">
                <img src="@/assets/img/app-svg/session.svg" />
                <span>{{$t('secret.session_t')}}</span>
                <p>{{$t('secret.session_p')}}</p>
                <button @click="tips_to_desktop" class="primary">{{$t('secret.session_b')}}</button>
            </div>
            <div class="bottom-tips">{{$t('secret.des')}}</div>
        </div>
        <a v-show="false" ref="download_ssesion_json"></a>
    </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import './style.scss';
</style>