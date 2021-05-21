<template>
  <svg class="svg-icon">
    <!-- 優化 svg icon 封裝的部分 -->
    <!-- <use :xlink:href="`${ iconName }`" /> -->
    <use xlink:href="#wifi" />
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
  width: 8rem;
  height: 8rem;
  fill: currentColor !important;
  overflow: hidden;
}
</style>
