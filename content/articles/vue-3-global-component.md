---
author: Matt Maribojoc
title: How to Register a Vue 3 Global Component
snippet: Let’s look at how to register Vue 3 Global Components that can be used across our entire Vue app.
publishedDate: 2020/08/24
tags: best practices,child components,global components,reusable code,vue3
category: Advanced Vue
cover: articles/vue-3-global-components
---
With the new versions of Vue 3 out now, it’s useful to start learning how the new updates will change the way we write code. One example is the changes in the way we write our index.js file (the file that handles creating our Vue app).

Today, we’ll take a look at how to register Vue 3 Global Components that can be used across our entire Vue app. It’s a little different from how we declared them in Vue2, but it’s just as simple.

For this tutorial, I am working with the beta release of Vue 3 that can be found via the [vue-next](https://github.com/vuejs/vue-next) GitHub repository.

Alright. Let’s just get straight to it.

## What are Vue Global Components?

First off, we have to understand what a Vue 3 global component is and why we might want to use one.

Normally, when we want to include a component inside our Vue instance, we register it locally. That normally looks something like this.

```vue{}[ChildComponent.vue]
<script>
  import PopupWindow from '../components/PopupWindow.vue';

  export default {
    components: {
      PopupWindow
    }
  }
</script>
```

However, let’s say that there is a component that we know we’re going to be using **many times** across our Vue project. It can get messy to register this component locally inside every file – especially if our project gets refactored or something.

In this case, it could be useful to globally register the component – making it accessible in all subcomponents of our main root Vue instance. In other words, globally registering a component means that we don’t have to import it in each file.

Let’s take a look at how this is done in Vue2 and how we can do it [now in Vue 3](https://learnvue.co/2020/02/building-the-same-component-in-vue2-vs-vue3).

## How global components work in Vue2

In Vue2, wherever we create our Vue instance, we just have to call a `Vue.component` method to register a global component.

This method takes two arguments:

1 – the name of our global component
2 – our component itself

Here’s a quick example of what that might look like.

```js{}[index.js]
import Vue from "vue";
import PopupWindow from "./components/PopupWindow";
import App from "./App.vue";

Vue.component("PopupWindow", PopupWindow); // global registration - can be used anywhere

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

Now this `PopupWindow` component can be used in all children of this Vue instance! Easy as that.

## Now, what about in Vue 3?

In Vue 3, the code varies slightly just because of creating our Vue instance works a little differently (using `createApp`), but it is just as simple to understand.

Instead of declaring global components from our Vue object, we first have to create our app. Then, we can run the same .component method as we would before.

```js{}[main.js]
import { createApp } from "vue";
import PopupWindow from "./components/PopupWindow";
import App from "./App.vue";

const app = createApp(App);

app.component("PopupWindow", PopupWindow); // global registration - can be used anywhere

app.mount("#app");
```

As you can see, it’s very similar, but the slight differences in the way our Vue instance is initialized make us change up our syntax a little bit.

## And that’s it

There you have it! We can now use our COMPONENT component in any Vue component that comes from this root instance. It’s a great way to keep our code DRY.

It’s important to carefully consider when we want to use a global component vs. a local component.

If we just make everything a global component by default, it means that even when we’re not using a component, it would still be included in our build – increasing page load times.

Global components can be a very powerful tool when used properly, and with the new changes in Vue 3, it is still very easy to use these types of components in your Vue project.

If you have any questions, leave them in the comments down below.

Happy coding 🙂
