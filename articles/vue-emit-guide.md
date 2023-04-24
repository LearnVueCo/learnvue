---
author: Matt Maribojoc
title: A Guide to Vue $emit - How to Emit Custom Events in Vue
snippet: Vue $emit lets us emit custom events from a child component to its parent in the Options and Composition API.
publishedDate: 2021/05/19
updatedDate: 2022/06/18
tags: event handling,vue $emit,vue 3,vue emit
videoLink: https://youtube.com/v/EEeaG0BTBQo
category: Vue Essentials
description: Many Vue patterns involve passing data from a parent component to its children using props. But what if we need a child to affect its parent?
cover: articles/vue-emit-guide
---

Many Vue patterns involve passing data from a parent component to its children using `props`. But what if we need a child to affect its parent?

Using `emit`, we can trigger events and pass data up the component heirarchy. This is useful for things like:

- emitting data from an input
- closing modals from inside the modal itself
- making our parent component respond to one of its children

## How does Vue Emit Work?

When we emit an event, we invoke a method with one or more arguments:

- `eventName: string` – the name of our event. Our parent component will listen for this.
- `values: any` – any value(s) that we want to pass with our event

Here’s an example of an inline emit, `<button @click="$emit('add', Math.random())">`. We are emitting an event called `add` and passing it a value of `Math.random()`

Then, using the `v-on` or `@` directive, a parent component can listen to our custom `add` event and receive the value.

::prose-code-multiple
---

fFilename: Child.vue
fLang: vue
sFilename: Parent.vue
sLang: vue
---

#second

```vue {7}
<script setup>
import { ref } from 'vue'
const count = ref(0)

// can also call a function from our template `<ChildComponent @add="add" />`
// const add = (i) => count.value += i

</script>

<template>
  <ChildComponent @add="(i) => count += i" /> 
  <p>Count: {{ count }}</p>
</template>
```

#first

```vue {2}
<template>
  <button @click="$emit('add', Math.random())">
    Add Math.random()
  </button>
</template>
```

::

:demo-window{src="/articles/vue-emit-guide/basic" type="nuxt"}

Every time we click our button, `Child.vue` emits an event called `add` with a random value between 0 and 1. Then, `Parent.vue` captures this event and adds that value to `count`

We can pass as many arguments as we want and our listener will receive all of them.

- Child - `$emit('add', Math.random(), 44, 50)`
- Parent - `@add="(i, j, k) => count += i + j + k"`

So now, we know how to emit inline events in our template, but in more complicated examples, it's better if we  emit an event from the `script` section of our SFC instead. This is useful when we want to perform some logic before emitting an event.

In Vue 3, we have 2 different ways to do this:

- Options API – `this.$emit`
- Composition API with setup() – `context.emit`
- Composition API with `<script setup>` - `defineEmits()`

Let’s check out an example for each.

## `this.$emit` Options API

Like most things in Vue 3, we have the choice of using the Options API or the Composition API.

In the Options API, we can call `this.$emit` to emit a custom event.

Let's take a look at an example where we have `MyTextInput.vue` that contains a label and a text input. Whenever the text changes, we want to emit an event with the uppercased value of our input.

Instead of calling `$emit` from our template, we can call a component method instead. Inside, we can call `this.$emit` and pass it our value.

::prose-code-multiple
---

fFilename: MyTextInput.vue
fLang: vue
sFilename: Parent.vue
sLang: vue
---

#first

```vue{5}
<script>
  export default {
      methods: {
          handleChange (event) {
              this.$emit("customChange", event.target.value.toUpperCase())
          }
      }
  }
</script>

<template>
  <div>
    <label>My Custom Input</label>
    <input type="text" placeholder="Custom input!" @input="handleChange" />
  </div>
</template>
```

#second

```vue {18}
<script>
  export default {
    data() {
      return {
        uppercase: ''
      }
    },
    methods: {
        handleCustomChange (s) {
          this.uppercase = s
        }
    }
  }

</script>

<template>
  <my-text-input @custom-change="handleCustomChange" /> 
  <p>Uppercase: {{ uppercase }}</p>
</template>
```

::

:demo-window{src="/articles/vue-emit-guide/intermediate" type="nuxt"}

