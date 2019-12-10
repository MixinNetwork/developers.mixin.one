<template>
    <div>
        <label>{{label}}</label>
        <input
            :class="[
            (width===''?'width':''),
            (disabled==='' ? 'disabled':'')
            ]"
            :disabled="disabled===''"
            type="text"
            :placeholder="placeholder[label] || ''"
            :value="value"
            @input="change($event)"
        />
    </div>
</template>

<script>
export default {
    name: 't-input',
    props: ['value', 'label', 'disabled', 'width'],
    data() {
        window.localStorage
        return {
            placeholder: {
                Name: this.$t('information.name_d'),
                'Home URL': this.$t('information.home_url_d'),
                'OAuth URL': this.$t('information.oauth_url_d'),
                description: 'A short description of your app',
                名称: this.$t('information.name_d'),
                首页网址: this.$t('information.home_url_d'),
                验证网址: this.$t('information.oauth_url_d')
            }
        };
    },
    methods: {
        change(event) {
            this.$emit('input', event.target.value);
        }
    }
};
</script>

<style scoped lang="scss">
div {
    font-size: 16px;
    label {
        display: block;
        line-height: 16px;
        margin-bottom: 16px;
    }
    input {
        outline: none;
        width: 320px;
        height: 64px;
        background: #fff;
        padding-left: 20px;
        border: 0;
        border-radius: 4px;
        box-shadow: 0px 1px 4px 0px rgba(28, 77, 174, 0.1);
        &::-webkit-input-placeholder {
            color: #a9b0bf;
        }
        &::-moz-input-placeholder {
            color: #a9b0bf;
        }
        &::-ms-input-placeholder {
            color: #a9b0bf;
        }
    }
    .width {
        width: 580px;
    }
    .disabled {
        background: #eceef2;
        color: #a9b0bf;
        box-shadow: none;
    }
}
</style>