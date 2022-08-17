<template>
  <div class="content flex f-column">
    <div class="top">
      <div class="meta flex">
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
          <Croppie ref="croppie" :icon_url="app.icon_url" :toggle_app="toggle_app"></Croppie>
        </div>
      </div>
      <div class="edit-main flex">
        <div class="edit-list flex f-column">
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
              v-model:value="app.name"
              class="item"
            />
            <CategorySelect class="item" v-model:value="category" />
          </div>
          <MInput
            :label="t('information.home_url')"
            :placeholder="t('information.home_url_desc')"
            v-model:value="app.home_uri"
            class="item"
          />
          <MInput
            :label="t('information.oauth_url')"
            :placeholder="t('information.oauth_url_desc')"
            v-model:value="app.redirect_uri"
            class="item"
          />
        </div>
      </div>
    </div>
    <div class="des">
      <label>{{t('information.description')}}</label>
      <textarea
        :placeholder="t('information.description_desc')"
        v-model="app.description"
      ></textarea>
    </div>
    <div class="des">
      <label>{{t('information.resource_patterns')}}</label>
      <textarea
        :placeholder="t('information.resource_patterns_desc')"
        v-model="resource_patterns"
      />
    </div>
    <div class="flex">
      <div @click="isImmersive=!isImmersive" class="des immersive">
        <i v-if="!isImmersive" />
        <img v-else src="@/assets/img/ic_v.png" alt="option-selected"/>
        <span>{{t('information.immersive')}}</span>
      </div>
      <div
        :class="['des', 'encrypted', encryptionAvailable ? '' : 'forbidden']"
        @click="useClickEncryption"
      >
        <img
          v-if="!encryptionAvailable"
          src="@/assets/img/app-svg/forbidden-rect.svg"
          alt="uncheckable-icon"
        />
        <i v-else-if="!isEncrypted" />
        <img v-else src="@/assets/img/ic_v.png" alt="option-selected"/>
        <span>{{t('information.encrypted')}}</span>
        <el-tooltip
          placement="top"
          effect="light"
        >
          <template #content>
            <span class="tip-content">{{ t('information.encrypted_tip') }}</span>
          </template>
          <img
            class="tip"
            v-if="!encryptionAvailable"
            src="@/assets/img/app-svg/help.svg"
            alt="encryption-tip"
          />
        </el-tooltip>
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
