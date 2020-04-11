<template>
  <div :class="['pages', align]">
    <!-- <div @click="changePage(currentPage-1)" v-if="currentPage !== 1" class="circle-left">
      <img src="@/assets/img/svg/right.svg" />
    </div>

    <template v-if="pages > 8">
      <span
        v-for="i in 6"
        :key="i"
        @click="changePage(getPages(i))"
        :class="getPages(i) === currentPage ? 'active' : ''"
      >{{getPages(i)}}</span>
    </template>

    <template v-if="pages <= 8">
      <span
        v-for="i in pages"
        :key="i"
        @click="changePage(i)"
        :class="i === currentPage ? 'active' : ''"
      >{{i}}</span>
    </template>

    <div v-if="currentPage !== pages" @click="changePage(currentPage+1)" class="circle-right">
      <img src="@/assets/img/svg/right.svg" />
    </div>

    <input type="text" v-model="page" />
    <span class="skip" @click="changePage(Number(page))">Skip</span>-->

    <span
      v-for="i in pages"
      :key="i"
      @click="changePage(i)"
      :class="i === currentPage ? 'active' : ''"
    >{{i}}</span>
  </div>
</template>

<script>
export default {
  name: "Pages",
  props: {
    align: {
      type: String,
      default: "center"
    },
    currentPage: {
      type: Number,
      default: 1
    },
    split: {
      type: Number,
      default: 6
    },
    allPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      page: ""
    };
  },
  computed: {
    pages() {
      return Math.ceil(this.allPage / this.split);
    }
  },
  methods: {
    getPages(i) {
      let { currentPage, pages, split } = this;
      let page = i + currentPage - 3;
      switch (true) {
        case [1, 2].includes(currentPage):
          return i;
        case currentPage >= 3 && currentPage < pages - 3:
          return page;
        case currentPage >= pages - 3:
          return pages - split + i;
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.pages) {
        this.$emit("page", page);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pages {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  margin-top: 1rem;
}

.left {
  justify-content: flex-start;
}

.center {
  justify-content: center;
}

.right {
  justify-content: flex-end;
}

.circle-left,
.circle-right {
  width: 1.8125rem;
  height: 1.8125rem;
  background-color: #eef1f9;
  border-radius: 50%;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

.circle-left {
  transform: rotate(180deg);
}

span {
  margin: 0 1rem;

  font-size: 0.875rem;
  width: 0.88rem;
  line-height: 24px;

  color: #c7c9d2;
  cursor: pointer;

  &.active {
    color: #2f3032;
  }
}

input {
  outline: none;
  border: 0;
  background-color: #eef1f9;
  line-height: 1.8rem;
  border-radius: 4px;
  width: 2.75rem;
  padding: 0 0.5rem;
  margin: 0 0.8rem 0 2rem;
}

.skip {
  color: #2f3032;

  padding: 0.5rem;

  cursor: pointer;
  opacity: 0.8;
}
</style>