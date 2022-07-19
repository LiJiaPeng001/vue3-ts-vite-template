<template>
  <div text-center font-bold text-30>虚拟滚动</div>
  <div
    ref="ele"
    w-500
    h-600
    overflow-y-auto
    border-style-dashed
    b-rounded-12
    mx-auto
    my-20
    relative
  >
    <!-- 视图层 -->
    <div
      v-for="it in list"
      :key="it"
      border-b-2
      border-b-green-8
      h-200
      bg-green-3
      text-center
      font-600
      lh-200
      text-50
    >
      {{ it }}
    </div>
  </div>
  <div text-center color-blue>{{ doubledNum }}</div>
</template>

<script lang="ts" setup>
let ele = ref<HTMLElement | null>(null);
let num = ref(10);
let doubledNum = useDoubled(num);
let nums: any = ref([]);
let list: any = ref([]);

let actionFn = function (scrollTop: number = 0) {
  if (!list.value.length) {
    list.value = nums.value.slice(0, 8);
    return;
  }
  let itemH = 200;
  let pageH = 600;
  let moreNum = 2;
  let sIndex = Math.floor(scrollTop / itemH);
  let eIndex = sIndex + Math.ceil(pageH / itemH);
  if (eIndex == list.value.length - 1) {
    list.value.splice(0, moreNum);
    let current = nums.value.findIndex(
      (item: number) => item == list.value[list.value.length - 1]
    );
    let pushData = nums.value.slice(current + 1, current + 1 + moreNum);
    list.value.push(...pushData);
  }
  if (sIndex == 0) {
    let current = nums.value.findIndex((item: number) => item == list.value[0]);
    if (current == 0) return;
    let len = list.value.length;
    list.value.splice(len - moreNum, len);
    let pushData = nums.value.slice(Math.abs(current - moreNum), current);
    list.value.unshift(...pushData);
  }
};
onMounted(async () => {
  for (let i = 0; i < 100 * 500; i++) {
    nums.value.push(nums.value.length);
  }
  actionFn();
  useLoadMore({ ele: ele.value as HTMLElement, actionFn, time: 5 });
});

// function load() {
//   if (nums.value.length < 100 * 500) {
//     requestAnimationFrame(() => {
//       for (let i = 0; i < 50; i++) {
//         nums.value.push(nums.value.length);
//       }
//       load();
//     });
//   }
// }
</script>
