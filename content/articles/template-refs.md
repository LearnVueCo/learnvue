---
author: Matt Maribojoc
title: The Beginners Guide to Template Refs
tags: example, test, LearnVue
category: Vue Essentials
publishedDate: 2022/02/13
snippet: Vue Template Refs give our JavaScript code a reference to easily access the template. For example, if we needed quick access to a component or HTML element, template refs is the perfect solution.
videoLink: https://www.youtube.com/watch?v=Z6iBAixVJ5Y
cover: articles/template-refs
---
Vue Template Refs give our JavaScript code a reference to easily access the template. For example, if we needed
quick access to a component or HTML element, template refs is the perfect solution.

> In Vue 3, the Composition API gives us another way to use template refs. It joins the concept of reactive refs and template refs giving us just one syntax in our JavaScript for both situations.

In this tutorial, we’ll be learning all about template refs: how to use them in both the Options API and Composition API, some advanced refs techniques, as well as look at good times to use this feature.

Ready? Let’s jump right in.

## Declaring our Template Refs

For our example, we’re going with the standard use case of focusing an input when a user loads a page. This is useful because it can avoid people having to click in a text input and saves extra time. An example of this functionality is on [Google’s home page](https://google.com).

But first, we need to create a text input and give it a `ref`.

Regardless if we’re using the Options API or Composition API, we declare refs in our template the same way.

On any element or component, we have to specify an attribute called ref and pass it a unique reference ID as a string.

```vue
<template>
  <div>
    <input type="text" placeholder="Start typing..." ref="input" />
  </div>
</template>
```

That’s it for our template, now let’s see how to access it in our script.

## Template Refs in the Options API

For the Options API, we have access to refs using the this object. Vue stores all template refs under the property `this.$refs`.

An important note here is that in order for our refs to be accessible, our component must already have rendered on the screen. This means that any point in the Vue lifecycle before mounting (like in `created`), we won’t have access to template refs.

The first place we have access to template refs is inside `mounted`. So let’s listen for that lifecycle hook, access our ref, and focus it.

```vue
<template>
  <div>
    <input type="text" placeholder="Start typing..." ref="input" />
  </div>
</template>

<script>
export default {
  mounted() {
    // access our input using template refs, then focus
    this.$refs.input.focus()
  },
}
</script>
```

Now, if we reload our browser, we’ll see that our browser is automatically focused and we can type without having to click it first.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/the-beginners-guide-to-vue-template-refs-with-vue-3-updates-1.png)

Perfect.

Now time for the Composition API.

## Template Refs in the Composition API

Just to reiterate, the Composition API merges the concept of reactive data via ref with the concept of template refs.

So all we have to do is create a ref with the same name as the ref attribute in our template.The ref has a default value of null and will actually be the value of the input once our component is mounted.

```js
import { ref } from 'vue'
export default {
  setup() {
    const input = ref(null)

    return {
      input,
    }
  },
}
```

Then, to focus it, we again have to use the onMounted lifecycle hook so our component has a chance to render. But since we’re working in the Composition API, we have to import this hook and use it inside the setup function. Inside, we can easily call `input.value.focus()`.

```js
import { ref, onMounted } from 'vue'
export default {
  setup() {
    const input = ref(null)

    onMounted(() => {
      input.value.focus()
    })

    return {
      input,
    }
  },
}
```

And if we look back at our app, we have the same functionality as we did the Options API.

Next up, let’s take a look at some interesting interactions between `v-for` and other interactions in Vue. I’m going to expanding on examples from the Vue docs themselves.

## Using Vue Templates Refs with a v-for loop

This interaction is useful whenever we’re rendering a list with a `v-for` loop and we want to create a `ref` for each element.

Inside of our script, we can create a ref that contains an empty array. And then, in the element we are creating, we can programmatically add elements to our array based on the index in the v-for loop.

```vue
<template>
  <ul>
    <li
      v-for="(name, i) in names"
      :key="name"
      :ref="(el) => (elements[i] = el)"
    >
      {{ name }}
    </li>
  </ul>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  setup() {
    const names = ref(['Matt', 'John', 'Jane'])
    const elements = ref([])
    onMounted(() => {
      console.log(elements.value) // [li, li ,li]
    })
    return {
      names,
      elements,
    }
  },
}
</script>
```

This is the simplest way to get a list of elements inside a template ref.

## Watching a Template Ref for Changes

We can also use Vue’s `watchEffect` method to automatically detect changes to our template ref. This is an interesting way to avoid using lifecycle hooks because we can simply watch for when our template ref is no longer null (meaning our component has mounted and rendered).

To do this, we can use the `flush: post` option on a `watchEffect`. This will make our `watchEffect` wait until our DOM is rendered before running.

```vue
<template>
  <div>
    <input type="text" placeholder="Start typing..." ref="input" />
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
export default {
  setup() {
    const input = ref(null)
    watchEffect(
      () => {
        console.log(input.value) // => input
        input.value.focus()
      },
      {
        flush: 'post',
      }
    )
    return {
      input,
    }
  },
}
</script>
```

## Some uses for Vue template refs

While the example we looked at – focusing an input – is one of the most common use cases for Vue template Refs, there are endless possibilities where this feature can be useful for your project.

Here are some examples:

- Animating an element using JavaScript
- Easily changing the inner text or HTML of an element
- Passing a reference to an element as a prop

Happy coding!
