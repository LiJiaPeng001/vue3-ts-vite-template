<template>
  <hello-world></hello-world>
  <Image />
  <router-view></router-view>
</template>

<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import Image from "@/components/image.vue";
</script>
