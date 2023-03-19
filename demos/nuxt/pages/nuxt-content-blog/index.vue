<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () =>
  queryContent('/blog').find()
)
</script>

<template>
  <div class="mt-8">
    <h1 class="text-3xl font-bold text-white">Example Blog</h1>
    <p class="mt-2">This is a blog made with Nuxt Content.</p>
    <ul class="grid grid-cols-12 gap-8 mt-8">
      <li
        v-for="post in posts"
        :key="post._id"
        class="flex flex-col col-span-12 p-8 rounded-lg lg:col-span-4 md:col-span-6 bg-charcoal-700"
      >
        <h2 class="mb-8 text-xl font-bold text-white font-white">
          {{ post.title }}
        </h2>
        <div class="mt-auto">
          <NuxtLink
            :to="post._path"
            class="px-2 py-1 text-sm font-medium text-white rounded bg-green hover:bg-green-400"
          >
            Read More
          </NuxtLink>
        </div>
      </li>
    </ul>
  </div>
</template>
