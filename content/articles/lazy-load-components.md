---
author: Matt Maribojoc
title: Lazy Load Components in Vue with defineAsyncComponent
snippet: Using Vue 3’s defineAsyncComponent feature lets us lazy load components - meaning they’re only loaded when they’re needed.
publishedDate: 2021/06/28
tags: composition api,lazy load,vue 3
videoLink: https://youtube.com/v/zbXREIYNZHE
category: Advanced Vue
cover: articles/lazy-load-components
---
Using Vue 3’s `defineAsyncComponent` feature lets us lazy load components. This means that they’re only loaded from the server when they’re needed.

This is a great way to **improve initial page loads** as our app will be loaded in smaller chunks rather than having to load every single component when the page loads.

![](https://www.imperva.com/learn/wp-content/uploads/sites/13/2019/01/Lazy-Loading-2.jpg)

In this tutorial, we’ll learn all about `defineAsyncComponent` and look at an example that defers the loading of a popup until it’s required by our app.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/lazy-load-components-in-vue-with-defineasynccomponent-2.png)

Okay – let’s get into it.

## What is defineAsyncComponent

```js
// SOURCE: https://v3.vuejs.org/guide/component-dynamic-async.html
const AsyncComp = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      resolve({
        template: '<div>I am async!</div>',
      })
    })
)
```

[defineAsyncComponent accepts a factory function that returns a Promise](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0026-async-component-api.md). This Promise should `resolve` when we successfully get the component from the server and `reject` if something goes wrong.

To use it, we have to import it from Vue and then we can use it in the rest of script.

We can also easily add Vue components from other files using an `import` inside of our factory function.

```js
import { defineAsyncComponent } from 'vue'

// simple usage
const LoginPopup = defineAsyncComponent(() =>
  import('./components/LoginPopup.vue')
)
```

This is the simplest way to use `defineAsyncComponent`, but we can also pass in a complete options object that configures several more advanced parameters.

```js
// with options

const AsyncPopup = defineAsyncComponent({
  loader: () => import('./LoginPopup.vue'),
  loadingComponent: LoadingComponent /* shows while loading */,
  errorComponent: ErrorComponent /* shows if there's an error */,
  delay: 1000 /* delay in ms before showing loading component */,
  timeout: 3000 /* timeout after this many ms */,
})
```

Personally, I find myself using that first, shorter syntax more often and it works for most of my use cases, but it’s entirely up to you.

And it’s really that simple, so let’s get into our example.

## Lazy Loading a Popup Component with defineAsyncComponent

For this example, we’re going to be working with a login popup that’s triggered by a button click.

We don’t need our app to load this component whenever our app loads because**it’s only needed when the user performs a specific action.**

So here’s what our login component looks like, it just creates a popup by blacking out the rest of the screen with `position: fixed` and has a few inputs and a submit button.

```vue{}[LoginPopup.vue]
<template>
  <div class="popup">
    <div class="content">
      <h4>Login to your account</h4>
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Log in</button>
    </div>
  </div>
</template>

<script></script>

<style scoped>
  .popup {
     position: fixed;
     width: 100%;
     top: 0;
     left: 0;
     height: 100%;
     background-color: rgba(0, 0, 0, 0.2);
     display: flex;
     justify-content: center;
     align-items: center;
  }
  .content {
    min-width: 200px;
    width: 30%;
    background: #fff;
    height: 200px;
    padding: 10px;
    border-radius: 5px;
  }
  input[type="text"], input[type="password"] {
     border: 0;
     outline: 0;
     border-bottom: 1px solid #eee;
     width: 80%;
     margin: 0 auto;
     font-size: 0.5em;
  }
  button {
    border: 0;
    margin-top: 50px;
    background-color:#8e44ad;
    color: #fff;
    padding: 5px 10px;
    font-size: 0.5em;
  }
</style>
```

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/lazy-load-components-in-vue-with-defineasynccomponent-3.png)

Instead of importing it and including it in our components options like we usually would…

```vue
<template>
  <!-- "Standard" way of doing things -->
  <button @click="show = true">Login</button>
  <login-popup v-if="show" />
</template>

<script>
import LoginPopup from './components/LoginPopup.vue'
export default {
  components: { LoginPopup },
  data() {
    return {
      show: false,
    }
  },
}
</script>
```

