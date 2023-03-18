---
author: Matt Maribojoc
title: Vue Dependency Injection Using Provide and Inject
snippet: Dependency injection using provide and inject can avoid prop drilling in Vue 3 especially in building Vue 3 plugins.
publishedDate: 2020/03/04
tags: plugins,vue inject,vue provide,vue3
slug: designing-vue3-plugins-using-provide-and-inject
videoLink: https://youtube.com/v/lFYzA3kCM90
category: Advanced Vue
cover: articles/vue-3-plugins-provide-and-inject
---
Vue dependency injection using provide and inject is great for building Vue plugins or avoiding prop drilling (passing props all the way down the hierarchy even if many in-between components don’t require the prop).

Although it isn’t used that often, you can implement **dependency injection** using just two built-in methods: provide and inject.

Looking at the [Composition API docs](https://v3.vuejs.org/guide/component-provide-inject.html), dependency injection using provide and inject will be a lot more common in Vue 3.0. This is primarily because plugins will have to switch to using this pattern because of the Composition API’s change of the `this` reference (it longer gives us access to the component itself).

In this article, we’ll be looking at using provide and inject in Vue 3 and how it can be used to easily distribute content across a component hierarchy.

Let’s jump right in!

## What are provide and inject?

Okay – so we know that we have to use `provide` and `inject`, but how does that even work?

In Vue 3, each parent (or your root Vue instance) can provide a dependency for all of its children. This includes deeply nested children – no matter how deep in the component hierarchy.

Then,we can inject this value in any of child.

![](https://vuejs.org/assets/provide-inject.3e0505e4.png)
\_[vuejs.org](https://vuejs.org/guide/components/provide-inject.html#prop-drilling)

Basically, all we need is some sort of key for our dependency – for our purposes we’ll be using a simple String.

Then, our provide method will associate our key with a certain value and our inject method will retrieve that value using the same String.

It makes a lot more sense to look at an example.

```js
import { provide, inject } from 'vue'

const ParentComponent = {
  setup() {
    provide('logged-in', true)
  },
}

const DeepDescendent = {
  setup() {
    // second optional param is a default value if it doesn't exist
    const isLoggedIn = inject('logged-in', false)

    // isLoggedIn = true
    return {
      isLoggedIn,
    }
  },
}
```

With this pattern, there are actually a few cool tricks we can accomplish with [Vue 3](https://learnvue.co/2019/12/what-you-need-to-know-about-vue3-in-2020/).

### We can provide a dependency globally in our app

If we want to provide something globally, we can use `app.provide` wherever we declare our Vue app instance.

```js{}[main.js]
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

const ThemeSymbol = Symbol();
app.provide(ThemeSymbol, "dark");

app.mount("#app");
```

This is especially useful when building Vue 3 plugins. To learn more about this use case, check out our **[Guide to Vue 3 Plugins](https://learnvue.co/2021/06/building-your-own-vue-3-plugin-a-full-guide/).**

### We can use ref to provide reactive data

This is also extremely handy if we want **reactive data** to be passed to children components. All we have to do is pass our provide method a reactive property using `ref(`).

```js
// in provider (parent)
const LoggedInSymbol = Symbol()
const loggedIn = ref('true')
provide(LoggedInSymbol, loggedIn)

// in consumer (descendant)
const theme = inject(LoggedInSymbol, ref('false'))
```

## Using Provide and Inject in the Options API

So far, we’ve seen how we can use provide and inject in the Composition API, using the setup method. But, like other features of Vue 3, this same functionality can be achieved with the Composition API.

Instead of having a provide and an inject method, these are exposed as options on our `export default` object.

These act similarly, where we just have to provide a key and value for each prop that we want to provide. And then wherever we want to inject these values, we can just list the keys of the specific properties inside an array.

```js
export default {
  // in provider (parent)
  provide: {
    loggedIn: false,
  },
}
```

```js
export default {
  // in consumer (child)
  inject: ['loggedIn'],
  created() {
    console.log(this.loggedIn) // false
  },
}
```

We can still inject reactive data, but since we’re not using ref, we can just use this in the Options API.

```js
export default {
  // in provider (parent)
  data() {
    return {
      status: false,
    }
  },
  provide: {
    loggedIn: this.status,
  },
}
```

```js
export default {
  // in consumer (child)
  inject: ['loggedIn'],
  created() {
    console.log(this.loggedIn) // false
  },
}
```

## When would I want to use provide/inject?

Provide and Inject is a great way to avoid **prop drilling**. Just to reiterate, prop drilling is when we have a value in our root component and only a child component **deep** in the hierarchy needs access to this value.

If we were to just use props, we would need to continuously pass this prop through all the middle components just for it to reach the bottom of our hierarchy.

This introduces **many places**for error and places that would need refactoring if something were to change in our codebase.

${BASE*URL}/(<https://miro.medium.com/max/1270/0>*b58JvbNhE1tKv7Tb) \*[Source](https://medium.com/front-end-weekly/props-drilling-in-react-js-723be80a08e5)\_

Provide/inject fixes this by only requiring the component with the original value and the component that needs that value to have code. This allows for much easier **maintenance** of our codebases.

However, there are still several cases where props are the better solution.

For example, if we need to make sure our value follows a certain format, prop validation is insanely useful. This can include things like String formatting, input validation, or even just requiring that a component needs certain props.

Like I’ve said a lot on here, I can’t tell you a clear-cut answer on when to choose provide/inject over props and vice-versa. As long as you think about your specific project and *have a reason* for favoring a certain design pattern, you’ll be just fine.

## Final Thoughts

The proper usage of provide/inject is definitely a more advanced topic in Vue development. But it’s powerful when working with complex component hierarchies and can eliminate prop drilling.

While most typical apps won’t use these concepts, if you’re serious about developing plugins, the changes in the Vue 3 Composition API mean that you **have** to use provide/inject.

If you want more information, definitely check out the [Composition API docs](https://vue-composition-api-rfc.netlify.com/).

Happy coding!
