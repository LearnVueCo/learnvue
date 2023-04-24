---
author: Matt Maribojoc
title: How and Why to Use Wrapper Components in Vue 3
snippet: Wrapper components are insanely useful for making your codebase more organized and more professional.
publishedDate: 2020/02/18
tags: best practices,vue3
slug: how-and-why-to-use-wrapper-components-in-vue3
category: Quick Tips
cover: articles/vue-wrapper-components
---
**Wrapper components are insanely useful** for making your codebase more organized and more professional.

Generally, a wrapper component is a custom component that modifies a native element or 3rd party library by adding some custom functionality, styles, or anything else really.

By the end of this tutorial, you will…

- Understand the value of using wrapper components
- Know when to use them
- Build an example input wrapper component

Enough talk! Let’s begin.

## Why should we even use wrapper components?

As we were saying, wrapper components are useful for both organizing your code and extending native/external elements.

**Okay…but how does it help our organization??**

For our example, let’s imagine that we are building a wrapper component for the default text input.

Using wrapper components creates a natural inheritance – `Parent Element` > `TextInputWrapper` > `Input`.

Inside `TextInputWrapper`, we can add custom styles, transitions, and extend the default usage of the input element. If we didn’t have a wrapper, we would have to make all of these edits directly to our input element in EVERY component that uses the fancier input.

A wrapper component gives us a [reusable component](https://learnvue.co/2019/12/building-reusable-components-in-vuejs-tabs/) that we can just import and use as is. Now, if we want to change functionality, we only have to edit one file instead of potentially dozens.

So not only do wrapper components help us to keep our code as DRY as possible, but it also builds a more modular and scalable project. For example, if we wanted multiple types of custom text inputs.

## Alright…let’s actually do it

Okay, now that we actually know what wrapper components are and how they can be useful, let’s actually build the example we were talking about.

For the text input example that we were talking about earlier, let’s make a wrapper component for the native text input.

This is the component we’re building on top of.

```vue
<template>
  <div>
    {{ label }}
    <input />
  </div>
</template>

<script>
export default {
  props: ['label'],
}
</script>

<style scoped></style>
```

**To make a wrapper in Vue 3 is insanely simple**. We just have to understand a propertyof a Vue instance: `$attrs`.

`$attrs` contains all of the non-prop attributes and non-emitted events passed to our component.

In Vue2, if we didn’t explicitly define a prop in our component, it was added to the root of the component’s children. However, if we set the `inheritAttrs` instance property to false, we could override this property and can use the $attrs property to pass data through our wrapper component.

However, now in Vue 3, the default binding to the component children no longer happens so there is nothing to override.

Plus, a component’s non-emitted event listeners that used to be accessed via the $listeners property are also now included in $attrs.

```vue
<template>
  <div>
    {{ label }}
    <input v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  props: ['label'],
}
</script>

<style scoped></style>
```

With the basic text input now working, we can add some customization to our wrapper component. Some ways to extend it are adding custom event listeners, different styles, or something a label attribute to label our input.

Great. Our wrapper component is set up! Now, here’s an example of how we could include it into a component.

```html
<text-input label="hello" v-model="state.textVal" placeholder="Hello World" />
```

If you really want to go into more depth with how v-model, $attrs, and v-bind work in Vue 3, here is a [great slide deck by Chris Fritz](https://github.com/chrisvfritz/vue-3-trends/blob/master/slides-2019-03-vueconfus.pdf)

## What else is possible?

The example we just covered is a really simple usage for wrapper components, but it shows one of the main use cases: wrapping native elements to add more functionality.

It’s also a very great technique for incorporating third party libraries or plugins into your Vue project. It allows you to have more predictable control over the actions of certain elements.

In conclusion, wrapper components, especially in larger projects, are a great way to develop a more reusable, organized, and predictable codebase.

After this quick article, you should know why wrapper components are useful and how to structure them using `v-model`, passing `$attrs`, and passing `$listeners` in Vue 3. Hopefully, you learned a thing or two and as always, if you have any questions, let me know!!

Happy coding!
