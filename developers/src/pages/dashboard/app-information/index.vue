<template>
  <div class="content f f-column">
    <div class="top">
      <div class="meta f">
        <MInput
          v-if="app.app_id"
          label="Mixin ID"
          disabled
          is-copied="true"
          v-model:value="app.app_number"
          class="mixin-id"
        />
        <div class="icon">
          <label>{{t('information.icon')}}</label>
          <Croppie ref="croppie" :icon_url="icon_url" :toggle_app="toggle_app"></Croppie>
        </div>
      </div>
      <div class="edit-main f">
        <div class="edit-list f f-column">
          <MInput
            v-if="app.app_id"
            :label="t('information.app_id')"
            disabled
            is-copied="true"
            v-model:value="app.app_id"
            class="item"
          />
          <div class="name-category">
            <MInput
              :label="t('information.name')"
              :placeholder="t('information.name_desc')"
              v-model:value="name"
              class="item"
            />
            <CategorySelect class="item" v-model:value="category" />
          </div>
          <MInput
            :label="t('information.home_url')"
            :placeholder="t('information.home_url_desc')"
            v-model:value="home_uri"
            class="item"
          />
          <MInput
            :label="t('information.oauth_url')"
            :placeholder="t('information.oauth_url_desc')"
            v-model:value="redirect_uri"
            class="item"
          />
        </div>
      </div>
    </div>
    <div class="des">
      <label>{{t('information.description')}}</label>
      <textarea
        :placeholder="t('information.description_desc')"
        v-model="description"
      ></textarea>
    </div>
    <div class="des">
      <label>{{t('information.resource_patterns')}}</label>
      <textarea
        :placeholder="t('information.resource_patterns_desc')"
        v-model="resource_patterns"
      />
    </div>
    <div class="f">
      <div @click="isImmersive=!isImmersive" class="des immersive">
        <i v-if="!isImmersive" />
        <img v-else src="@/assets/img/ic_v.png" alt="option-selected"/>
        <span>{{t('information.immersive')}}</span>
      </div>
      <div v-if="hasEncrypted" @click="useClickEncryption" class="des encrypted">
        <i v-if="!isEncrypted" />
        <img v-else src="@/assets/img/ic_v.png" alt="option-selected"/>
        <span>{{t('information.encrypted')}}</span>
      </div>
    </div>
    <button
      @click="useClickSubmit"
      :class="['primary', !allowSubmit ? 'not-finished' : '' ]"
    >{{t('button.save')}}</button>
    <confirm
      :content="t('information.encrypted_confirm')"
      :show="showConfirmModal"
      @confirm="useConfirmEncryption"
      @close-modal="closeModal"
    />
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