While this is a simple example, extracting this logic outside of our component gives us **easier access** to other properties in our data and helps keep our logic organized in larger files.

## Emitting Events with `setup()`

In the Composition API, if we use the `setup` function, we don't have access to our component with `this` - meaning we can't call `this.$emit()` to send our event.

Instead, we can access our `emit` method by using the second argument of our `setup` function – `context`.

`context` has access to your components slots, attributes, and most importantly for us, its **emit method**.

We can call `context.emit` with the same event name and values that we used before.

```vue{4,6,13,15}[MyTextInput.vue]
<script>
  export default {
    // can use the entire context object
    setup (props, context) {
        const handleChange = (event) => {
            context.emit("customChange", event.target.value)
        }
        return {
            handleChange
        }
    },
    // or we can destructure it and get `emit`
    setup (props, { emit }) { 
        const handleChange = (event) => {
            emit("customChange", event.target.value)
        }
        return {
            handleChange
        }
    }
  }
</script>

<template>
  <div>
    <label>My Custom Input</label>
    <input type="text" placeholder="Custom input!" @input="handleChange" />
  </div>
</template>

```

:demo-window{src="/articles/vue-emit-guide/intermediate" type="nuxt"}

## Usage in `<script setup>`

When we are using `<script setup>`, we don't have access to the component instance or the setup function's `context` argument.

Soooo. How do we get `emit`?

In this case, we have a compiler macro called `defineEmits` that let us:

- specify events that our component emits
- add validations for each event
- have access to the same value as `context.emit` so we can emit events

In the simplest case, `defineEmits` array of strings, with each one being the name of an event.

```vue{}[MyTextInput.vue]
<script setup>
const emit = defineEmits(['customChange'])

const handleChange = (event) => {
  emit('customChange', event.target.value.toUpperCase())
}
</script>
```

:demo-window{src="/articles/vue-emit-guide/intermediate" type="nuxt"}

However, if we pass an object, we can add a validator function for each event that lets us check we're emitting events with proper values.

Like event listeners, the validator accepts however many values as we pass in.

This works similar to prop validation, where if our validator returns `false`, we'll get a warning in our console. While the event with the unvalidated value will still be emitted, the console warning provides **valuable feedback** during development.

```vue{}[MyTextInput.vue]
<script setup>
const emit = defineEmits({
  unvalidatedEvent: null, // if we want an event without validation
  customChange: (s) => {
    if (s && typeof s === 'string') {
      return true
    } else {
      console.warn(`Invalid submit event payload!`)
      return false
    }
  },
})

const handleChange = (event) => {
  // no console warning
  emit('customChange', event.target.value.toUpperCase())
}

onMounted(() => {
  emit('customChange', 1) // not a string, warning!
})
</script>
```

## Best Practices

### Defining your custom events using `emits`

If we're not using `defineEmits`, we can still keep track custom events for a component by defining the `emits` option in our `export default`.

This is important for keeping good component documentation and for getting errors from Vue if we try to use an event not declared in `emits`.

Also, defining events makes component events take priority over the native events.

For example, if we define an event called `change` (an existing HTML event), we can override the default action.

```vue{}[MyTextInput.vue]
<script>
  export default {
      emits: ["change"] // or can pass object with validators
  }
</script>
<template>
  <div>
    <label>My Custom Input</label>
    <input
      type="text"
      placeholder="Custom input!"
      @input='$emit("change", $event.target.value)'
    />
  </div>
</template>

```

### Proper casing for events

In Vue 3, event names can automatically be converted between the different cases. Similar to props, it's **best to stick to each programming language’s conventions** and use `camelCase` in your script and `kebab-case` in your template.

However, if you're using Vue 2, event names don't have automatic case conversion and since `v-on` directive automatically converts your event names to lower case so camelCase named events impossible to listen to.

For example, if we emitted an event called `myEvent`, listening for `my-event`would not work.

## Final Thoughts

The ability to emit custom events in Vue is one of the most important techniques to understand before working on larger Vue projects.

I hope this overview of Vue `emit` helped explain the different ways to use this powerful feature in all sorts of Vue apps.

Happy coding!
