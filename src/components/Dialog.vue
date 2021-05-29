<template>
  <transition name="fade">
    <div v-if="dialogVisible" class="dialog-wrapper">
      <div class="cover" @click="close"></div>
      <div class="dialog" ref="dialog">
        <div class="dialog-header">
          <slot name="header"></slot>
        </div>
        <div class="dialog-body">
          <slot name="body"></slot>
        </div>
        <div class="dialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      require: true,
    },
    close: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  z-index: 1;
}

.cover {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.4);
}

::v-deep .dialog {
  border-radius: 5px;
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  max-width: 320px;
  background: #ffffff;

  @media (min-width: 576px) {
    max-width: unset;
  }

  &-header {
    margin-bottom: 30px;
    padding: 15px 20px 0;
    h3 {
      font-size: 24px;
    }
    @media (min-width: 576px) {
      padding: 25px 40px 0;
    }
  }

  &-body {
    padding: 0 20px 40px;
    @media (min-width: 576px) {
      padding: 0 40px 40px;
    }
  }

  &-footer {
    padding: 0 20px 15px;
    @media (min-width: 576px) {
      padding: 0 40px 25px;
    }
  }
}

// transition: fade effect
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
