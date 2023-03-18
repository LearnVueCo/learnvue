<script>
export default {
  data() {
    return {
      uppercase: '',
    }
  },
  methods: {
    handleCustomChange(s) {
      this.uppercase = s
    },
  },
}
</script>

<template>
  <div class="p-4">
    <DemoEmitIntermediateChild @custom-change="handleCustomChange" />
    <p>Uppercase: {{ uppercase }}</p>
  </div>
</template>
