<template>
  <div :style="is_new_app ? 'top:0;' : 'top:44px;'" class="dashboard-app-information dashboard-app">
    <div class="app-info-icon-and-id f">
      <div class="app-info-item app-info-icon">
        <label>{{$t('information.icon')}}</label>
        <div class="app-info-file">
          <input type="file" @change="getFile" ref="upload_dom" />
          <template v-if="icon_base64 || active_app.icon_url">
            <img :src="icon_base64 || active_app.icon_url" />
          </template>
          <template v-else>
            <div class="app-info-new-icon">
              <img class="no-pic" src="@/assets/img/app-svg/image.svg" />
            </div>
          </template>
        </div>
      </div>
      <div class="app-info-new-icon-des">{{$t('information.icon_desc')}}</div>
    </div>
    <div class="app-info-edit-main">
      <template v-if="!is_new_app">
        <div class="app-info-item app-info-appnumber">
          <div>Mixin ID</div>
          <div class="copy-container">
            <input disabled v-model="active_app.app_number" />
            <img
              src="@/assets/img/ic_copy.png"
              v-clipboard:copy="active_app.app_number"
              　　v-clipboard:success="click_copy_succuess"
              　　v-clipboard:error="click_copy_error"
            />
          </div>
        </div>
        <div class="app-info-item app-info-appid">
          <div>{{$t('information.app_id')}}</div>
          <div class="copy-container">
            <textarea disabled v-model="active_app.app_id" />
            <img
              src="@/assets/img/ic_copy.png"
              v-clipboard:copy="active_app.app_id"
              　　v-clipboard:success="click_copy_succuess"
              　　v-clipboard:error="click_copy_error"
            />
          </div>
        </div>
      </template>
      <div class="app-info-item">
        <div>{{$t('information.name')}}</div>
        <div>
          <input
            @input="check_is_finished"
            :placeholder="$t('information.name_desc1')"
            v-model="app_name"
          />
        </div>
      </div>
      <div class="app-info-item">
        <div>{{$t('information.home_url')}}</div>
        <div>
          <input
            @input="check_is_finished"
            :placeholder="$t('information.home_url_desc')"
            v-model="active_app.home_uri"
          />
        </div>
      </div>
      <div class="app-info-item">
        <div>{{$t('information.oauth_url')}}</div>
        <div>
          <input
            @input="check_is_finished"
            :placeholder="$t('information.oauth_url_desc')"
            v-model="active_app.redirect_uri"
          />
        </div>
      </div>
      <div class="app-info-item">
        <div>{{$t('information.description')}}</div>
        <div>
          <textarea
            @input="check_is_finished"
            :placeholder="$t('information.description_desc')"
            v-model="active_app.description"
          ></textarea>
        </div>
      </div>
      <div class="app-info-item">
        <div>{{$t('information.resource_patterns')}}</div>
        <div>
          <textarea
            @input="check_is_finished"
            :placeholder="$t('information.resource_patterns_desc')"
            v-model="resource_patterns"
          ></textarea>
        </div>
      </div>
      <div class="app-info-item">
        <i v-if="!immersive_status" @click="immersive_status=!immersive_status" />
        <img
          class="immersive_icon"
          @click="immersive_status=!immersive_status"
          v-else
          src="@/assets/img/ic_v.png"
        />
        <span @click="immersive_status=!immersive_status">{{$t('information.immersive')}}</span>
      </div>
    </div>
    <div
      :class="['app-info-button-to-save', can_save ? 'app-info-button-to-save-active' : '']"
      @click="submit_to_database"
    >{{$t('button.save')}}</div>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
@import "./style.scss";
</style>