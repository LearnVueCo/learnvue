---
author: Matt Maribojoc
title: Explaining The New script setup Type in Vue 3 - RFC Takeaways
snippet: The script setup is a proposed change in the Vue’s Git RFCs. It provides developers with a more concise syntax to write single file components.
publishedDate: 2021/05/13
tags: rfc,vite,vue 3
videoLink: https://youtube.com/v/77yGP5K_Lt8
category: Vue Essentials
cover: articles/script-setup
---
If you’ve been working in [Vite and Vue 3](https://learnvue.co/2020/12/setting-up-your-first-vue3-project-vue-3-0-release/) recently, you’ll notice that when you start a new project, your script section looks like this with this script syntax in your Vue components.

```vue
<script setup>
import HelloWorld from './components/HelloWorld.vue'
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>
```

You may be wondering, _“What is this? Is this the Options API? Composition API? where’s the setup method?”_

[The &lt;script setup&gt; type is a proposed change in the Vue’s Git RFCs](https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md). To be clear, this is not intended to completely replace any of the current ways to write code. Its purpose is to provide developers with a more **concise syntax to write their single file components.**

In this article, we’re going to be taking a look at exactly how it works and some of the ways that it can be useful.

Alright – let’s go.

## A rundown of script setup

In `<script setup>`, we don’t have to declare an `export default` and a `setup` method – instead, **all top-level bindings are exposed to the template**

In the Composition API, we’re used to having to create our setup method and then return anything that we want exposed. Something like this…

```vue{}[App.vue]
<script>
  import { ref, computed } from 'vue'
  export default {
     setup () {
        const a = ref(3)
        const b = computed(() => a.value + 2)

        const changeA = () => { a.value = 4 }
        return { a, b, changeA } // have to return everything!
     }
  }
</script>
```

But with `script setup`, we can rewrite the same code like this..

```vue{}[App.vue]
<script setup>
  import { ref, computed } from 'vue'
  // all of these are automatically bound to the template
  const a = ref(3)
  const b = computed(() => a.value + 2)

  const changeA = () => { a.value = 4 }
</script>
```

And it’s not just data, [computed properties](https://learnvue.co/2019/12/mastering-computed-properties-in-vuejs/), and methods! Even [imported directives](https://learnvue.co/2020/01/creating-your-first-vuejs-custom-directive/) and components that are on the top level of our setup scope are automatically available in our template.

Look at this example of importing a component.

```vue
<template>
  <component-b />
</template>
<script setup>
import ComponentB from './components/ComponentB.vue' // really that's it!
</script>
```

Amazing, right?

## So….what’s the point of this?

Long story short, this syntax makes single file components simpler.

In the exact words of the RFC, “the proposal’s main goal is reducing the verbosity of Composition API usage inside SFCs by directly exposing the context of script setup to the template.”

> The proposal’s main goal is reducing the verbosity of Composition API usage inside SFCs by directly exposing the context of `<script setup>` to the template.

And that’s exactly what we just saw, by not having to worry about creating a `setup` method and returning exactly what we want to expose, we can simplify our code.

Plus there’s no worry of forgetting to return something from our setup method (something I know I do all the time).

## More advanced usage

Now that we know what `<script setup>` even is and why it can be useful, let’s take a look at some of its more advanced features.

### Accessing props, emitting events, etc

First off, you may be wondering how to perform standard Vue operations like….

- [accessing props](https://learnvue.co/2020/08/an-introduction-to-vue3-props-a-beginners-guide/);
- [emitting events](https://learnvue.co/2020/01/a-vue-event-handling-cheatsheet-the-essentials/); and
- accessing our context object.

In the Composition API, these were simply arguments on our setup method,

```js
export default {
  setup(props, context) {
    // context has attrs, slots, and emit
  },
}
```

However, in the script setup syntax, we can access these same options with 3 imports from Vue.

- `defineProps` – as the name suggests, allows us to define props for our component
- `defineEmits` – lets us define the events that our component can emit
- `useContext` – gives us access to the slots and attributes of our component

```vue
<template>
  <button @click="$emit('change')">Click Me</button>
</template>
<script setup>
import { defineProps, defineEmit, useContext } from 'vue'

const props = defineProps({
  foo: String,
})
const emit = defineEmit(['change', 'delete'])

const { slots, attrs } = useContext()
</script>
```

With these 3 imports we can get the functionality that we’re used to having on our traditional setup method.

### Creating an async setup function

Another cool feature of the script setup is how easy it is to create an async setup function.

This is useful for loading in apis as your component is created, and even tying in your code to the [experimental suspense feature](https://learnvue.co/tutorials/vue-suspense).

All we have to do to make our setup function asynchronous, is use a top level await inside our script setup.

For example, if we’re using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), we can just use await like this…

```vue
<script setup>
const post = await fetch(`/api/pics`).then((a) => a.json())
</script>
```

…and our resulting `setup()` function will be asynchronous just like that.

It’s that simple.

## Using multiple script tags

`<script setup>` creates its own script scope for its top level bindings. But in certain cases, there is code that **must be executed in the module scope.**

The 2 specific examples in this RFC are…

- Declaring named exports
- Creating global side effects that only execute once.

This can be done by adding a normal `<script>` block alongside your script setup like this.

```vue
<script>
performGlobalSideEffect()

// this can be imported as `import { named } from './*.vue'`
export const named = 1
</script>

<script setup>
// code here
</script>
```

## And there you have it

Currently, this script setup is opt-in only so if you want to try it out, **just add setup to your script tag.**

OR…

If you never want to think about it and just want to write your code the way you’re used to, go for it. The choice is yours.

To learn more about the script setup, [here’s the link to the full RFC](https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md) with its motivations, exact syntax, and more technical implementations.

So that’s all for this article, I hope it helped clear up what this new syntax that’s inside your Vite app!

If you have any questions, leave them in the comments below!
