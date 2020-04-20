<template>
  <div class="content f f-column">
    <div class="top">
      <div class="meta f">
        <MInput
          v-if="active_app.app_id"
          label="Mixin ID"
          disabled
          is-copied="true"
          v-model="active_app.app_number"
          class="mixin-id"
        />
        <div class="icon">
          <label>{{$t('information.icon')}}</label>
          <Croppie ref="croppie" :icon_url="active_app.icon_url" :toggle_app="toggle_app"></Croppie>
        </div>
      </div>
      <div class="edit-main f">
        <div class="edit-list f f-column">
          <MInput
            v-if="active_app.app_id"
            :label="$t('information.app_id')"
            disabled
            is-copied="true"
            v-model="active_app.app_id"
            class="item"
          />
          <div class="name-category">
            <MInput
              @input="check_is_finished"
              :label="$t('information.name')"
              :placeholder="$t('information.name_desc')"
              v-model="app_name"
              class="item"
            />
            <CategorySelect class="item" v-model="active_app.category" />
          </div>
          <MInput
            :label="$t('information.home_url')"
            :placeholder="$t('information.home_url_desc')"
            @input="check_is_finished"
            v-model="active_app.home_uri"
            class="item"
          />
          <MInput
            @input="check_is_finished"
            :label="$t('information.oauth_url')"
            :placeholder="$t('information.oauth_url_desc')"
            v-model="active_app.redirect_uri"
            class="item"
          />
        </div>
      </div>
    </div>
    <div class="des">
      <label>{{$t('information.description')}}</label>
      <textarea
        @input="check_is_finished"
        :placeholder="$t('information.description_desc')"
        v-model="active_app.description"
      ></textarea>
    </div>
    <div class="des">
      <label>{{$t('information.resource_patterns')}}</label>
      <textarea :placeholder="$t('information.resource_patterns_desc')" v-model="resource_patterns"></textarea>
    </div>
    <div @click="immersive_status=!immersive_status" class="des immersive">
      <i v-if="!immersive_status" />
      <img v-else src="@/assets/img/ic_v.png" />
      <span>{{$t('information.immersive')}}</span>
    </div>
    <button
      @click="submit_to_database"
      :class="['primary',!can_save ? 'not-finished' : '' ]"
    >{{$t('button.save')}}</button>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