We can instead use `defineAsyncComponent` to only load it when it’s required (meaning the button is clicked and our `v-if` is toggled)

```vue
<template>
  <!-- Use defineAsyncComponent  -->
  <button @click="show = true">Login</button>
  <login-popup v-if="show" />
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    LoginPopup: defineAsyncComponent(() =>
      import('./components/LoginPopup.vue')
    ),
  },
  data() {
    return {
      show: false,
    }
  },
}
</script>
```

While this may look the same when we use our app, let’s Inspect `Element > Network` to understand this small, yet important difference.

If we don’t use `defineAsyncComponent`, as soon as our page loads, we’ll see that our app is getting `LoginPopup.vue` from our server.

While in this example, it may not make the biggest performance issue, it still slows down the load a little bit and if we have dozens of components doing this, it can really add up.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/lazy-load-components-in-vue-with-defineasynccomponent-4.png)

However, if we look at the same tab using `defineAsyncComponent`, we’ll notice that when our page loads, `LoginPopup.vue` is nowhere to be seen. This is because it hasn’t been loaded yet.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/lazy-load-components-in-vue-with-defineasynccomponent-5.png)

But once we click our button and tell our app to show our popup, that’s when it’s loaded from the server and we can see it in the `Network` tab.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/lazy-load-components-in-vue-with-defineasynccomponent-6.png)

**This helps us achieve the best performance.**

We only want to load the components needed on our page’s initial load. Components that are conditionally rendered are often not required when our page loads, so why make our app load them in?

## How to use with an asynchronous setup function

Regardless if we defer loading with `defineAsyncComponent`, any component with an asynchronous setup function must be wrapped with a `<Suspense>`.

Let’s take a look at an example. This is from our[Introduction to Suspense Components](https://learnvue.co/2020/01/an-introduction-to-vuejs-suspense-components/) – which is a great resource if you’re new to async setup functions.

In short, creating an async setup function is one option we have to make our component **wait** for some API call or other asynchronous action before rendering.

Here is our component with an async setup. It mimics an API call with a `setTimeout()`

```vue
<template>
  <div class="popup">
    <div class="content">
      <p>Loaded API: {{ article }}</p>
      <h4>Login to your account</h4>
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Log in</button>
    </div>
  </div>
</template>

<script>
const getArticleInfo = async () => {
  // wait 3 seconds to mimic API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const article = {
    title: 'My Vue 3 Article',
    author: 'Matt Maribojoc',
  }
  return article
}
export default {
  async setup() {
    const article = await getArticleInfo()
    console.log(article)
    return {
      article,
    }
  },
}
</script>
```

We can import it in our component with or without `defineAsyncComponent`

```js
import LoginPopup from './components/LoginPopup.vue'

// OR

const LoginPopup = defineAsyncComponent(() =>
  import('./components/LoginPopup.vue')
)
```

But if we want this to render inside of our template, we need to wrap it in a Suspense element. This waits for our setup function to resolve before attempting to render our component.

A neat feature of Suspense is that we can display fallback content using slots and templates. The fallback content will display until the setup function resolves and our component is ready to render.

> Note that the v-if is moved from the component itself to our Suspense component so all fallback will display.

```vue
<template>
  <button @click="show = true">Login</button>
  <Suspense v-if="show">
    <template #default>
      <login-popup />
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
</template>
```

This is the result. A user will see “Loading…” and then after 3 seconds (the hard-coded value for our `setTimeout`), our component will render.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/lazy-load-components-in-vue-with-defineasynccomponent-7.png)

**By default, all components we define using defineAsyncComponent are suspensible.**

This means if there is Suspense in a component’s parent chain, it’s treated as an async dependency of that Suspense. Our components loading, error, delay, and timeout options will be ignored and will be handled by Suspense instead.

## Final Thoughts

`defineAsyncComponent` can be beneficial when creating large projects with dozens of components. When we get to lazy load components, we can have faster page load times improving the user experience and eventually increasing retention and conversion rates on your application.

I’d love to know your thoughts on this feature. If you’re already using it in your apps, let me know how in the comments down below!

But until next time, happy coding.
