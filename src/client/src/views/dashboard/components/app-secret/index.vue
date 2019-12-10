<template>
    <div v-loading="loading" class="dashboard-desktop-secret">
        <div class="secret-list f">
            <div class="secret-item">
                <img src="@/assets/img/svg/secret.svg" />
                <span>{{$t('secret.secret_t')}}</span>
                <p>{{$t('secret.secret_p')}}</p>
                <button @click="request_new_secret" class="primary">{{$t('secret.secret_b')}}</button>
            </div>
            <div class="secret-item">
                <img src="@/assets/img/svg/session.svg" />
                <span>{{$t('secret.session_t')}}</span>
                <p>
                    {{$t('secret.session_p')}}
                </p>
                <button @click="request_new_session" class="primary">{{$t('secret.session_b')}}</button>
            </div>
        </div>
        <div
            class="secret-list-bottom-tips"
        >{{$t('secret.des')}}</div>
        <t-modal v-show="new_secret" :show="new_secret ? true : false" :width="612" :height="294">
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
                <img
                    @click="click_close_new_secret"
                    class="iconguanbi"
                    src="@/assets/img/svg/close.svg"
                />
            </div>
        </t-modal>
        <a v-show="false" ref="download_ssesion_json"></a>
    </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import './style.scss';
</style>