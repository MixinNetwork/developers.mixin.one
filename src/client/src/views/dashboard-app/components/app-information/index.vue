<template>
    <div
        :style="is_new_app ? 'margin-top:0;' : 'margin-top:44px;'"
        class="dashboard-app-information dashboard-app"
    >
        <div class="app-info-icon-and-id f">
            <div class="app-info-item app-info-icon">
                <label>{{$t('information.icon')}}</label>
                <div>
                    <input type="file" @change="getFile" ref="upload_dom" />
                    <template v-if="icon_base64 || active_app.icon_url">
                        <img :src="icon_base64 || active_app.icon_url" />
                    </template>
                    <template v-else>
                        <div class="app-info-new-icon">
                            <img src="@/assets/img/app-svg/image.svg" />
                        </div>
                    </template>
                </div>
            </div>
            <template v-if="!is_new_app">
                <div class="app-info-id f f-column">
                    <div class="app-info-item">
                        <label>Mixin ID</label>
                        <div class="grep">{{active_app.app_number}}</div>
                    </div>
                    <div class="app-info-item">
                        <label>{{$t('information.app_id')}}</label>
                        <div class="grep">{{active_app.app_id}}</div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="app-info-new-icon-des">{{$t('information.icon_desc')}}</div>
            </template>
        </div>
        <div class="app-info-edit-main">
            <div class="app-info-item">
                <div>{{$t('information.name')}}</div>
                <div>
                    <input
                        @input="check_is_finished"
                        :placeholder="$t('information.name_desc1')"
                        v-model="app_name"
                    />
                </div>
            </div>
            <div class="app-info-item">
                <div>{{$t('information.home_url')}}</div>
                <div>
                    <input
                        @input="check_is_finished"
                        :placeholder="$t('information.home_url_desc')"
                        v-model="active_app.home_uri"
                    />
                </div>
            </div>
            <div class="app-info-item">
                <div>{{$t('information.oauth_url')}}</div>
                <div>
                    <input
                        @input="check_is_finished"
                        :placeholder="$t('information.oauth_url_desc')"
                        v-model="active_app.redirect_uri"
                    />
                </div>
            </div>
            <div class="app-info-item">
                <div>{{$t('information.description')}}</div>
                <div>
                    <textarea
                        @input="check_is_finished"
                        :placeholder="$t('information.description_desc')"
                        v-model="active_app.description"
                    ></textarea>
                </div>
            </div>
        </div>
        <div
            :class="['app-info-button-to-save', can_save ? 'app-info-button-to-save-active' : '']"
            @click="submit_to_database"
        >{{$t('button.save')}}</div>
    </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import './style.scss';
</style>