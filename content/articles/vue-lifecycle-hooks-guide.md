---
author: Matt Maribojoc
title: A Complete Guide to Vue Lifecycle Hooks - with Vue 3 Updates
snippet: Lifecycle hooks in both Vue 2 and Vue 3 work very similarly - we still have access to the same hooks and we still want to use them for the same use cases.
publishedDate: 2020/12/26
tags: essentials,lifecycle,vue3
videoLink: https://youtube.com/v/xefB0ndqK0Y
category: Vue Essentials
cover: articles/vue-lifecycle-hooks-guide
---
Lifecycle hooks in [both Vue 2 and Vue 3](https://learnvue.co/2020/02/building-the-same-component-in-vue2-vs-vue3) work very similarly – we still have access to the same hooks and we still want to use them for the same use cases.

If our project uses the Options API, we don’t have to change any of the code for our Vue lifecycle hooks. This is because Vue 3 is designed to be compatible with prior releases of Vue.

However, the way we access these hooks is a little bit different when we decide to use the Composition API – which is especially useful in larger Vue projects.

By the end of this article, you’ll know how to use lifecycle hooks in both the Options API and Composition API and be on your way to writing better code.

Let’s go!

## What are the Vue Lifecycle Hooks

First, let’s look at a diagram of the Vue 3 lifecycle hooks in both the Options API and Composition API. This should give a high level overview of what’s going on before we can dive down into the details.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/how-to-use-lifecycle-hooks-in-vue3-1.png)

Essentially, each main Vue lifecycle event is separated into two hooks that are called right before that event and then right after. There are four main events (8 main hooks) that you can utilize in your Vue app.

- Creation — runs on your component’s creation
- Mounting — runs when the DOM is mounted
- Updates — runs when reactive data is modified
- Destruction — runs right before your element is destroyed.

## Using our Vue Lifecycle Hooks in the Options API

With the Options API, our lifecycle hooks are exposed as options on our Vue instance. We don’t need to import anything, we can just invoke the method and write the code for that lifecycle hook.

For example, let’s say we wanted to access our `mounted()` and our `updated()` lifecycle hooks. It might look something like this.

```vue
<script>
export default {
  mounted() {
    console.log('mounted!')
  },
  updated() {
    console.log('updated!')
  },
}
</script>
```

Simple enough, right?

Okay. Let’s move on to using Vue 3 Lifecycle hooks in the Composition API.

## Using our Vue Lifecycle Hooks in the Vue 3 Composition API

In the Composition API, we have to import lifecycle hooks into our project before we can use them. This is to help keep projects as lightweight as possible.

```js
import { onMounted } from 'vue'
```

Excluding `beforeCreate` and `created` (which are replaced by the `setup` method itself), there are 9 of the Options API lifecycle hooks that we can access in our setup method

- `onBeforeMount` – called before mounting begins
- `onMounted` – called when component is mounted
- `onBeforeUpdate` – called when reactive data changes and before re-render
- `onUpdated` – called after re-render
- `onBeforeUnmount` – called before the Vue instance is destroyed
- `onUnmounted` – called after the instance is destroyed
- `onActivated` – called when a kept-alive component is activated
- `onDeactivated` – called when a kept-alive component is deactivated
- `onErrorCaptured` – called when an error is captured from a child component

When we import them and access them in our code, it would look like this.

```vue
<script>
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('mounted in the composition api!')
    })
  },
}
</script>
```

## Updating Vue 2 Code to Vue 3 Lifecycle Hooks

