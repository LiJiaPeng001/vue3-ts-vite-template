import { Ref } from "vue";

export default function useDoubled(num: Ref<number>) {
  return computed(() => num.value * 2)
}