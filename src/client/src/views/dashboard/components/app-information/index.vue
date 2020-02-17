<template>
  <div class="dashboard-desktop-information">
    <section class="app-info">
      <div class="app-info-content f f-column">
        <div class="app-info-top">
          <div v-if="active_app.app_id" class="app-info-meta f">
            <mixin-input
              label="Mixin ID"
              disabled
              v-model="active_app.app_number"
              class="app-info-mixin-id"
            ></mixin-input>
            <div class="app-info-icon">
              <label>{{$t('information.icon')}}</label>
              <div class="app-info-upload-and-show-icon">
                <input type="file" @change="getFile" ref="upload_dom" />
                <div class="no-pic" v-if="!icon_base64 && !active_app.icon_url">
                  <img src="@/assets/img/svg/img.svg" />
                  <p>{{$t('information.icon_desc')}}</p>
                </div>
                <img v-else class="app-info-icon-img" :src="icon_base64 || active_app.icon_url" />
              </div>
            </div>
          </div>
          <div :class="['app-info-edit-main','f' ]">
            <div class="app-info-edit-list f f-column">
              <mixin-input
                :label="$t('information.app_id')"
                disabled
                width
                v-model="active_app.app_id"
                class="app-info-item"
              ></mixin-input>
              <mixin-input
                @input="check_is_finished"
                :label="$t('information.name')"
                width
                v-model="app_name"
                class="app-info-item"
              ></mixin-input>
              <mixin-input
                :label="$t('information.home_url')"
                width
                @input="check_is_finished"
                v-model="active_app.home_uri"
                class="app-info-item"
              ></mixin-input>
              <mixin-input
                @input="check_is_finished"
                :label="$t('information.oauth_url')"
                width
                v-model="active_app.redirect_uri"
                class="app-info-item"
              ></mixin-input>
            </div>
          </div>
        </div>
        <div class="app-info-description">
          <div class="app-info-description-c" style="margin-bottom:32px;">
            <label style="margin-bottom:16px">{{$t('information.description')}}</label>
            <textarea
              @input="check_is_finished"
              :placeholder="$t('information.description_desc')"
              v-model="active_app.description"
            ></textarea>
          </div>
          <div class="app-info-description-c" style="margin-bottom:32px;">
            <label style="margin-bottom:16px">{{$t('information.resource_patterns')}}</label>
            <textarea
              :placeholder="$t('information.resource_patterns_desc')"
              v-model="resource_patterns"
            ></textarea>
          </div>
          <div class="app-info-description-c">
            <i v-if="!immersive_status" @click="immersive_status=!immersive_status" />
            <img @click="immersive_status=!immersive_status" v-else src="@/assets/img/ic_v.png" />
            <span @click="immersive_status=!immersive_status">{{$t('information.immersive')}}</span>
          </div>
        </div>
        <button
          @click="submit_to_database"
          :class="['primary',!can_save ? 'app-info-not-finished' : '' ]"
        >{{$t('button.save')}}</button>
      </div>
    </section>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