This handy Vue 2 to Vue 3 lifecycle mapping is straight from the [Vue 3 Composition API docs](https://vue-composition-api-rfc.netlify.com/api.html#watcheffect) and I think it’s one of the most useful ways to see exactly how things are going to be changing and how we can use them.

- `beforeCreate` -> use `setup()`
- `created` -> use `setup()`
- `beforeMount` -> `onBeforeMount`
- `mounted` -> `onMounted`
- `beforeUpdate` -> `onBeforeUpdate`
- `updated` -> `onUpdated`
- `beforeDestroy` -> `onBeforeUnmount`
- `destroyed` -> `onUnmounted`
- `errorCaptured` -> `onErrorCaptured`

## An In-Depth Look at Each Lifecycle Hook

We now understand two important things:

- The different lifecycle hooks we can use
- How to use them in both the Options API and the Composition API

Let’s take a deeper dive at each lifecycle hook and look at how they’re used, what kind of code we can write in each one, and the differences between them in the Options API and Composition API.

## Creation Hooks – The Start of the VueJS Lifecycle

Creation hooks are the very first thing that runs in your program.

### `beforeCreate()` – Options API

Since the created hook is the thing that initializes all of the reactive data and events, `beforeCreate` does not have access to any of a component’s reactive data and events.

Take the following code block for example:

```js
export default {
  data() {
    return {
      val: 'hello',
    }
  },
  beforeCreate() {
    console.log('Value of val is: ' + this.val)
  },
}
```

The output value of `val` is `undefined` because data has not been initialized yet. You also cannot call your component methods in this method either.

If you want to see a full list of what is available, I’d recommend just running `console.log(this)`to see what has been initialized. This is useful in every other hook too when using the Options API.

Using the `beforeCreate` hook is useful when you need some sort of logic/API call that does not need to be assigned to data. Because if we were to assign something to data now, it would be lost once the state was initialized.

### `created()` – Options API

We now have access to the component’s data and events. So modifying the example from above to use `created` instead `beforeCreate` we see how the output changes.

```js
export default {
  data() {
    return {
      val: 'hello',
    }
  },
  created() {
    console.log('Value of val is: ' + this.val)
  },
}
```

The output of this would be `Value of val is: hello` because we have initialized our data.

Using the created method is useful when dealing with reading/writing the reactive data. For example, if you want to make an API call and then store that value, this is the place to do it.

It’s better to do that here than in mounted because it happens earlier in Vue’s synchronous initialization process and you perform data reading/writing all you want.

### What about the Composition API Creation Hooks?

For the Vue 3 Lifecycle Hooks using the Composition API, both `beforeCreate` and `created` are replaced by the `setup()` method. This means that any code you would have put inside either of these methods is now just inside your setup method.

The code we just wrote in the created lifecycle hook would be rewritten like this.

```js
import { ref } from 'vue'
export default {
  setup() {
    const val = ref('hello')
    console.log('Value of val is: ' + val.value)
    return {
      val,
    }
  },
}
```

## Mounting Hooks – Accessing the DOM

These mounting hooks handle mounting and rendering the component. These are some of the most commonly used hooks in projects and applications.

### `beforeMount()` and `onBeforeMount()`

Called right before the component DOM is actually rendered and mounted. In this step, the root element does not exist yet. In the Options API, this can be accessed using `this.$el` . In the Composition API, you will have to use a `ref` on the root element in order to do this.

```js
export default {
  beforeMount() {
    console.log(this.$el)
  },
}
```

The Composition component using refs would look like this.

```vue
<template>
  <div ref="root">Hello World</div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'

export default {
  setup() {
    const root = ref(null)
    onBeforeMount(() => {
      console.log(root.value)
    })
    return {
      root,
    }
  },
  beforeMount() {
    console.log(this.$el)
  },
}
</script>
```

Then, the corresponding script to try and access the ref.

Since, `app.$el` is not yet created, the output will be undefined.

While it’s preferred that you use `created()` / `setup()` to perform your API calls, this is really the last step you should call them before it’s unnecessary late in the process because it’s right after created — they have access to the same component variables.

### `mounted()` and `onMounted()`

Called right after the first render of the component. The element is now available allowing for direct DOM access.

Once again, in the Options API, we can use `this.$el` to access our DOM and in the Composition API we need to use refs to access the DOM in our Vue lifecycle hooks.

```js
import { ref, onMounted } from 'vue'

export default {
  setup() {
    /* Composition API */

    const root = ref(null)

    onMounted(() => {
      console.log(root.value)
    })

    return {
      root,
    }
  },
  mounted() {
    /* Options API */
    console.log(this.$el)
  },
}
```

## Update Hooks – Reactivity in the VueJS Lifecycle

The updated lifecycle event is triggered whenever reactive data is modified, triggering a render update.

### `beforeUpdate()` and `onBeforeUpdate()`

Runs when the data is changed, but before the component is re-rendered. This is a good place to update the DOM manually before any changes happen. For example, you can remove event listeners.

`beforeUpdate` could be useful for tracking the number of edits made to a component or even tracking the actions to create an “undo” feature.

### `updated()` and `onUpdated()`

The updated methods call once the DOM has been updated. Here’s some starter code that uses both beforeUpdate and updated.

```vue
<template>
  <div>
    <p>{{ val }} | edited {{ count }} times</p>
    <button @click="val = Math.random(0, 100)">Click to Change</button>
  </div>
</template>
```

With either of the corresponding scripts.

```vue
<script>
export default {
  data() {
    return {
      val: 0,
    }
  },
  beforeUpdate() {
    console.log('beforeUpdate() val: ' + this.val)
  },
  updated() {
    console.log('updated() val: ' + this.val)
  },
}
</script>
```

OR

```js
import { ref, onBeforeUpdate, onUpdated } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const val = ref(0)

    onBeforeUpdate(() => {
      count.value++
      console.log('beforeUpdate')
    })

    onUpdated(() => {
      console.log('updated() val: ' + val.value)
    })

    return {
      count,
      val,
    }
  },
}
```

These methods are useful, but for a lot of use cases we may want to consider using watchers to detect these data changes instead. Watchers are good because they give the old value and the new value of the changed data.

Another option is using computed values to change the state based on elements.

## Destruction Hooks – Cleaning Things Up

The destruction hooks for a component are used in the process of removing a component and cleaning up all the loose ends. This is the time for [removing event listeners](https://learnvue.co/2020/01/a-vue-event-handling-cheatsheet-the-essentials/) and things that could lead to memory leaks if not properly processed.

### `beforeUnmount()` and `onBeforeUnmounted()`

Because this is before the component starts to get torn down, this is the time to do most, if not all, of the clean up. At this stage, your component is still fully functional and nothing has been destroyed yet.

An example of removing an event listener would look like this in the Options API.

```js
export default {
  mounted() {
    console.log('mount')
    window.addEventListener('resize', this.someMethod)
  },
  beforeUnmount() {
    console.log('unmount')
    window.removeEventListener('resize', this.someMethod)
  },
  methods: {
    someMethod() {
      // do something
    },
  },
}
```

And this in the Composition API

```js
import { onMounted, onBeforeUnmount } from 'vue'

export default {
  setup() {
    const someMethod = () => {
      // do smth
    }

    onMounted(() => {
      console.log('mount')
      window.addEventListener('resize', someMethod)
    })

    onBeforeUnmount(() => {
      console.log('unmount')
      window.removeEventListener('resize', someMethod)
    })
  },
}
```

One way to see this in action is to work in Vite, vue-cli, or any dev environment that supports hot reloading. When your code updates, some of your components will unmount and mount themselves..

### `unmounted()` and `onUnmounted()`

At this point, most of your component and its properties are gone so there’s not much you can do. Once again, I’d use print out some data to see what exactly is still around and if it could be useful for your project.

```js
import { onUnmounted } from 'vue'

export default {
  setup() {
    /* Composition API */

    onUnmounted(() => {
      console.log('unmounted')
    })
  },
  unmounted() {
    /* Options API */
    console.log('unmounted')
  },
}
```

## Activation Hooks – Managing Keep-Alive Components

A keep-alive tag is a wrapper element for dynamic components.

It stores a cached reference to inactive components so that Vue does not have to create an entirely new instance every time a dynamic component changes.

For this specific use case, Vue gives us two lifecycle hooks

### `activated()` and `onActivated()`

This method is called whenever a kept-alive dynamic component is "reactivated" – meaning that it is now the active view of the dynamic component.

For example, if we are using keep-alive components to manage different tab views, every time we toggle between tabs, the current tab will run this activated hook.

Let’s say we have the following [dynamic component setup](https://learnvue.co/2020/01/an-overview-of-vuejs-dynamic-components/) using the keep-alive wrapper.

```vue
<template>
  <div>
    <span @click="tabName = 'Tab1'">Tab 1 </span>
    <span @click="tabName = 'Tab2'">Tab 2</span>
    <keep-alive>
      <component :is="tabName" class="tab-area" />
    </keep-alive>
  </div>
</template>

<script>
import Tab1 from './Tab1.vue'
import Tab2 from './Tab2.vue'

import { ref } from 'vue'

export default {
  components: {
    Tab1,
    Tab2,
  },
  setup() {
    /* Composition API */
    const tabName = ref('Tab1')

    return {
      tabName,
    }
  },
}
</script>
```

Inside our `Tab1.vue` component, we can access our activation hook like this.

```vue
<template>
  <div>
    <h2>Tab 1</h2>
    <input type="text" placeholder="this content will persist!" />
  </div>
</template>

<script>
import { onActivated } from 'vue'

export default {
  setup() {
    onActivated(() => {
      console.log('Tab 1 Activated')
    })
  },
}
</script>
```

### `deactivated()` and `onDeactivated()`

As you may guess, this is called when a kept alive component is no longer the active view of a dynamic component.

This hook can be useful for use cases like saving user data when a specific view loses focus and triggering animations.

We can capture the hook like this.

```js
import { onActivated, onDeactivated } from 'vue'

export default {
  setup() {
    onActivated(() => {
      console.log('Tab 1 Activated')
    })

    onDeactivated(() => {
      console.log('Tab 1 Deactivated')
    })
  },
}
```

Now, when we toggle between the tabs – each dynamic component’s state will be cached and saved.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/how-to-use-lifecycle-hooks-in-vue3-2.gif)

Great!

## Vue 3 Debug Hooks

Vue 3 gives us two hooks that we can use for debugging purposes. They are:

- `onRenderTracked`
- `onRenderTriggered`

Both of these events take a DebuggerEvent that allows us to tell what is causing a re-render in our Vue instance.

```js
export default {
  onRenderTriggered(e) {
    debugger
    // inspect which dependency is causing the component to re-render
  },
}
```

## Conclusion

Whether you decide to use the Options API or the Composition API, it’s important to know not only what lifecycle hook to use, but why you’re using it.

For many problems, multiple lifecycle hooks can work. But it’s good to know which is **the best** for your use case. No matter what, you should just think about it and have a good reason for choosing a specific lifecycle hook.

I hope this helped you understand a little bit more about lifecycle hooks and how to implement them in your projects.

Happy coding!
