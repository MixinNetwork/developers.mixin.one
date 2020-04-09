<template>
  <!--  -->
  <header>
    <div @click="$router.push('/').catch(()=>{})" class="logo">
      <img src="@/assets/img/svg/logo.svg" />
      <span>{{$t('home.title')}}</span>
    </div>
    <img @click.stop="toggleMenus" class="menus-icon" src="@/assets/img/svg/menus.svg" />
    <ul :class="['menus', showMenus ? 'show' : '']">
      <li
        v-for="(item,index) in $t('home.menus')"
        :key="index"
        @click.stop="clickRouter(index)"
      >{{item}}</li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showMenus: false
    };
  },
  methods: {
    toggleMenus() {
      this.showMenus = !this.showMenus;
    },
    clickRouter(index) {
      let router = ["news", "cases", "api", "dashboard"];
      this.$router.push("/" + router[index]).catch(() => {});
    },
    closeMenus() {
      this.showMenus = false;
    }
  },
  mounted() {
    document.addEventListener("click", this.closeMenus);
  },
  destroyed() {
    document.removeEventListener("click", this.closeMenus);
  }
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;

  font-family: Maven Pro;
  font-weight: 500;
  line-height: 1.25rem;
  text-align: center;

  color: #3a3c3e;

  max-width: 75rem;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 2rem 0 2rem;
  user-select: none;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  img {
    width: 2.125rem;
    margin-right: 0.5rem;
  }
}

.menus-icon {
  display: none;
}

.menus {
  display: flex;
  li {
    margin-left: 2.5rem;
    cursor: pointer;
  }
}

@media screen and (max-width: 75rem) and (min-width: 60.0625rem) {
  // @media screen and (max-width: 75rem) {
  .menus {
    li:last-child {
      margin-right: 2rem;
    }
  }
}

@media screen and (max-width: 60rem) {
  header {
    padding: 1.5rem 1.25rem 0;
  }

  .logo img {
    width: 22px;
  }

  .menus-icon {
    display: block;
    cursor: pointer;
    padding: 0.5rem;
  }

  .menus {
    position: absolute;
    z-index: 1;
    display: none;
    top: 3.8rem;
    right: 1rem;
    background: #fff;
    box-shadow: 0px 2px 12px 0px rgba(47, 48, 50, 0.3);
    border-radius: 0.5rem;

    &::before {
      display: block;
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      top: -10px;
      right: 18px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
    }

    li {
      padding: 1rem;
      opacity: 1;
      margin: 0;

      border-bottom: 1px dashed #eee;

      &:last-child {
        border: 0;
      }
    }
  }

  .show {
    display: block;
  }
}
</style>