<template>
  <div :class="['api-page', showNav && 'api-page-locked']">
    <Header />

    <section>
      <el-menu
        :default-active="active_path"
        :class="['path one-path', showNav && 'one-path_active']"
      >
        <template v-for="(item, widx) in $t('documentation')">
          <el-submenu
            v-if="item.child"
            :key="widx"
            :index="String(widx)"
          >
            <template slot="title">
              <span>{{item.name}}</span>
            </template>
            <template v-for="(nitem, nidx) in item.child">
              <el-submenu
                v-if="nitem.child"
                :key="`${widx}-${nidx}`"
                :index="`${widx}-${nidx}`"
                class="path two-path"
              >
                <template slot="title">
                  <span>{{nitem.name}}</span>
                </template>
                <template v-for="(nnitem, nnidx) in nitem.child">
                  <el-submenu
                    v-if="nnitem.child"
                    :key="`${widx}-${nidx}-${nnidx}`"
                    :index="`${widx}-${nidx}-${nnidx}`"
                    class="path three-path"
                  >
                    <template slot="title">
                      <span>{{nnitem.name}}</span>
                    </template>
                    <el-menu-item
                      v-for="(nnnitem, nnnidx) in nnitem.child"
                      :key="`${widx}-${nidx}-${nnidx}-${nnnidx}`"
                      :index="`${widx}-${nidx}-${nnidx}-${nnnidx}`"
                      class="path four-path content-path"
                    >
                      <router-link class="content-a" :to="`/document/${nnnitem.path}`">{{nnnitem.name}}</router-link>
                    </el-menu-item>
                  </el-submenu>
                  <el-menu-item
                    v-else
                    :key="`${widx}-${nidx}-${nnidx}`"
                    :index="`${widx}-${nidx}-${nnidx}`"
                    class="path three-path content-path"
                  >
                    <router-link class="content-a" :to="`/document/${nnitem.path}`"> {{nnitem.name}}</router-link>
                  </el-menu-item>
                </template>


              </el-submenu>
              <el-menu-item
                v-else
                :key="`${widx}-${nidx}`"
                :index="`${widx}-${nidx}`"
                class="path two-path content-path"
              >
                <router-link class="content-a" :to="`/document/${nitem.path}`"> {{nitem.name}}</router-link>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item
            v-else
            :key="widx"
            :index="String(widx)"
            class="path one-path content-path"
          >
            <router-link class="content-a" :to="`/document/${item.path}`"> {{item.name}}</router-link>
          </el-menu-item>
        </template>
      </el-menu>
      <div :class="['modal', showNav && 'modal-active']" @click.self="showNav = !showNav"></div>
      <div class="float-menu" v-if="!showNav" @click="showNav = !showNav">
        <img src="@/assets/img/svg/doc-menus.svg" class="toggle-nav-btn" />
      </div>
      <div class="container">
        <div class="markdown-body" v-html="page"></div>
        <template v-if="path">
          <a target="_blank" :href="githubView" class="github-view">{{$t('home.documentation.github.view')}}</a><br />
          <a target="_blank" :href="githubEdit" class="github-edit">{{$t('home.documentation.github.edit')}}</a>
        </template>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
  @import "./style";
  @import "./style_m";
</style>
