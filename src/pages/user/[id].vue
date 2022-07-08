<template>
  <div m-100 text-center text-50 text-pink>
    {{ id }}
  </div>
</template>

<script lang="ts" setup>
let route = useRoute();
let id = ref(0);
onMounted(() => {
  id.value = Number(route.params?.id || 0);
});
</script>
