<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)

function getFrontmatter(doc: any) {
  return Object.fromEntries(
    Object.keys(doc)
      .filter((key) => key.charAt(0) !== '_' && key !== 'body')
      .map((key) => {
        return [key, doc[key]]
      })
  )
}

const t = useState('test', () => 0)
</script>
<template>
  <div class="p-16 text-default bg-default">
    <div class="container max-w-4xl">
      <header class="flex items-center">
        <p class="text-2xl font-bold">LearnVue Content Previews</p>
        <button
          class="hover:text-highlight flex items-center transition-opacity ml-auto"
          @click="toggleDark()"
        >
          <Icon
            :name="!isDark ? 'ri:sun-line' : 'ri:moon-line'"
            class="text-xl"
          />
        </button>
      </header>

      <article class="mt-32">
        <ContentDoc v-slot="{ doc }">
          <details>
            <summary>Frontmatter</summary>
            <table class="mt-4">
              <tr
                v-for="(value, key) in getFrontmatter(doc)"
                :key="key"
                class="border-t-2"
              >
                <td class="pr-4">{{ key }}</td>
                <td class="py-2">{{ value }}</td>
              </tr>
            </table>
          </details>

          <h1 class="text-5xl font-extrabold mt-4">{{ doc.title }}</h1>
          <ContentRenderer :value="doc" class="prose article mt-4" />
        </ContentDoc>
      </article>
    </div>
  </div>
</template>
