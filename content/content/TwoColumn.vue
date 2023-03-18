<template>
  <div class="grid w-full grid-cols-2 lg:gap-16">
    <div class="prose col-span-2 lg:col-span-1">
      <slot name="left">
        Please add a slot called `left` to this component.
      </slot>
    </div>
    <div class="prose col-span-2 lg:col-span-1">
      <slot name="right">
        Please add a slot called `right` to this component.
      </slot>
    </div>
  </div>
</template>
