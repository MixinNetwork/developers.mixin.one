<template>
    <div class="dash-app-components-header">
        <transition name="slide-left">
            <withdrawal v-if="open_withdrawal_state" @close_withdrawal="change_withdrawal(false)"></withdrawal>
        </transition>
        <div v-if="!open_withdrawal_state">
            <m-header :has_shadow="is_new_app ? 1 : 0">
                <div
                    style="width:50px;transform:translate(-25px);padding-left:25px"
                    @click="back"
                    slot="left"
                >
                    <img
                        style="height:24px;width:24px;transform:translate(0,5px)"
                        src="@/assets/img/app-svg/left.svg"
                    />
                </div>
                <div slot="center">{{header_name}}</div>
            </m-header>
            <m-conent v-loading="all_loading">
                <div
                    v-if="!is_new_app"
                    :class="['header-list', 'header-index-' + nav_header_index, $t('language')]"
                >
                    <span
                        v-for="(item,index) in nav_list"
                        :class="['header-item', (nav_header_index === index ? 'herader-item-active':'')]"
                        @click="change_router(index)"
                    >{{$t(item + '.title')}}</span>
                    <div class="move-slider"></div>
                </div>
                <component
                    :is="component_name"
                    @open_withdrawal="change_withdrawal(true)"
                    @loading="loading"
                    :is_new_app="is_new_app"
                    :active_app="active_app"
                ></component>
            </m-conent>
        </div>
    </div>
</template>

<script>
import MHeader from './header';
import MConent from './content';
import Withdrawal from './app-wallet/components/withdrawal';
import Information from './app-information';
import Wallet from './app-wallet';
import Secret from './app-secret';
export default {
    name: 'app-info',
    components: {
        MHeader,
        MConent,
        Withdrawal,
        Information,
        Wallet,
        Secret
    },
    data() {
        return {
            is_new_app: false,
            header_name: 'New App',
            nav_list: ['information', 'wallet', 'secret'],
            nav_header_index: 0,
            all_loading: false,
            open_withdrawal_state: false,
            slider: 'slide-left',
            component_name: 'information'
        };
    },
    computed: {
        transition_name() {
            return this.$store.state.transition_name;
        },
        active_app() {
            return this.$store.state.active_app;
        }
    },
    methods: {
        back() {
            this.$store.commit('change_state', { can_transition: true });
            this.$router.push('/');
        },
        change_router(nav_header_index) {
            this.$store.commit('change_state', { can_transition: true });
            this.nav_header_index = nav_header_index;
            this.component_name = this.nav_list[nav_header_index];
        },
        loading(state) {
            this.all_loading = state;
        },
        change_withdrawal(state) {
            this.open_withdrawal_state = state;
            !state && this.$store.commit('change_state', { active_asset: {} });
        }
    },
    mounted() {
        if (this.$route.path === '/app/new') {
            this.is_new_app = true;
            this.$store.commit('change_state', {
                active_app: {}
            });
            return;
        }
        if (this.$store.state.back_to_wallet) {
            this.nav_header_index = 1;
            this.component_name = this.nav_list[1];
            this.$store.commit('change_state', { back_to_wallet: false });
        }
        this.is_new_app = false;
        let { app_number } = this.$route.params;
        this.all_loading = true;
        this.$store.dispatch('init_app').then(_ => {
            let { app_list, user_info } = this.$store.state;
            let active_index = app_list.findIndex(
                item => item.app_number === app_number
            );
            this.$store.commit('change_state', {
                active_app: app_list[active_index]
            });
            this.header_name = this.active_app.name;
            this.all_loading = false;
        });
        this.$bus.$on(
            'change_loading_state',
            state => (this.all_loading = state)
        );
    }
};
</script>

<style lang="scss">
.dash-app-components-header {
    .header-list {
        padding: 10px 0 14px 20px;
        height: 44px;
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        font-size: 14px;
        background: #fff;
        color: #b8bdc7;
        box-shadow: 0px 1px 4px 0px rgba(28, 77, 174, 0.1);
        z-index: 10;
        .header-item {
            position: absolute;
            cursor: pointer;
            font-weight: 500;
            &.herader-item-active {
                color: #1d69ff;
            }
        }
        .move-slider {
            position: absolute;
            height: 3px;
            width: 30px;
            border-radius: 2px;
            background: #3277ff;
            transition: left 0.3s ease-in-out;
            top: 41px;
        }
        &.en {
            .header-item {
                &:nth-child(1) {
                    left: 20px;
                }
                &:nth-child(2) {
                    left: 143px;
                }
                &:nth-child(3) {
                    left: 228px;
                }
            }
            &.header-index-0 {
                .move-slider {
                    left: 20px;
                }
            }
            &.header-index-1 {
                .move-slider {
                    left: 143px;
                }
            }
            &.header-index-2 {
                .move-slider {
                    left: 228px;
                }
            }
        }
        &.zh {
            .header-item {
                &:nth-child(1) {
                    left: 20px;
                }
                &:nth-child(2) {
                    left: 100px;
                }
                &:nth-child(3) {
                    left: 180px;
                }
            }
            &.header-index-0 {
                .move-slider {
                    left: 20px;
                }
            }
            &.header-index-1 {
                .move-slider {
                    left: 100px;
                }
            }
            &.header-index-2 {
                .move-slider {
                    left: 180px;
                }
            }
        }
    }
}
</style>