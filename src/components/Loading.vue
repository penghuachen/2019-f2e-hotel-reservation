<template>
  <custom-loading
    :active.sync="isLoading"
    :can-cancel="true"
    loader="dots"
    background-color="#000000"
    :height="100"
    :width="100"
    color="#ffffff"
    :is-full-page="fullPage"
  />
</template>

<script>
import { customLoading } from "@/plugins/vue-loading-overlay.js";

export default {
  props: {
    isLoading: {
      type: Boolean,
    },
    fullPage: {
      type: Boolean,
    },
  },
  components: {
    "custom-loading": customLoading,
  },
};
</script>
