<script setup lang="ts">
// we can also use defineOptions to set options like inheritAttrs
defineOptions({
  name: 'SimpleText',
  inheritAttrs: false
})
// for this to work in the current state of vite-plugin-vue, edit @vue/compiler-sfc/compiler-sfc.cjs.js to remove checks for `options.propsDestructure`

// working
const { msg = 'Default Value' } = defineProps<{ msg?: string }>()

// this will only give a runtime error (limits of typescript, might be somehow worked into Volar?)
// const { msg = 4 } = defineProps<{ msg?: string }>()

// same issue where Typescript can't say that the left MUST be type of the right
// const { msg = 'Default Value' } = defineProps<{ msg?: string, test: number }>()

// old syntax (withDefaults)
// const props = withDefaults(defineProps<{ msg?: string }>(), { msg: 'Default Value' })
</script>

<template>
  <p>
    {{ msg }}
  </p>
</template>
