export function useCounter() {
  const count = ref(0)

  const increment = () => {
    count.value++
  }

  const double = computed(() => count.value * 2)

  return {
    count,
    double,
    increment
  }
}
