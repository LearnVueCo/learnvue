<template>
  <div class="grid w-full grid-cols-2 lg:gap-16">
    <div class="col-span-2 lg:col-span-1 prose dark:prose-invert">
      <slot name="left">
        Please add a slot called `left` to this component.
      </slot>
    </div>
    <div class="col-span-2 lg:col-span-1 prose dark:prose-invert">
      <slot name="right">
        Please add a slot called `right` to this component.
      </slot>
    </div>
  </div>
</template>
