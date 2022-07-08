<template>
  <img
    src="https://ljpeng.fun/static/images/585cd679424fa85350ef78d8c719e068.jpeg"
    class="img"
    :style="{
      left: styles.left + 'px',
      top: styles.top + 'px',
      borderRadius: styles.borderRadius + 'px',
    }"
  />
</template>

<script lang="ts" setup>
let styles = ref<{ left: number; top: number; borderRadius: number }>({
  left: 0,
  top: 0,
  borderRadius: 0,
});

let route = useRoute();

onMounted(() => {
  console.log("mounted  ~~~");
});

watchEffect(() => {
  if (route.fullPath) {
    styles.value.left = Math.random() * (1000 - 100) + 100;
    styles.value.top = Math.random() * (1000 - 100) + 100;
    styles.value.borderRadius = Math.random() * (100 - 10) + 10;
  }
});
</script>

<style lang="less" scoped>
.img {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  display: block;
  transition: 0.4s linear;
}
</style>
