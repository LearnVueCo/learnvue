---
author: Matt Maribojoc
title: An Overview of Vue Dynamic Components
snippet: Dynamic components in Vue can be an extremely convenient way to make your code both more readable and adaptable.
publishedDate: 2020/01/04
tags: beginner,essentials,vuejs
slug: an-overview-of-vuejs-dynamic-components
videoLink: https://youtube.com/v/uC9_62BmKyE
category: Advanced Vue
cover: articles/vue-dynamic-components
---
Vue Dynamic Components can be an extremely convenient way to make your code both more readable and adaptable. They can simplify several conditional components (ones toggled using `v-if`, `v-else-if`, `v-else`) into just one line of code.

In short, they allow you to toggle between different components in the easiest way possible.

By the end of this article, you will…

- Understand what dynamic components are
- Recognize when to use them
- Know how to implement them in VueJS
- Hear about advanced dynamic component topics

Alright, enough introduction. Let’s dive right in.

# What are dynamic components

Dynamic components are, well, ways to dynamically switch between components at run-time. While this is a circular definition, the name is pretty self explanatory.

To better understand, let’s look at some example use cases.

- Navigating [tabbed components](https://learnvue.co/2019/12/building-reusable-components-in-vuejs-tabs/) without having to route to a new page
- Managing different types of popups in one component element
- Displaying different content depending on if a user is logged in or not.

All of these would require unique components, but instead of having to include all of them one by one, dynamic components provides a shortcut.

There are several benefits to using dynamic components.

From the developer side, it makes your code more reusable. If all you have to do is use one element instead of adding a v-if for everything, it’s more scalable and readable.

From the user side, using dynamic components can make a page more interactive and save page loads making for a faster user experience.

> **It’s a win-win. Development is easier AND your users benefit.**

Now that we know what dynamic components are and why they’re useful, let’s learn how to use them.

# How To Use Vue Dynamic Components

Using dynamic components is super simple. We just need to know two things:

- The `<component>` element
- The `v-bind:is` attribute

## 1\. The Component Element

In Vue, the component element allows us to declare dynamic components. It’s used just like every other element and we can just use it in a template like `<component> </component>`

The magic happens when we start using one of the component element’s unique attributes.

## 2\. The v-bind:is attribute

This is the attribute that actually allows dynamic components to work. Essentially, it tells the component element what it is. The `v-bind:is` or just `:is` for shorthand, points to a registered component.

You can pass it two types of parameters:

- The name of a component
- The options object of a component

## So how do we use this?

Simple.

First, we have to include the components we want to use using import statements. We also have to declare these as components to our Vue property in the `options` method.

```vue{}[ParentComponent.vue]
<script>
import ComponentA from '@/components/A.vue'
import ComponentB from '@/components/B.vue'
export default {
    components: {
        ComponentA,
        ComponentB,
    },
}
</script>
```

For this example, `ComponentA` and `ComponentB` are just dummy components that render out ‘Component A’ and ‘Component B’ like this.

```vue{}[A.vue]
<template>
  <div>ComponentA</div>
</template>
```

Next, we have to declare a variable that corresponds to the current component. It’ll look something like this.

```vue{}[ParentComponent.vue]
<script>
import ComponentA from '@/components/A.vue'
import ComponentB from '@/components/B.vue'
export default {
    components: {
        ComponentA,
        ComponentB,
    },
   data () {
      return {
        comp: ComponentA // or can be 'ComponentA' as a String
      }
    }
}
</script>
```

Finally, let’s just add our component element to our template. And for the hell of it. I added little buttons that switch between the two components. The code looks like this.

```vue{}[ParentComponent.vue]
<template>
  <div>
    <button @click='comp = ComponentA'> Component A </button>
    <button @click='comp = ComponentB'> Component B </button>
    <component :is='comp' />
  </div>
</template>
```

# Going Forward with Vue Dynamic Components

There is so much more that you can do to make dynamic components amazing. Some of my personal favorites are adding [Vue transitions](https://learnvue.co/2020/01/how-you-can-use-vue-transitions-right-now) to make them work seamlessly or implement Vue[keep-alive components to](https://learnvue.co/2019/12/an-overview-of-vue-keep-alive/) help save states.

But even in the simplest case, Vue dynamic components can make your code much more maintainable and adaptable.
