<template>
  <div v-if="toggle_view" class="croppie-page">
    <div class="file-uploader" v-if="!tmp_file" @click="useReset">
      <img class="icon-url" :src="icon_url" v-if="icon_url"/>
      <template v-else>
        <img src="@/assets/img/svg/img.svg" alt="default-img-icon"/>
        <p>{{ t('information.icon_desc') }}</p>
      </template>
    </div>
    <div v-else class="croppie" @click="useReset">
      <vue-croppie
        ref="croppieRef"
        :enableZoom="true"
        :mouseWheelZoom="false"
        :showZoomer="false"
        :enableResize="false"
        :enableOrientation="true"
        :boundary="{ width: size, height: size}"
        :viewport="{ width: size, height: size, 'type':'circle' }"
      ></vue-croppie>
    </div>
    <input type="file" accept="image/*" @change="useCroppie" ref="uploadDom" @click="useClick"/>
  </div>
</template>

<script>
import {
  nextTick,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  props: {
    icon_url: {
      type: String,
      default: '',
    },
    toggle_app: {
      type: Number,
      default: 0,
    },
  },
  setup(props, ctx) {
    const { t } = useI18n();
    const uploadDom = ref(null);
    const croppieRef = ref(null);

    const state = reactive({
      size: null,
      tmp_file: null,
      toggle_view: true,
    });
    const useCroppie = (e) => {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      state.tmp_file = e;
      const reader = new FileReader();
      // eslint-disable-next-line no-shadow
      reader.onload = (e) => {
        if (croppieRef.value) {
          croppieRef.value.bind({
            url: e.target.result,
          });
        }
      };
      reader.readAsDataURL(files[0]);
    };
    const useClick = () => {
    };
    const useReset = () => {
      uploadDom.value.click();
    };

    const crop = () => new Promise((resolve) => {
      if (!state.tmp_file) resolve(false);
      const options = {
        type: 'base64',
        size: { width: 512, height: 512 },
        format: 'png',
      };
      croppieRef.value.result(options, (output) => resolve(output));
    });
    ctx.expose({
      crop,
    });

    watch(() => props.toggle_app, () => {
      state.toggle_view = false;
      nextTick(() => { state.toggle_view = true; });
      state.tmp_file = null;
    });

    return {
      uploadDom,
      croppieRef,
      ...toRefs(state),
      useReset,
      useCroppie,
      useClick,
      t,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
:deep(.cr-viewport) {
  border: 0 !important;
  box-shadow: none !important;
}

.croppie-page {
  width: 15rem;
  height: 15rem;
  position: relative;

  & > input {
    width: 0;
    height: 0;
  }
}

.croppie {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.file-uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 50%;

  img {
    border-radius: 0;
  }

  p {
    text-align: center;
    width: 8.75rem;
    font-size: 0.88rem;
    color: #a9b0bf;
    margin-top: 1rem;
  }

  &:active {
    background: rgba(250, 250, 250, 1);
  }

  .icon-url {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

@media screen and (max-width: 70rem) {
  .file-uploader p {
    margin-top: 0;
    position: absolute;
    left: calc(100% + 1rem);
  }
}
</style>
