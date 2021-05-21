<template>
  <svg class="svg-icon">
    <use :xlink:href="`#${ iconName }`" />
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-icon {
  // 等同於在 svg tag 中設定 fill
  width: 28px;
  height: 28px;
  fill: currentColor !important;
  overflow: hidden;
}
</style>
