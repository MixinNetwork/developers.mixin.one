<template>
  <div class="select-component">
    <label>{{$t('information.category')}}</label>
    <div class="select" @click.stop="toggle_options">
      {{$t('information.category_list.' + (value || 'OTHER'))}}
      <img
        class="bottom"
        src="@/assets/img/svg/bottom.svg"
      />

      <transition name="fade">
        <div v-if="show_options" class="options">
          <span
            v-for="(item, key) in $t('information.category_list')"
            :key="key"
            :class="key === value ? 'active' : ''"
            @click="click_category(key)"
          >
            <img class="category-icon" :src="require(`@/assets/img/svg/Category${key}.svg`)" />
            {{item}}
          </span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        show_options: false
      }
    },
    methods: {
      toggle_options() {
        this.show_options = !this.show_options
        document.onclick = () => (this.show_options = false)
      },
      click_category(key) {
        this.$emit("input", key)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .select-component {
    user-select: none;
  }

  label {
    font-weight: 700;
    display: block;
    line-height: 1rem;
    margin-bottom: 1rem;
  }

  .select {
    background-color: #fff;
    line-height: 4rem;
    padding: 0 1.25rem;
    box-shadow: 0 1px 0.25rem 0 rgba(28, 77, 174, 0.1);
    border-radius: 0.25rem;
    cursor: pointer;
    position: relative;
  }

  .bottom {
    position: absolute;
    top: 50%;
    right: 1.5rem;
    transform: translateY(-50%);
  }

  .options {
    display: flex;
    flex-direction: column;

    position: absolute;
    right: 0;
    z-index: 1;
    overflow: hidden;

    width: 14.25rem;
    padding: 1.25rem;
    line-height: 2;

    background-color: #fff;
    border-radius: 0.25rem;
    box-shadow: 0 0.25rem 1.125rem rgba(0, 0, 0, 0.1);

    span {
      display: flex;
      align-items: center;
    }

    .category-icon {
      width: 1.2rem;
      margin-right: 0.625rem;
      border-radius: initial;
    }
  }

  .active {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 0.8325rem;
      height: 0.5625rem;
      background: url("../../../assets/img/svg/selected.svg") no-repeat;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s;
  }

  .fade-enter,
  .fade-leave-to {
    margin-top: -2rem;
    opacity: 0;
  }
</style>
