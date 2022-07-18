<template>
  <div
    ref="ele"
    w-500
    h-500
    overflow-y-auto
    bg-pink-3
    b-rounded-12
    mx-auto
    my-20
  >
    <div h-200 bg-lime-1></div>
    <div h-200 bg-lime-2></div>
    <div h-200 bg-lime-3></div>
    <div h-200 bg-lime-4></div>
    <div h-200 bg-lime-5></div>
  </div>
  <div text-center color-blue>{{ doubledNum }}</div>
</template>

<script lang="ts" setup>
let ele = ref<HTMLElement | null>(null);
let num = ref(10);
let doubledNum = useDoubled(num);

let actionFn = function (scrollTop: number) {
  console.log(scrollTop, "wuwuwu");
};
onMounted(() => {
  useLoadMore({ ele: ele.value as HTMLElement, actionFn });
  setTimeout(() => {
    num.value = 20;
  }, 2000);
});
</script>
