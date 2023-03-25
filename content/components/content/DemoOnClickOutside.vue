<script setup>
import { ref } from 'vue'

const open = ref(false) // state of our popup
const popup = ref() // template ref
// whenever our popup exists, and we click anything BUT it
onClickOutside(popup, () => {
  open.value = false
})
</script>

<template>
  <div class="relative h-full p-8">
    <button @click="open = true">Open Popup</button>
    <div v-if="open" class="popup">
      <div ref="popup" class="popup-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
        aliquid autem reiciendis eius accusamus sequi, ipsam corrupti vel
        laboriosam necessitatibus sit natus vero sint ullam! Omnis commodi eos
        accusantium illum?
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  border: none;
  outline: none;
  margin-right: 10px;
  background-color: #2ecc71;
  color: white;
  padding: 5px 10px;
}
.popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}
.popup-content {
  min-width: 300px;
  padding: 20px;
  width: 30%;
  background: #fff;
  color: black;
}
</style>
