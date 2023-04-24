---
author: Matt Maribojoc
title: Creating Your First Vue 3 Project - A Vue Tutorial
snippet: In this Vue tutorial learn how to setup your first Vue 3 project build a Vue 3 component and cover the basics of the Composition API!
publishedDate: 2020/12/31
tags: installation,setup,tutorial,vue3
slug: setting-up-your-first-vue3-project-vue-3-0-release
videoLink: https://youtube.com/v/JLt3GrDZDvQ
category: Vue Essentials
cover: articles/intro-to-vue-3
---
Vue 3 is officially here! In [this announcement](https://www.youtube.com/watch?v=Vp5ANvd88x0) by Evan You, he announces the biggest changes in the new framework and talks about the amazing work the whole Vue team has done.

Developers have long been awaiting the really cool features announced for Vue 3 like TypeScript support, better organization for large projects, and rendering optimizations that make for better Vue apps.

In this Vue 3 tutorial, we’ll be building a search system that uses a text input to filter articles from an array.

By the end of this tutorial, you’ll have created a Vue 3 project, built two components with the Composition API.

Here’s what we’re going to be making.

![](/img/articles/intro-to-vue-3/1.gif)

[Here’s a link to the finished codebase (including all of the CSS styles).](https://github.com/matthewmaribojoc/learnvue-vue3-tutorial)

Alright, I’m sure you’re just as excited as I am, so let’s start coding.

## Getting Started

There are a [few different options](https://v3.vuejs.org/guide/installation.html) for adding Vue 3 to your existing projects or creating your very own Vue 3 project.

In this tutorial, we’ll be covering my two personal favorite options:

- Vue CLI
- Vite

### Vue CLI

If you’ve done Vue development in the past, you’ve likely used the [Vue CLI](https://github.com/vuejs/vue-cli) to set up your project.

Vue CLI is a command line interface for Vue development that serves as the baseline of the Vue ecosystem. For our case, it allows us to create a Vue app.

First, we have to make sure that we have the most up-to-date version of the [Vue CLI](https://www.npmjs.com/package/@vue/cli) and we can do that by running `npm update -g @vue/cli` our terminal.

Next, to create our project, we want to run `vue create <PROJECT-NAME>`

If we successfully updated our CLI, we should have an option to choose Vue 3.

![](/img/articles/intro-to-vue-3/2.png)

Once we choose the Vue 3 option, our app should build. When it’s done, we just have to go inside our project and then run our Vue app! The commands for that are:

```bash
cd <PROJECT-NAME>
npm run serve
```

Now, if we navigate to our `http://localhost:8080/` in our browser, we should see our app!

![](/img/articles/intro-to-vue-3/3.png)

Perfect!

Alright – let’s take a look at another option to create our Vue 3 project.

### Vite

[Vite (pronounced like “veet”) is a new Vue 3 build tool](https://github.com/vitejs/vite) that serves code using ES Module imports during development instead of bundling using a tool like webpack.

Built by the creators of Vue, it greatly speeds up the development overhead allowing for faster hot reloads and more efficient cold server startup.

Vite eliminates the bundling process only compiles code on-demand – meaning that only code currently impacting the current screen is compiled. This means you don’t have to wait for your entire project to be bundled to start developing.

Since bundling large projects could take a long time, Vite has high potential to speed up the development process.

### Why use Vue Vite?

Now you may be asking yourself, _“So how exactly is Vite different than the existing vue-cli?”_

Since `@vue-cli/service` is built on top of webpack, it is a module bundler that will bundle your entire Vue project on startup, hot reloads, and compilation.

Instead of this, Vue Vite will take the ES Import syntax in your code and let the browser parse the import and make a HTTP request for each import.

> Vue Vite offers faster startup, hot reload, and compilation speeds than bundler-based solutions during dev.

Hypothetically, handling imports via HTTP requests could create a network waterfall and be slower. But since this method is only for local development, those differences should be negligible.

Also, as we’ll discuss later, it’s super simple to bundle your Vite project for production and avoid this problem entirely.

### Creating your first Vite project

To get started in Vite, all we have to do is run

```bash
npm create vite@latest
```

Then, we just have to go into our project folder, install our dependencies, and then run our app with the following commands

```bash
cd <project-name>
npm install
npm run dev
```

Now, if we navigate to `http://localhost:3000` – we should see this following app.

![](/img/articles/intro-to-vue-3/4.png)

## Some Vue Vite features you should know

### 1. Bundling your project for production

A goal for Vite was to make Vue development and production as easily as possible. And although there is no bundling during dev, it is super easy to bundle your project for production.

All you have to do is run `npm run build`.

If we look at `package.json`, we see that this is calling `vite build` – which like other build processes, will bundle your Vue project and prepare your dist folder to be served.

![](/img/articles/intro-to-vue-3/5.png)

### 2. Managing asset URLS

Like other Vue project setups, Vite offers two ways to reference your assets.

- Absolutely – using the public folder. These assets are referenced with /_file.extension_andwill be copied to the root of your dist folder when your project is built.
- Relatively – for example, files in the src/assets folder are relatively accessed based on the file structure of the folder. This entire folder is placed as `_assets` in the dist folder when your project is built.

![](/img/articles/intro-to-vue-3/6.png)

### 3. Built-in TypeScript support

One of the biggest changes in Vue 3 was the rewriting of the core library using TypeScript – allowing for type checking and better error messages depending on your IDE.

Once again, Vue Vite integrates smoothly with Vue 3 by offering built-in TypeScript support for both .ts files and for TypeScript `<script>` in SFCs.

## Understanding the Vue 3 Component

Now that we have our Vue 3 app set up and we understand the Vue 3 Vite tool, let’s go over how the components work.

The biggest change in Vue 3 is the introduction of the Composition API. In this new structure, we are able to organize our code by feature rather than only being able to separate it by data, computed, etc.

This allows us to create [more modular, readable, and scalable code](https://learnvue.co/2020/01/12-vuejs-best-practices-for-pro-developers/) because the code for a single feature can all be written in one area of our code.

![](/img/articles/intro-to-vue-3/7.png){.max-w-md}

If we open up the `src/components/HelloWorld.vue` file, we can see code that looks identical to the code we wrote in Vue2 – this is called the Options API.

```vue
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    }
  },
}
</script>
```

This is great because it shows how we can still use the “old” syntax in Vue 3 if that’s what you are more comfortable with.

For this tutorial, let’s cover how we make this in the new Composition API and identify the changes from the Options API.

## Reactive Data in the Composition API

Inside the script section of our SFC, let’s first import some things from the vue core library to allow us to create reactive variables.

```js
import { ref } from 'vue'
```

Then, let’s replace our data option, with a setup function that will look something like this.

```js
import { ref } from 'vue'
export default {
  setup() {
    return {}
  },
}
```

This setup method runs when our component is created and is where we can define all of our reactive data, [computed properties](https://learnvue.co/2019/12/mastering-computed-properties-in-vuejs/), methods, etc. that we want our component to use.

Then, anything that this setup method returns is accessible in our template!

### Creating Reactive Data with ref

To show this off, let’s create a text input using a `v-model` inside our template.

```vue
<template>
  <div>
    <h2>Filter LearnVue Articles</h2>
    <input type="text" placeholder="Filter Search" v-model="query" />
    {{ query }}
  </div>
</template>
```

Let’s make our reactive `query` variable using ref and then return it from our setup method.

```js
export default {
  setup() {
    const query = ref('')

    return {
      query,
    }
  },
}
```

Then, if we go back to our app, you’ll see that we have reactive data using the Composition API.

For simplicity, I’m not including all the styles in this article, but if you want to see the styles I used, you can check out the [tutorial GitHub repository](https://github.com/matthewmaribojoc/learnvue-vue3-tutorial).

![](/img/articles/intro-to-vue-3/8.gif)

Great!

Next, let’s add a clear button to our input and see how we can create a method in the Composition API.

### Methods in the Composition API

In the Options API, there is an entire property in our Vue object dedicated to methods.

For larger files, this means that data could be declared hundreds of lines away from methods that use it – making components harder to read and maintain.

In the Composition API, everything is just in the setup method meaning that we can organize code according to feature and even extract common features into their own code modules.

Let’s create a reset method that takes our ref and sets it to an empty String.

```js
export default {
  setup() {
    const query = ref('')

    const reset = (evt) => {
      query.value = '' // clears the query
    }

    return {
      reset,
      query,
    }
  },
}
```

One thing to notice is that we need to call `query.value` in order to access the value of the data.

But, why?

If we `console.log(query)`, we’ll see that it isn’t just a String value, but a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Traps in proxies allow us to get the data easily, but that’s why we need to call .value on our refs.

Then, just like in the Options API, we can add a button to our template to call this `reset` method when clicked.

```html
<button @click="reset">Reset</button>
```

Now, when we check out our application with our new clear input code, it should look a little like this.

![](/img/articles/intro-to-vue-3/9.gif)

## Adding a Second Component to our Vue 3 Project

Now that we have our input and query data, let’s actually create a results component and start showing our results.

We’ll call it `SearchResults.vue`

To add this to our `HelloWorld.vue` code, we first have to import it and declare it inside our export default.

```vue
<script>
import { ref } from 'vue'
import SearchResults from './SearchResults.vue'
export default {
  components: {
    SearchResults,
  },
  // ...
}
</script>
```

Then, we can just add it into our template like this.

```vue
<template>
  <div>
    <h2>Filter LearnVue Articles</h2>
    <input type="text" placeholder="Filter Search" v-model="query" />
    <br />
    <button @click="reset">Reset</button>
    <search-results />
  </div>
</template>
```

Alright, let’s find a way to use our query string from our HelloWorld component.

### Passing Props

Vue props allow parent components to pass data to its children components. For our case, we want to pass our query string from HelloWorld.vue to SearchResults.vue

We can do this by adding an attribute inside our `<search-result>` tag inside HelloWorld.vue.

```html
<search-results :query="query" />
```

Simple!

### Accessing Props

Inside `SearchResults.vue`, let’s create the skeleton of our script and import all of the article information from a JSON file.

```js{}[SearchResults.vue]
import titles from "../post-data.json";
export default {
  setup(props, context) {},
};
```

Then, there are a few steps we need to access props.

First, we have to declare them in a props option. This tells our component what props to expect as well as performs any prop validation we specify.

```js
export default {
  props: {
    query: String,
  },
  setup(props, context) {
    // ...
  },
}
```

If you look closely at the setup method, you’ll see that it accepts two arguments.

- `props` – contains all of the props passed to our component
- `context` – contains attrs, slots, and emit

We’ll be using props to access the value of our props in the setup method.

All we need to do is use a computed property to filter the list of articles using our query prop.

### Computed Properties

Similar to using ref, we need to import computed into our project.

```js
import { computed } from 'vue'
```

Then, we set it up like this, where our computed property accepts a getter method. This method will update our computed property whenever one of its dependencies changes.

```js
import { computed } from 'vue'
import titles from '../post-data.json'
export default {
  props: {
    query: String,
  },
  setup(props, context) {
    const filteredTitles = computed(() => {})

    return {
      filteredTitles,
    }
  },
}
```

For this method, we want to filter all of the titles using the query prop. Everything is just converted as lowercase so we don’t have to worry about casing.

```js
const filteredTitles = computed(() => {
  return titles.filter((s) =>
    s.Name.toLowerCase().includes(props.query.toLowerCase())
  )
})
```

Alright!

All that’s left to do is actually use our template to display the data! This is done using a `v-for` loop.

```vue
<template>
  <div class="root">
    <p>Showing {{ filteredTitles.length }} results for "{{ query }}"</p>
    <ul>
      <li v-for="title in filteredTitles" :key="title.Page">
        {{ title.Name }}
      </li>
    </ul>
  </div>
</template>
```

That’s it.

Okay. Let’s finally see what we got working now.

![](/img/articles/intro-to-vue-3/10.gif)

### Lifecycle Hooks in Your Vue 3 Project

One another thing you should know before getting started in Vue 3 is how to use [Vue lifecycle hooks](https://learnvue.co/2020/03/how-to-use-lifecycle-hooks-in-vue3/).

![](/img/articles/intro-to-vue-3/11.png)

Like other parts of the Composition API, we have to import the lifecycle hooks we want to use and declare them in the setup method.

Here’s a quick example of how to use a lifecycle hook.

```js
import { computed, onMounted } from 'vue'
export default {
  setup() {
    onMounted(() => {
      console.log('mounted')
    })
  },
}
```

If you want an [in-depth guide on Vue lifecycle hooks, check out this article](https://learnvue.co/2020/03/how-to-use-lifecycle-hooks-in-vue3/).

## And there you have it

There are so many cool features in Vue 3 that should be so useful for creating scalable Vue apps.

Hopefully this tutorial got you set up in the new environment and gave you the basics to start creating your own Vue 3 projects.

And as always, leave a reply if you have any comments or questions.

Happy coding!
