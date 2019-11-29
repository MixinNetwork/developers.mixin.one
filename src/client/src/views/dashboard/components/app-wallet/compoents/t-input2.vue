<template>
    <div class="f">
        <label>{{label}}</label>
        <input
            :type="private === '' ? 'password': 'text'"
            :maxlength="label==='PIN' ? '6': ''"
            :style="{'letter-spacing': label==='PIN' ? '10px': ''}"
            :value="value"
            :placeholder="description[label] || ''"
            @input="change($event)"
        />
    </div>
</template>

<script>
export default {
    name: 't-input',
    props: ['value', 'label', 'private'],
    data() {
        return {
            description: {
                'Mixin ID': 'press your Mixin ID or Mixin address'
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
    margin-bottom: 20px;
    label {
        display: inline-block;
        width: 90px;
        text-align: right;
        line-height: 60px;
        margin-right: 20px;
    }
    input {
        outline: none;
        width: 492px;
        height: 60px;
        background: #f6f9ff;
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
}
</style>