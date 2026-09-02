<template>
  <div class="security-page">
    <div class="security-card">
      <div class="security-field">
        <div class="field-heading">
          <label for="allowed-ips">{{ t('security.allowed_ips') }}</label>
          <span>{{ t('security.entry_count', { count: allowedIpCount }) }}</span>
        </div>
        <p class="field-description">{{ t('security.allowed_ips_desc') }}</p>
        <textarea
          id="allowed-ips"
          v-model="allowed_ips"
          :placeholder="t('security.allowed_ips_placeholder')"
          rows="6"
        ></textarea>
        <p class="field-hint">{{ t('security.allowed_ips_hint') }}</p>
      </div>

      <div class="security-divider"></div>

      <div class="security-field">
        <div class="field-heading">
          <label for="resource-patterns">{{ t('security.resource_patterns') }}</label>
          <span>{{ t('security.entry_count', { count: resourcePatternCount }) }}</span>
        </div>
        <p class="field-description">{{ t('security.resource_patterns_desc') }}</p>
        <textarea
          id="resource-patterns"
          v-model="resource_patterns"
          :placeholder="t('security.resource_patterns_placeholder')"
          rows="6"
        ></textarea>
        <p class="field-hint">{{ t('security.resource_patterns_hint') }}</p>
      </div>

      <div class="security-actions">
        <button
          class="primary"
          type="button"
          :disabled="submitting"
          @click="useClickSubmit"
        >{{ t('button.save') }}</button>
      </div>
    </div>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
  @use "./style.scss";
</style>
