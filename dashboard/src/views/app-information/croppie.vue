<template>
  <div
    v-if="toogle_component"
    class="croppie-page"
    :style="{width: size + 'px', height: size + 'px'}"
  >
    <div class="file-uploader" v-show="!tmp_file">
      <input type="file" accept="image/*" @change="croppie" ref="upload_dom" />
      <img class="icon-url" :src="icon_url" v-if="icon_url" />
      <template v-else>
        <img src="@/assets/img/svg/img.svg" />
        <p>{{$t('information.icon_desc')}}</p>
      </template>
    </div>
    <img v-show="tmp_file" @click="reset_img" class="reset-img" src="@/assets/img/svg/reset.svg" />
    <div v-if="tmp_file && resize_status" class="croppie">
      <vue-croppie
        ref="croppieRef"
        :enableZoom="true"
        :mouseWheelZoom="false"
        :showZoomer="false"
        :enableResize="false"
        :boundary="{ width: size, height: size}"
        :viewport="{ width: size, height: size, 'type':'square' }"
      ></vue-croppie>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon_url: {
      type: String,
      default: ""
    },
    toogle: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      resize_status: true,
      size: null,
      tmp_file: null,
      toogle_component: true
    };
  },
  watch: {
    toogle() {
      this.toogle_component = false;
      this.$nextTick(() => (this.toogle_component = true));
      this.tmp_file = null;
    }
  },
  methods: {
    croppie(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.tmp_file = e;
      var reader = new FileReader();
      reader.onload = e => {
        this.$refs.croppieRef &&
          this.$refs.croppieRef.bind({
            url: e.target.result
          });
      };
      reader.readAsDataURL(files[0]);
    },
    crop() {
      return new Promise(resolve => {
        if (!this.tmp_file) return resolve(false);
        let options = {
          type: "base64",
          size: { width: 320, height: 320 },
          format: "jpeg"
        };
        this.$refs.croppieRef.result(options, output => resolve(output));
      });
    },
    reset_img() {
      this.$refs.upload_dom.click();
    }
  },
  mounted() {
    let clientWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    this.size = clientWidth > 1120 ? 320 : 128;
    window.addEventListener("resize", e => {
      let { document } = e.target;
      let clientWidth =
        document.documentElement.clientWidth || document.body.clientWidth;
      if (clientWidth <= 1120) {
        if (this.size === 128) return;
        this.size = 128;
        if (!this.tmp_file) return;
        this.resize_status = false;
        this.$nextTick(() => {
          this.resize_status = true;
          this.croppie(this.tmp_file);
        });
      } else {
        if (this.size === 320) return;
        this.size = 320;
        if (!this.tmp_file) return;
        this.resize_status = false;
        this.$nextTick(() => {
          this.resize_status = true;
          this.croppie(this.tmp_file);
        });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
/deep/ .cr-viewport {
  border: 0 !important;
  box-shadow: none !important;
}
.croppie-page {
  position: relative;
}

.reset-img {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
}

.croppie {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.file-uploader {
  position: relative;

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

  input {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 50%;
  }

  p {
    text-align: center;
    width: 8.75rem;
    font-size: 0.88rem;
    color: #a9b0bf;
  }

  &:active {
    background: rgba(250, 250, 250, 1);
  }

  .icon-url {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  @media screen and (min-width: 70rem) {
    p {
      margin-top: 1rem;
    }
  }

  @media screen and (max-width: 70rem) {
    p {
      position: absolute;
      left: calc(100% + 1rem);
    }
  }
}
</style>
