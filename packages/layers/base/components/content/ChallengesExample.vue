<template>
  <div class="bg-highlight c-example rounded p-4">
    <h3 class="mb-4">🏁 Example Output</h3>
    <slot />
  </div>
</template>

<style scoped>
.c-example table {
  border: 1px solid;
  width: 100%;
  margin-top: 4rem;
  border-radius: 1rem;
  overflow: hidden;
  padding: 2rem;
  /* @apply mt-4 border w-full rounded overflow-hidden; */
}

.c-example th {
  text-align: left;
  text-decoration: underline;
}
/* .c-example th {
  @apply text-left underline;
} */
</style>
