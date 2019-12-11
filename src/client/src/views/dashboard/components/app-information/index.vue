<template>
    <div class="dashboard-desktop-information">
        <section>
            <div class="app-info-content f f-column">
                <div v-if="active_app.app_id" class="app-info-meta f">
                    <mixin-input
                        label="Mixin ID"
                        disabled
                        v-model="active_app.app_number"
                        class="app-info-mixin-id m-r-60"
                    ></mixin-input>
                    <mixin-input
                        :label="$t('information.app_id')"
                        disabled
                        width
                        v-model="active_app.app_id"
                        class="app-info-app-id"
                    ></mixin-input>
                </div>
                <div :class="['app-info-edit-main','f' ,( active_app.app_id ?  'm-t-32' : '  ')]">
                    <div class="app-info-icon">
                        <label>{{$t('information.icon')}}</label>
                        <div class="app-info-upload-and-show-icon">
                            <input type="file" @change="getFile" ref="upload_dom" />
                            <template v-if="!icon_base64 && !active_app.icon_url">
                                <img src="@/assets/img/svg/img.svg" />
                                <p>{{$t('information.icon_desc')}}</p>
                            </template>
                            <img
                                v-else
                                class="app-info-icon-img"
                                :src="icon_base64 || active_app.icon_url"
                            />
                        </div>
                    </div>
                    <div class="app-info-edit-list f f-column">
                        <mixin-input
                            @input="check_is_finished"
                            :label="$t('information.name')"
                            width
                            v-model="app_name"
                        ></mixin-input>
                        <mixin-input
                            :label="$t('information.home_url')"
                            width
                            @input="check_is_finished"
                            v-model="active_app.home_uri"
                            class="m-t-32"
                        ></mixin-input>
                        <mixin-input
                            @input="check_is_finished"
                            :label="$t('information.oauth_url')"
                            width
                            v-model="active_app.redirect_uri"
                            class="m-t-32"
                        ></mixin-input>
                    </div>
                </div>

                <div class="app-info-description">
                    <label style="margin-bottom:16px">{{$t('information.description')}}</label>
                    <textarea
                        @input="check_is_finished"
                        :placeholder="$t('information.description_desc')"
                        v-model="active_app.description"
                    ></textarea>
                </div>
                <button
                    @click="submit_to_database"
                    :class="['primary',not_finished ? 'app-info-not-finished' : '' ]"
                >{{$t('button.save')}}</button>
            </div>
        </section>
    </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import './style.scss';
</style>