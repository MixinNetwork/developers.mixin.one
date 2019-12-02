<template>
    <div v-loading="all_loading" class="development-dashboard">
        <div class="dashboard-container">
            <nav class="nav-side">
                <div class="top-logo-title">
                    <img src="../../assets/logo.png" />
                    <span>DASHBOARD</span>
                </div>
                <div
                    v-if="!app_list.length"
                    @click.stop="click_user"
                    class="middle-user-or-new-app top-user-info"
                >
                    <img :src="user_info.avatar_url || _const.default.avatar_url" />
                    <div class="user-info-name-and-id">
                        <div>{{user_info.full_name}}</div>
                        <div>ID: {{user_info.identity_number}}</div>
                    </div>
                    <div
                        :class="['bottom-user-more', (entring_status.show_click_user ? 'bottom-user-more-active' : '')]"
                    >
                        <div class="bottom-user-button-list">
                            <div @click.stop class="bottom-user-button-item">
                                <i class="icon iconfont icondengchu"></i>
                                <span>Sign Out</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="middle-app-list-or-new-app">
                    <div @click="click_new_app" class="create-new-app">
                        <img src="../../assets/add.png" />
                        <span>New App</span>
                    </div>
                    <div class="app-list-container" v-if="app_list.length">
                        <div class="app-list-header">
                            <div class="app-list-name">MY APPS</div>
                        </div>
                        <div class="app-content">
                            <div
                                v-for="(item,index) in app_list"
                                :index="index"
                                @click="click_app_list_item(index)"
                                :class="['app-item', active_app.app_id === item.app_id ? 'app-item-active': '']"
                            >
                                <img :src="item.icon_url || _const.default.app_icon_url" />
                                <span>{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="app_list.length"
                    @click.stop="click_user"
                    class="bottom-user-info middle-user-or-new-app"
                >
                    <img :src="user_info.avatar_url || _const.default.avatar_url" />
                    <div class="user-info-name-and-id">
                        <div>{{user_info.full_name}}</div>
                        <div>ID: {{user_info.identity_number}}</div>
                    </div>
                    <div
                        :class="['bottom-user-more', (entring_status.show_click_user ? 'bottom-user-more-active' : '')]"
                    >
                        <div class="bottom-user-button-list">
                            <div @click.stop="click_sign_out" class="bottom-user-button-item">
                                <i class="icon iconfont icondengchu"></i>
                                <span>Sign Out</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="dashboard-center-and-nav">
                <div v-if="entring_status.welcome" class="welcome">
                    <img src="../../assets/robots.png" />
                    <h1>WELCOME</h1>
                    <p>Dashboard is a hand-picked collection of lastest developers console</p>
                    <button @click="click_new_app" class="primary">CREATE</button>
                </div>
                <div v-else>
                    <header>
                        <div :class="['header-list', ('header-index-' +nav_header_index)]">
                            <template v-if="entring_status.is_new_app">
                                <span class="header-item" style="color:#1d69ff">New App</span>
                            </template>
                            <template v-else>
                                <span
                                    v-for="(item,index) in nav_list"
                                    :class="['header-item', (nav_header_index === index ? 'herader-item-active':'')]"
                                    @click="change_router(index)"
                                >{{item}}</span>
                                <div class="move-slider"></div>
                            </template>
                        </div>
                    </header>
                    <div v-loading="loading" class="dashboard-main">
                        <router-view @add_new_app="add_new_app" :active_app="active_app"></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import './style.scss';
</style>