---
author: Matt Maribojoc
title: The Guide to Vue JS Computed Properties - Updated 2021
snippet: Vue JS computed properties can help organize code and create reusable data. Learn how to use them!
publishedDate: 2019/12/17
tags: basics
slug: mastering-computed-properties-in-vuejs
category: Vue Essentials
cover: articles/computed-properties-guide
---
Vue JS computed properties can be a lifesaver. There are few things more frustrating to a programmer than staring at a block of code and taking years to decipher what’s going on.

When working in VueJS, one of the most common ways to clutter code is to add very long expressions to your template. For example, say we want to render a reversed string, without spaces, and in all caps.

If we were to do this using an in-template expression, it would look like this.

```vue
<template>
  <span>
    {{ text.replace(/ /g, '').toUpperCase().split('').reverse().join('') }}
  </span>
</template>
```

Now you may be more of a programming pro than me, but this is way too cluttered for me to look at a glance and know immediately what it’s trying to do.

Now imagine having to use this value in multiple places in a template and having this long expression all over your code.

This is when it’s a lifesaver to use Vue JS computed properties.

## Ok, but how do computed properties work?

Now that we know why Vue JS computed properties are useful, let’s go over how to use them.

In most basic terms, we just add a field to our JavaScript exports and define our computed properties there.

For the example above, it would look like this.

```vue
<script>
export default {
  data() {
    text: 'hello world'
  },
  computed: {
    formattedText: function () {
      return this.text
        .replace(' ', '')
        .toUpperCase()
        .split('')
        .reverse()
        .join('')
    },
  },
}
</script>
```

Now that we’ve defined our computed property, it becomes super easy to render it in our template. This is all we have to do.

```vue
<template>
  <span> val: {{ formattedText }} </span>
</template>
```

That’s it. Now, on our webpage, we should render `DLROWOLLEH` in a much cleaner and readable way.

Using computed properties always makes your project more scalable. If we want to change the way the value is computed, we would only have to change **one computed property** instead of potentially hundreds of expression templates.

## So, when exactly does the computed property change?

Since a computed property is like a [more detailed Vue watcher](https://learnvue.co/2019/12/a-simple-vue-watcher-tutorial-for-beginners/), it will observe a piece of reactive data and update when that reactive data changes.

For our example, `formattedText` will always be dependent on the value of text. So if we were to change text to ‘ABCDEF’, then formattedText will return ‘FEDCBA’.

However, in order to run more efficiently,**Vue caches computed property values**.

> Vue JS will only recalculate the property when a reactive dependency is changed.

In our case, it will only recalculate when text changes. Otherwise, it will return the cached value from the last change.

### The Basics of Vue Reactivity

To fully understand when computed properties will change, we have to understand the idea of their reactive dependencies.

Simply put, a computed property’s dependencies are the **reactive** values that help the property that determine the value that is returned. If none of these change, then, again, the cached value will be returned.

If no reactive dependency is changed, a computed property is not recalculated.

The following example from in the [Vue docs](https://vuejs.org/v2/guide/computed.html) shows a computed property that will never recalculate.

```vue
<script>
export default {
  // ...
  computed: {
    now: function () {
      // will never update
      return new Date()
    },
  },
}
</script>
```

Although the computed property now returns a value that changes _literally_ all the time, there are no dependencies that Vue watches for. Therefore, it is never recomputed.

If you don’t like this, you can always use a regular Vue **method, which by is recalculated on every render**.

```vue
<script>
export default {
  methods: {
    now: function () {
      return new Date()
    },
  },
}
</script>
```

## You can also define a setter for a computed property

By default, computed properties are read only and cannot be set. However, if you want to add a hook for a computed property that allows its dependencies to be set.

All you have to do is the following.

```vue
<script>
export default {
  computed: {
    formattedText: {
      get() {
        return this.text
          .replace(' ', '')
          .toUpperCase()
          .split('')
          .reverse()
          .join('')
      },
      set(value) {
        this.text = value
      },
    },
  },
}
</script>
```

For example, here’s some commands and their impact on the code.

```js
console.log(this.formattedText) // DLROWOLLEH
this.formattedText = 'change'
console.log(this.text) // change
console.log(this.formattedText) // EGNAHC
```

## Computed Properties in the Vue 3 Composition API

With the [Vue 3](https://learnvue.co/2020/12/setting-up-your-first-vue3-project-vue-3-0-release/) Composition API, the way that we access computed properties is a little bit different.

First, similar to ref and [lifecycle hooks](https://learnvue.co/2020/12/how-to-use-lifecycle-hooks-in-vue3/), we have to import computed into our script.

Then, we can use computed properties in our setup method.

Remember – we have to use `.value` to reference the value of refs!

```js
import { ref, computed, onMounted } from 'vue'
export default {
  setup() {
    const text = ref('hello world')

    const formattedText = computed({
      get: () =>
        text.value.replace(' ', '').toUpperCase().split('').reverse().join(''),
      set: (value) => {
        text.value = value
      },
    })

    onMounted(() => {
      console.log(formattedText.value) // DLROWOLLEH
      formattedText.value = 'change'
      console.log(text.value) // change
      console.log(formattedText.value) // EGNAHC
    })

    return { text, formattedText }
  },
}
```

As you can see, the code for the computed property itself is primarily the same, but the setup is different.

## Conclusion

You should have all of the basics to be able to use computed properties. Hopefully, this helps you condense your code and make it more readable and easy to understand.

If you want a more technical and more to the point usage of how exactly computed properties work. Check out the [Vue documentation](https://v3.vuejs.org/guide/introduction.html) for more.

Let me know what tips you have!
