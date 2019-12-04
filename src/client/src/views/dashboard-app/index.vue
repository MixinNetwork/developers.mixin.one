<template>
    <div
        v-loading="all_loading"
        :class="['development-dashboard-web-app safe-view', is_pad ? 'is-pad' : '']"
    >
        <m-header :has_shadow="app_list.length ? 0 : 1">
            <div slot="left">Dashboard</div>
            <div class="header-slot-right" slot="right">
                <img @click.stop="click_user_img" :src="user_info.avatar_url || _const.default.avatar_url" />
                <div
                    :class="['right-user-more', (show_click_user ? 'right-user-more-active' : '')]"
                >
                    <div class="right-user-button-list">
                        <div @click.stop="click_sign_out" class="right-user-button-item">
                            <i class="icon iconfont icondengchu"></i>
                            <span>Sign Out</span>
                        </div>
                    </div>
                </div>
            </div>
        </m-header>
        <m-content :background="app_list.length ? '#fff' : ''">
            <div v-if="!app_list.length" class="no-app">
                <div class="no-app-title">WELCOME</div>
                <div class="no-app-content">
                    Build any decentralized applications
                    on Mixin
                </div>
                <div class="no-app-button">Create Your First App ></div>
            </div>
            <div v-else class="has-app">
                <div class="has-app-list">
                    <div @click="click_app_item(null)" class="has-app-item has-app-new-app">
                        <i class="icon iconfont iconjiahao"></i>
                        <div>New App</div>
                    </div>
                    <div
                        v-for="(item,index) in app_list"
                        @click="click_app_item(item)"
                        class="has-app-item"
                    >
                        <img :src="item.icon_url || _const.default.app_icon_url" />
                        <div>{{item.name}}</div>
                    </div>
                </div>
            </div>
        </m-content>
    </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import './style.scss';
</style>