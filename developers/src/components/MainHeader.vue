<template>
  <header>
    <a href="/" class="logo">
      <img src="@/assets/img/svg/logo.svg" />
      <span>{{$t('home.title')}}</span>
    </a>

    <div @click.stop :class="['search', focusSearch && 'focus']">
      <img class="icon" src="@/assets/img/svg/search.svg" alt="">
      <input ref="search" type="text" v-model="search" placeholder="Search" @keydown.enter="handleSearchEnter" />
      <i :class="search ? 'btn-close' : 'none'" @click="search=''" />
    </div>

    <img @click.stop="toggleSearch" class="search-icon" src="@/assets/img/svg/search_black.svg" alt="">
    <img @click.stop="toggleMenus" class="menus-icon" src="@/assets/img/svg/menus.svg" />
    <ul :class="['menus', showMenus ? 'show' : '']">
      <li
        v-for="(item,index) in $t('home.menus')"
        :key="index"
        :class="$route.path.startsWith(routerList[index]) ? 'acvie': ''"
      >
        <a :href="routerList[index]">{{item}}</a>
      </li>
    </ul>
  </header>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        showMenus: false,
        routerList: ["/news", "/cases", "/document/mainnet/overview", "/dashboard"],
        search: "",
        focusSearch: false
      }
    },
    methods: {
      toggleMenus() {
        this.showMenus = !this.showMenus
      },
      toggleSearch() {
        this.focusSearch = !this.focusSearch
        if (this.focusSearch) {
          this.$nextTick(() => this.$refs.search.focus())
        }
      },
      closeMenus() {
        this.showMenus = false
      },
      closeSearch() {
        this.focusSearch = false
      },
      handleSearchEnter() {
        location.href = '/search?q=' + this.search
      }
    },
    mounted() {
      document.addEventListener('click', this.closeSearch)
      document.addEventListener("click", this.closeMenus)
    },
    destroyed() {
      document.removeEventListener("click", this.closeMenus)
      document.removeEventListener('click', this.closeSearch)
    }
  }
</script>

<style lang="scss" scoped>
  header {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;

    font-family: "Maven Pro", sans-serif;
    font-weight: 500;
    line-height: 1.25rem;
    text-align: center;

    max-width: 60rem;
    width: 100%;
    margin: 0 auto;
    padding: 2rem 0 0 0;
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

  .search {
    width: 172px;
    height: 30px;
    background: #F5F8FE;
    border-radius: 24px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    justify-self: flex-end;

    .icon {
      transform: translateY(-1px);
    }

    input {
      background: transparent;
      width: 100%;
      flex: 1;
      padding: 0 8px;
      color: #9FACC5;
      font-size: 14px;
    }

    .btn-close {
      width: 20px;
      height: 20px;
      background: #BCBEC3;
      border-radius: 50%;
      position: relative;

      &::after,
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 9px;
        height: 2px;
        background-color: #fff;
      }

      &:after {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &:before {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }

  .search-icon {
    display: none;
  }

  .none {
    display: none;
  }

  .menus-icon {
    display: none;
  }

  .menus {
    display: flex;

    li {
      margin-left: 1.5rem;

      a {
        color: #3a3c3e;
        padding: 0.5rem;
      }

      &.acvie a {
        color: #3d75e3;
      }
    }
  }

  @media screen and (max-width: 75rem) and (min-width: 60.0625rem) {
    header {
      max-width: 50rem;
    }
  }

  @media screen and (max-width: 60rem) {
    header {
      padding: 1.5rem 1.25rem 0;
      position: relative;
    }

    .logo img {
      width: 22px;
    }

    .search {
      display: none;
    }

    .focus {
      display: block;
      position: absolute;
      width: initial;
      left: 20px;
      right: 20px;
      top: 24px;
      height: 36px;

      .btn-close,
      .icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 16px;
      }

      input {
        padding: 0 26px;
        height: 36px;
      }

      .btn-close {
        position: absolute;
        left: initial;
        right: 8px;
      }
    }

    .search-icon {
      display: block;
      margin-right: 32px;
      padding: 5px;
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
