---
author: Matt Maribojoc
title: Improve Vue Performance with v-once + v-memo
snippet: Rendering performance is a vital metric for frontend developers. Improve your Vue app's performance with these two directives.
publishedDate: 2022/01/08
tags: directives, performance, vue 3, render
slug: improve-vue-performance-with-v-once-and-v-memo
videoLink: https://youtube.com/v/kqfufaZf3Og
category: Advanced Vue
cover: articles/v-once-v-memo
---
Rendering performance is a vital metric for frontend developers. For every second your page takes to render, the bounce rate increases.

And when it comes to creating a smooth user experience? Near instantaneous feedback is key to giving people a responsive app experience.

While Vue is already one of the [better performing JavaScript frameworks](https://dev.to/omohokcoj/vue-3-real-life-performance-3iie) out of the box, there are ways that developers can improve the performance of their apps.

There are several ways to optimize the rendering of Vue apps - ranging from virtual scrolling to [optimizing your v-for elements](https://learnvue.co/2020/02/6-techniques-to-write-better-vuejs-v-for-loops/).

But one extremely easy way to optimize rendering is by **only re-rendering what you need to**.

Whenever a component’s data changes, that component and its children will re-render, there are ways to eliminate unnecessary tasks with two lesser-used Vue directives: v-once and v-memo.

Let’s jump right in and see how we can use these in our app.

![](https://storage.googleapis.com/twg-content/images/mobile-page-speed-new-industry-benchmarks-01-.width-1600.png)

## v-once

The v-once directive renders the element/component once and only once. After the initial render, this element and all of its children will be treated as static content.

This can be great for optimizing render performance in your app.

To use this, all we have to do is add v-once to the element in our template. We don’t even need to add an expression like some of Vue’s other directives.

```vue
<template>
  <p v-once>{{ msg }}</p>
</template>
```

It works with single elements, elements with children, components, v-for directives, anything in your template.

```vue{}[App.vue]
<template>
  <!-- single elements -->
  <p v-once>{{ msg }}</p>
  <!-- elements with children -->
  <div v-once>
    <p>{{ notification}}</p>
  </div>
  <!-- components -->
  <my-component v-once />
  <!-- v-for directives -->
  <li v-for="”item" in list” v-once>{{item}}</li>
</template>
```

So let’s say we have this example template with some reactive data, a paragraph with v-once, and a button that changes the text.

```vue{}[VOnceExample.vue]
<script setup>
  import { ref } from "vue";
  const msg = ref("hello world");
</script>
<template>
  <div>
    <p v-once>{{ msg }}</p>
    <button @click="msg = 'changed message'">Change message</button>
    <div>
      Current state:
      <p>msg: {{ msg }}</p>
    </div>
  </div>
</template>
```

When we click our button, we can see that even though the value of msg changes, the paragraph does not change thanks to v-once.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/improve-vue-performance-with-v-once-and-v-memo-image-1.png)

When used with v-if or v-show, once our element is rendered once, the v-if or v-show will no longer apply meaning that if it’s visible on the first render, **it will always be visible**. And if it’s hidden, **it will always be hidden**.

```vue
<script setup>
import { ref } from 'vue'

const msg = ref('hello world')
const show = ref(false)
</script>

<template>
  <div>
    <p v-once v-if="show">{{ msg }}</p>
    <button @click="show = !show">Toggle</button>
    <button @click="msg = 'changed message'">Change message</button>
    <div>
      Current state:
      <p>msg: {{ msg }}</p>
    </div>
  </div>
</template>
```

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/improve-vue-performance-with-v-once-and-v-memo-image-2.png)

### When would I use v-once?

You should use v-once if there is no circumstance that you will need to re-render an element. A couple examples could be:

- Displaying account information in the sidebar
- Showing article text
- Persisting the column names in a table

Obviously, there are tons of other examples - but just think about if this works well in your app.

## v-memo

The v-memo directive memoizes a sub-tree of a template - meaning that it stores the result of previous renders to speed up future ones.

It accepts a dependency array and will only re-render if one of the values in the array has changed. Basically, we're saying to **only update this sub-tree** if one of these values changes.

```vue
<template>
  <p v-memo="[msg]">{{ msg }}</p>
</template>
```

Going on with this logic where changes in the value of our dependencies will trigger an update, passing in an empty dependency array will function the same as using v-once where it will never re-render.

```vue
<template>
  <p v-once>{{ msg }}</p>
  <p v-memo="[]">{{ msg }}</p>
</template>
```

So let’s look at this example where we have a few different count variables, but our div will only update when subscribers updates.

```vue
<script setup>
import { ref } from 'vue'

const subscribers = ref(4000)
const views = ref(10000)
const likes = ref(3000)
</script>
<template>
  <div>
    <div v-memo="[subscribers]">
      <p>Subscribers: {{ subscribers }}</p>
      <p>Views: {{ views }}</p>
      <p>Likes: {{ likes }}</p>
    </div>
    <button @click="subscribers++">Subscribers++</button>
    <button @click="views++">Views++</button>
    <button @click="likes++">Likes++</button>
    <div>
      <p>Current state:</p>
      <p>Subscribers: {{ subscribers }}</p>
      <p>Views: {{ views }}</p>
      <p>Likes: {{ likes }}</p>
    </div>
  </div>
</template>
```

If we modify the other pieces of component data, our div will not re-render, but as soon as we update the value of subscribers…BAM! There’s the render.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/improve-vue-performance-with-v-once-and-v-memo-image-3.gif)

Pretty handy if we need to control exactly when a large component re-renders.

There is one disclaimer in the [Vue docs](https://v3.vuejs.org/api/directives.html#v-memo), though.

v-memo does not work inside of a v-for loop, so if we want to memoize something with a v-for, we have to put them on the same element.

According to the v-docs themselves, v-memo will rarely be needed. Its main use case is for micro-optimizations in situations where the performance is vital for your app. Most commonly, v-memo is used when **rendering extremely large lists in a v-for.**
