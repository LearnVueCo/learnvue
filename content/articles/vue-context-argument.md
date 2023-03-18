---
author: Matt Maribojoc
title: Explaining the Vue Context Argument - A Composition API Tutorial
snippet: In the Composition API there is a brand new way to access component properties using the setup function’s context argument.
publishedDate: 2021/06/03
tags: component properties,composition api,context,context.attrs,context.slots,script setup,setup
videoLink: https://youtube.com/v/1Ri1x-gRkbs
category: Advanced Vue
cover: articles/vue-context-argument
---
When working in the Vue 3 [Composition API](https://learnvue.co/2020/01/4-vue3-composition-api-tips-you-should-know/), there are brand new ways to access component functionality. In this article, we’ll be taking a look at the setup function’s context argument.

These changes are necessary because, in the Composition API, we don’t have the same reference to `this` as we do in the Options API.

In the Options API, we could call `console.log(this)` in any of the options and get a reference to the component itself – giving us access to its props, computed properties, data, and more.

```js
export default {
  props: {
    lastName: String,
  },
  data() {
    return {
      name: 'hello',
    }
  },
  created() {
    console.log(this.lastNameModifiers) // props are on `this`
    console.log(this.name) // data is on `this`
    this.createdMethod() // methods are on `this`
  },
  methods: {
    createdMethod() {
      console.log('created')
    },
  },
}
```

However, [Vue 3 lets us use the Composition API](https://learnvue.co/2020/12/setting-up-your-first-vue3-project-vue-3-0-release/), where all of our code is located inside a `setup` function. This means that setup is where we declare our reactive data, methods, and computed properties.

```js
import { ref } from 'vue'
export default {
  props: {
    lastName: String,
  },
  setup() {
    // how do we access props without this??

    const createdMethod = () => {
      console.log('created')
    }
    const name = ref('hello')

    createdMethod()

    return {
      createdMethod,
      name,
    }
  },
}
```

Setup runs before our component instance is actually created, and since our setup property is where we actually define basically everything for our component, there is **no longer a reference**to the component itself using `this`.

## So how do we access component properties?

The Composition API gives us alternative ways to access important component information like its props and slots.

This is possible because our setup function takes **two properties**that let us access some component properties: `props` and `context`.

- [props contains defined props in our component](https://learnvue.co/2020/08/an-introduction-to-vue3-props-a-beginners-guide/)
- context is a JavaScript object that exposes three component properties

And these three properties are:

- `context.attrs`– the **non-prop attributes** passed to our component
- `context.slots` – an object with all of our **template slots’ render functions**
- `context.emit`– the method for our component to **emit events**

Let’s take a deeper look at each of these.

## context.attrs

Again, `context.attrs` contains all of the non-prop attributes passed to our component.

What does this mean?

When we actually use our component, any element attribute we add **that is not declared in our props** will be available inside `context.attrs`

Say we have a custom component that accepts a [prop](https://learnvue.co/2020/08/an-introduction-to-vue3-props-a-beginners-guide/) called value.

```js
export default {
  props: {
    value: String,
  },
  setup(props, context) {
    console.log(context.attrs)
  },
}
```

And then in a parent component, we pass it several attributes.

```js
<template>
   <custom-component
      :value="value"
      test="hi"
      @close="close"
    />
</template>
```

The result of our log statement will be:

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/explaining-the-vue-context-argument-a-composition-api-tutorial-2.png)

As you can see, it contains everything besides our declared props. This includes things like event listeners and HTML attributes.

One important note here is attrs is **not reactive**. Meaning that if we want to apply side effects in response to values of attrs changing, we should use the onUpdated lifecycle hook instead.

## context.slots

Next, `context.slots` is a little confusing, so let’s walk through an example of when it’s useful.

In short, `context.slots` gives us access to the render method of [each of the slots](https://learnvue.co/2019/12/using-component-slots-in-vuejs%20-%20an-overview/). This is useful when we’re writing our own**custom render function**, and not using template code.

Vue recommends using templates in a majority of use cases, but if you really want to use the full power of JavaScript, we can create our own render functions.

[The example in the Vue docs](https://v3.vuejs.org/guide/render-function.html) for a great time to use a custom render method is if we are creating a component that renders a slot value with different level heading depending on the value of a prop.

```vue
<template>
  <div>
    <h1 v-if="level == 1">
      <slot />
    </h1>
    <h2 v-if="level == 2">
      <slot />
    </h2>
    <h3 v-if="level == 3">
      <slot />
    </h3>
    <h4 v-if="level == 4">
      <slot />
    </h4>
    <h5 v-if="level == 5">
      <slot />
    </h5>
    <h6 v-if="level == 6">
      <slot />
    </h6>
  </div>
</template>

<script>
export default {
  props: {
    level: Number,
  },
}
</script>
```

In this code, we’re using v-if and v-else-if conditionals for all 6 heading options. And as you can see, there’s a lot of duplicate code, and it just looks extremely cluttered.

Instead, we could use the render function to programmatically generate our heading. With the Composition API setup function, that looks like this.

```js
import { h } from 'vue'
export default {
  props: {
    level: Number,
  },
  setup(props, context) {
    console.log('here')
    return () =>
      h(
        'h' + props.level,
        {} // props and attributes: OPTIONAL
        /* MISSING!! this is where children go, for us our slot */
      )
  },
}
```

However, how do we get our slots to render??

That’s where `context.slots` comes into play.

By giving us access to every slot’s render function, we can easily add our slot to our render function. Each slot is accessible by its name and since we did not explicitly name our slot, it’s named default.

```js
import { h } from 'vue'
export default {
  props: {
    level: Number,
  },
  setup(props, context) {
    console.log('here')
    return () =>
      h(
        'h' + props.level,
        {}, // props and attributes: OPTIONAL
        context.slots.default() /* Rendering our default slot */
      )
  },
}
```

Now, if we run this with a simple parent component like this

```vue
<template>
  <child-component :level="1"> Hello World </child-component>
</template>
```

Here’s what our finished DOM will look like.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/explaining-the-vue-context-argument-a-composition-api-tutorial-3.png)

Fantastic!

So, you likely won’t be using context.slots too often, but when you’re writing complex JavaScript render functions, it’s a **powerful** feature.

## context.emit

And finally, `context.emit` replaces `this.$emit` as our way to [emit events from our component](https://learnvue.co/2020/01/a-vue-event-handling-cheatsheet-the-essentials/).

This is useful for sending any sort of event, with or without data, to a parent component.

Let’s say we want to create an X button that emits an event called `close`.

```vue{}[ModalComponent.vue]
<template>
  <div>
    <button @click="closeModal">X</button>
  </div>
</template>

<script>
  export default {
      setup (props, context) {
        const closeModal = () => {
          context.emit('close' /* can pass payload here */)
        }
        return {
          closeModal
        }
      }
  }
</script>
```

Then inside our parent component, we can listen for this close event with the `v-on` directive.

```html{}[ParentComponent.vue]
<modal-component @close="handleClose" />
```

For a full guide on using [emit in Vue, check out this article](https://learnvue.co/2021/05/a-guide-to-vue-emit-how-to-emit-custom-events-in-vue/) or [YouTube tutorial](https://youtu.be/EEeaG0BTBQo)!

## What don’t we have access to in setup

So far we’ve seen how the Composition API gives us access to four different properties: `props`, `attrs`, `slots`, and `emit`.

But since setup runs before our component instance is created, we **will not** have access to these three component properties:

- `data`
- `computed`
- `methods`

These are properties that we declare inside `setup` itself, but we do not have a built-in way to access a list of all of the data properties, for example.

## Final Thoughts

In this article, we’ve learned how the Composition API way of accessing some component properties.

Since we don’t have the same access to this as the Options API, the setup function has two arguments that we can use to access a component’s props, attrs, slots, and emit method.

By using the props and context arguments, we can access powerful component properties and add full functionality to all kinds of Vue projects.

If you have any questions, leave them in the replies below!
