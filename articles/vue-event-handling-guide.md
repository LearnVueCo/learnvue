---
author: Matt Maribojoc
title: A Guide to Vue Event Handling - with Vue 3 Updates
snippet: Covering the essentials of event handling and providing some code examples for working with modifiers custom events and so much more.
publishedDate: 2020/01/30
tags: basics,events,listeners,vue3
videoLink: https://youtube.com/v/EEeaG0BTBQo
category: Vue Essentials
cover: articles/vue-event-handling-guide
---
Vue event handling is a necessary aspect of every Vue project. It’s used to capture user input, share data, and so many other creative ways.

In this article, I’ll be going over the basics and providing some code examples for working with events. It will just include the tips/methods that I find the most useful, for an indepth look at all the things Vue can do, check out the [Vue docs.](https://vuejs.org/v2/guide/events.html)

## Basic Event Handling

Using the `v-on` [directive](https://learnvue.co/2020/01/creating-your-first-vuejs-custom-directive/) (`@` for short) we can listen to DOM events and run either a handler method or inline JavaScript

```html
<div v-on:click="handleClick" />

<div @click="handleClick" />
```

We’ll be covering some of the more common events that you may want to capture, click here for a complete list of [DOM events](https://developer.mozilla.org/en-US/docs/Web/Events).

## Emitting custom events

A common use case in any web framework is wanting a child component to be able to emit an event to its parent. This will allow for two-way data binding.

One example of this is sending data from an input component to the parent form.

Depending on if we are using the Options API or the Composition API, the syntax for emitting events is different.

In the Options API, we can simply call `this.$emit(eventName, payload)`

Our example of our component might look like this.

```js
export default {
  methods: {
    handleUpdate: () => {
      this.$emit('update', 'Hello World')
    },
  },
}
```

However, the Composition API has a different `this` reference. Instead, we can use the [Vue 3 setup method](https://learnvue.co/2020/09/setting-up-your-first-vue3-project-vue-3-0-release/)to directly access the emit method.

> The second argument for the setup method is the context variable which contains three properties: attrs, slots, and most importantly for us, **emit**.

As long as we import our context object, we can call emit using the same arguments as the Options API.

```js
export default {
  setup(props, context) {
    const handleUpdate = () => {
      context.emit('update', 'Hello World')
    }

    return { handleUpdate }
  },
}
```

One way to tidy up our code is to import emit directly using object destructuring. That would look something like this.

```js
export default {
  setup(props, { emit }) {
    const handleUpdate = () => {
      emit('update', 'Hello World')
    }

    return { handleUpdate }
  },
}
```

Awesome.

Regardless if we use the Options or Composition API, our parent component listens to our event the same way.

```html
<HelloWorld @update='inputUpdated'/>
```

If the method we emit also passes a value, we can capture it in two different ways – depending if we are working inline or with another method.

First, we can access the passed value using `$event` in our template.

```html
<HelloWorld @update="inputUpdated($event)" />
```

Second, if we use a method to handle our event, the passed value will be automatically passed as the first argument to our method.

```vue
<template>
  <HelloWorld @update="inputUpdated" />
  <template>
    <script>
      // ...
      methods: {
        inputUpdated: (value) => {
          console.log(value) // WORKS TOO
        }
      }
    </script></template
  >
</template>
```

## Handling mouse modifiers

Here are a list of the primary DOM [mouse events](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) that we can capture in our `v-on` directive:

```html
<div
  @mousedown='handleEvent'
  @mouseup='handleEvent'
  @click='handleEvent'
  @dblclick='handleEvent'
  @mousemove='handleEvent'
  @mouseover='handleEvent'
  @mousewheel='handleEvent'
  @mouseout='handleEvent'
>
Interact with Me!
</div>
```

For our click events, we can also add mouse event modifiers to limit which mouse buttons will trigger our event. There are three (one for each button): `left`, `right`, and `middle`.

```html
<!-- This will only trigger for the left mouse click -->
<div @mousedown.left='handleLeftClick'> Left </div>
```

## Key Modifiers

There are three DOM [keyboard events](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) that we can listen to

```html
<input
   type='text'
   placeholder='Type something'
   @keypress='handleKeyPressed'
   @keydown='handleKeyDown'
   @keyup='handleKeyUp'
/>
```

Often, we want to detect these events on a certain key, there are two ways to do this.

- [keycodes](https://keycode.info/)
- Vue has aliases for certain keys (`enter`, `tab`, `delete`, `esc`, `space`, `up`, `down`, `left`, `right`)

```html
<!-- Trigger even when enter is released -->
<input
   type='text'
   placeholder='Type something'
   @keyup.enter='handleEnter'
/>

<!-- OR -->
<input
   type='text'
   placeholder='Type something'
   @keyup.13='handleEnter'
/>
```

## System Modifiers

For certain projects, we may only want to trigger events if a user is pressing down a modifier key. A modifier key is something like command or shift.

In Vue, there are four system modifiers.

- `shift`
- `alt`
- `ctrl`
- `meta` (cmd on macs and the windows key on windows)

This can be extremely useful for creating features like custom keyboard shortcuts inside your Vue application.

```html
<!-- Custom Shortcut that creates a list for Shift + 8 -->
<input
   type='text'
   placeholder='Type something'
   @keyup.shift.56='createList'
/>
```

Going through the Vue docs, there is also an `exact` modifier, ensuring that the event will only be triggered if **only** the keys we specify are pressed and no others.

```html
<!-- Custom Shortcut that creates a list for Shift + 8 ONLY -->
<input
   type='text'
   placeholder='Type something'
   @keyup.shift.56.exact='createList'
/>
```

## Event Modifiers

For all DOM events, we can use some modifiers that change how they run. Whether it’s stopping propagation or prevent the default action, Vue has a couple of built in DOM event modifiers.

```html
<!-- Prevent Default Action -->
<form @submit.prevent>

<!-- Stop Event Propagation -->
<form @submit.stop='submitForm'>

<!-- Easy to Join Modifiers -->
<form @submit.stop.prevent='submitForm'>

<!-- Prevent event from being triggered more than once -->
<div @close.once='handleClose'>
```

## Conclusion

Hopefully, this short cheatsheet gave you a better view of Vue event handling and what’s possible.

As always, I recommend also checking out the [Official Vue Documentation](https://vuejs.org/v2/guide/events.html) for a more in-depth look at the features of Vue event handling.

Happy coding!
