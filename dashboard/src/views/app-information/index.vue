<template>
  <div class="content f f-column">
    <div class="top">
      <div class="meta f">
        <mixin-input
          v-if="active_app.app_id"
          label="Mixin ID"
          disabled
          v-model="active_app.app_number"
          class="mixin-id"
        ></mixin-input>
        <div class="icon">
          <label>{{$t('information.icon')}}</label>
          <div class="upload-icon">
            <input type="file" accept="image/*" @change="getFile" ref="upload_dom" />
            <img
              :class="['icon-img' , !icon_base64 && !active_app.icon_url? 'no-img' : '']"
              :src="icon_base64 || active_app.icon_url || require('@/assets/img/svg/img.svg')"
            />
            <p
              :class="[!icon_base64 && !active_app.icon_url ? '' : 'none']"
            >{{$t('information.icon_desc')}}</p>
          </div>
        </div>
      </div>
      <div :class="['edit-main','f' ]">
        <div class="edit-list f f-column">
          <mixin-input
            v-if="active_app.app_id"
            :label="$t('information.app_id')"
            disabled
            width
            v-model="active_app.app_id"
            class="item"
          ></mixin-input>
          <mixin-input
            @input="check_is_finished"
            :label="$t('information.name')"
            width
            v-model="app_name"
            class="item"
          ></mixin-input>
          <mixin-input
            :label="$t('information.home_url')"
            width
            @input="check_is_finished"
            v-model="active_app.home_uri"
            class="item"
          ></mixin-input>
          <mixin-input
            @input="check_is_finished"
            :label="$t('information.oauth_url')"
            width
            v-model="active_app.redirect_uri"
            class="item"
          ></mixin-input>
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
