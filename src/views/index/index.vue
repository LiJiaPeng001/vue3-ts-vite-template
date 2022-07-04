<template>
  <div class="container">
    <div class="text">x：{{ x }}</div>
    <div class="text">y：{{ y }}</div>
    <div class="text">{{ sRGBHex }}</div>
    <button class="btn" @click="open()">open rgb</button>
    <br />
    <button class="btn" @click="fetchData()">fetchData</button>
  </div>
</template>

<script lang="ts" setup>
import request from "@/utils/request/index";

const { x, y } = useMouse();
const { sRGBHex, open } = useEyeDropper();

async function fetchData() {
  let d = await request({
    url: "/test",
  });
  console.log(d);
}

console.log(sRGBHex.value);
</script>

<style lang="less" scoped>
.container {
  text-align: center;
  .text {
    margin: 50px 0;
    font-size: 30px;
    font-weight: bold;
  }
  .mouse-part {
    width: 500px;
    height: 500px;
    margin: 0 auto;
    background-color: pink;
  }
  .btn {
    margin-bottom: 10px;
  }
}
</style>
