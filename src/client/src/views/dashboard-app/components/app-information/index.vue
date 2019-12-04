<template>
    <div
        :style="is_new_app ? 'margin-top:0;' : 'margin-top:44px;'"
        class="dashboard-app-information dashboard-app"
    >
        <div class="app-info-icon-and-id f">
            <div class="app-info-icon">
                <div>Icon</div>
                <div>
                    <input type="file" @change="getFile" ref="upload_dom" />
                    <template v-if="!is_new_app || icon_base64 || active_app.icon_url">
                        <img :src="icon_base64 || active_app.icon_url" />
                    </template>
                    <template v-else>
                        <div class="app-info-new-icon">
                            <i class="icon iconfont icontupian"></i>
                        </div>
                    </template>
                </div>
            </div>
            <template v-if="!is_new_app">
                <div class="app-info-id f f-column">
                    <div class="app-info-item">
                        <div>Mixin ID</div>
                        <div class="grep">{{active_app.app_number}}</div>
                    </div>
                    <div class="app-info-item">
                        <div>App ID</div>
                        <div class="grep">{{active_app.app_id}}</div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="app-info-new-icon-des">
                    At least 500*500 px
                    PNG or JPG file.
                </div>
            </template>
        </div>
        <div class="app-info-edit-main">
            <div class="app-info-item">
                <div>Name</div>
                <div>
                    <input v-model="active_app.name" />
                </div>
            </div>
            <div class="app-info-item">
                <div>Home URL</div>
                <div>
                    <input v-model="active_app.home_uri" />
                </div>
            </div>
            <div class="app-info-item">
                <div>Oauth URL</div>
                <div>
                    <input v-model="active_app.redirect_uri" />
                </div>
            </div>
            <div class="app-info-item">
                <div>Description</div>
                <div>
                    <textarea
                        placeholder="A short description of your app"
                        v-model="active_app.description"
                    ></textarea>
                </div>
            </div>
        </div>
        <div
            :class="['app-info-button-to-save', can_save ? 'app-info-button-to-save-active' : '']"
            @click="submit_to_database"
        >Save</div>
    </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import './style.scss';
</style>