<template>
  <div class="container">
    <container></container>
  </div>
</template>

<script lang="ts" setup>
const container = defineComponent({
  render() {
    return h("div", "test");
  },
});
</script>
