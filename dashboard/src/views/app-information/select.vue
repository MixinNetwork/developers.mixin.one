<template>
  <div class="select-component">
    <label>{{$t('information.category')}}</label>
    <div class="select" @click="toggle_options">
      {{$t('information.category_list.'+value)}}
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
          >{{item}}</span>
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
    };
  },
  methods: {
    toggle_options(status) {
      this.show_options = !this.show_options;
      console.log(this.show_options);
    },
    click_category(key) {
      this.$emit("input", key);
    }
  }
};
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
  box-shadow: 0px 1px 4px 0px rgba(28, 77, 174, 0.1);
  border-radius: 0.25rem;
  cursor: pointer;
  position: relative;

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
    border-radius: 4px;
    box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.1);
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
      background: url("../../assets/img/svg/selected.svg") no-repeat;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  margin-top: -2rem;
  opacity: 0;
}
</style>