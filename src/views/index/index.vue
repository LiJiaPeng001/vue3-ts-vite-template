<template>
  <div class="container">
    <div class="text">x：{{ x }}</div>
    <div class="text">y：{{ y }}</div>
    <div class="text">{{ sRGBHex }}</div>
    <button class="btn" @click="open()">open rgb</button>
    <br />
    <button class="btn" @click="fetchData()">fetchData</button>
    <br />
    <button class="btn" @click="openDialog">base-dialog</button>
    <base-dialog v-model:visible="visible">
      <div ref="content" class="scroll-content" @touchmove.stop>
        <div v-for="it in 10" :key="it" class="item"></div>
      </div>
    </base-dialog>
  </div>
</template>

<script lang="ts" setup>
import request from "@/utils/request/index";
import BaseDialog from "@/common/base-dialog/index.vue";

const { x, y } = useMouse();
const { sRGBHex, open } = useEyeDropper();
let visible = ref(false);

async function fetchData() {
  let d = await request({
    url: "/test",
  });
  console.log(d);
}
function openDialog() {
  visible.value = true;
}

const content = ref<HTMLElement | null>(null);
let initialPageY = ref<number>(0);

onMounted(() => {
  content.value?.addEventListener("touchstart", (e: TouchEvent) => {
    initialPageY.value = e.changedTouches[0].pageY;
    console.log(initialPageY.value);
  });
  content.value?.addEventListener("touchmove", loadOver, { passive: false });
});

function loadOver(e: TouchEvent) {
  const { scrollTop, clientHeight, scrollHeight } =
    content.value as HTMLElement;
  const deltaY = e.changedTouches[0].pageY - initialPageY.value;
  // 禁止向上滚动溢出
  if (e.cancelable && deltaY > 0 && scrollTop <= 0) {
    e.preventDefault();
  }
  // 禁止向下滚动溢出
  if (e.cancelable && deltaY < 0 && scrollTop + clientHeight >= scrollHeight) {
    e.preventDefault();
  }
}
</script>

<style lang="less" scoped>
.container {
  text-align: center;
  height: 200vh;
  background-image: linear-gradient(to bottom #ccd2e4 #dfa8dd);
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
.scroll-content {
  width: 300px;
  height: 300px;
  overflow-y: scroll;
  .item {
    height: 100px;
    background-color: #000;
    border: 1px solid red;
  }
}
</style>
