---
author: Matt Maribojoc
title: Creating Your First Vue Custom Directive - with Vue 3 Updates
snippet: A Vue custom directive is as you may guess Vue’s way of letting us build additional directives for our projects.
publishedDate: 2020/01/10
tags: advanced,customization
videoLink: https://youtube.com/v/ErUfigmqB3g
category: Advanced Vue
cover: articles/vue-custom-directives
---
In Vue, directives are one of the best ways to directly edit the DOM.

Some examples are `v-if`, `v-show`, `v-bind`, and so on. If you’ve worked in Vue, you are familiar with directives.

A Vue custom directive is, as you may guess, Vue’s way of letting us build additional directives for our projects. They’re a great way to add unique and reusable functionality across your project.

Vue custom directives can manipulate elements as well as handle reactivity in the DOM.

By the end of this intermediate tutorial, you will know:

- What a custom directive is
- Vue directive’s various event hooks
- How to create your custom directives

It’s custom directive time!

## What is a Custom Directive

Essentially, custom directives are a way to make your project fit your needs. If you use Vue plugins, you’ll notice that they use custom directives pretty frequently.

For example, in the [v-lazy plugin](https://github.com/hilongjw/vue-lazyload), they use the directive v-lazy to add custom functionality that makes image loading more effective. Using a directive is the best case here because we want to directly edit the DOM.

You may be asking, “_Can’t I just register component options like computed and watchers?_“

Yes. You can. But while [component options](https://learnvue.co/2019/12/mastering-computed-properties-in-vuejs/) are useful for abstraction and code reuse, custom directives are still one of the best ways to **directly manipulate DOM elements.**

> But while [component options](https://learnvue.co/2019/12/mastering-computed-properties-in-vuejs/) are useful for abstraction and code reuse, custom directives are still one of the best ways to **directly manipulate DOM elements.**

## A directive has five hooks

Like component and its lifecycle hooks, each Vue directive has its own hooks that trigger

The directive hooks are different in Vue 2 and Vue 3.

Here are the Vue 2 directive hooks:

- `bind` – called once when the directive is bound to an element
- `inserted` – when the bound element is inserted into its parent node
- `update` – when the element updates (but any children haven’t yet)
- `componentUpdated` – after the children have also updated
- `unbind` – called once when the directive is unbound from an element

And here are the Vue 3 directive hooks:

- `created` – called before the element’s attributes or event listeners are applied.
- `beforeMount` – same as the old bind hook
- `mounted` – same as the old inserted hook
- `beforeUpdate` – called before the element itself is updated (like lifecycle hooks)
- `updated` – same as the old componentUpdated hook
- `beforeUnmount` – called before an element is unmounted (like lifecycle hooks)
- `unmounted`– same as old unbind hook

When implementing these hooks, they each have a few arguments that they accept.

- `el` – the directive is bound to this element; gives you access to modify it
- `binding` – an object contain a lot of properties; we’ll go into depth in a second
- `vnode` – the virtual node
- `prevVnode` – the previous virtual node (only available in update hooks)

An important note in the [Vue docs for directives](https://v3.vuejs.org/guide/migration/custom-directives.html)is that you should treat these arguments (besides el) as read-only and never modify them.

### The Binding Object

The binding object contains several properties that help you actually add functionality to your hooks.

- `name` – the name of the directive (no `v-` prefix)
- `value` – the value passed to the directive
- `oldvalue` – the previous value of the directive (only available in update hooks)
- `expression` – the expression bound to the string (ex. `v-direc=”3 * 3″`, expression = `“3*3”`)
- `arg` – any arguments passed to the string (ex. V-direc:blue, arg = blue)
- `modifiers` – all modifiers passed as object (ex. V-direc.blue.link, modifiers = {blue: true, link: true}

## Defining your directive

Inside our `main.js` file – or wherever your Vue instance is defined – we just have to use the `Vue.directive` method in Vue 2 or the `app.directive` method in Vue 3.

For right now, let’s create a directive that allows us to manipulate the font size of our component. It’ll be called _v-font-size._

Inside `main.js`, we’ll add some code to listen to the `beforeMount` and `updated` hooks and adjust the font size.

```js{}[main.js]
// Vue 2
Vue.directive("font-size", {
  bind: (el, binding) => {
    el.style.fontSize = 24 + "px";
  },
  updated: (el, binding) => {
    el.style.fontSize = 24 + "px";
  },
});

// Vue 3
app.directive("font-size", {
  beforeMount: (el, binding) => {
    el.style.fontSize = 20 + "px";
  },
  updated: (el, binding) => {
    el.style.fontSize = 20 + "px";
  },
});
```

From here on out, I’ll be implementing the hooks using Vue 3, but you can map them to the Vue 2 hooks from above if you need to.

Then, inside any component file, let’s just add the following two lines so we can see our component in action! Whenever we declare a directive, we can access it using the prefix, `v-`.

```html
<p>Default Font Size</p>
<p v-font-size>Modified Font Size</p>
```

There is another way to define your Vue directive. For shorthand, you could also use this syntax inside `main.js`

```js{}[main.js]
// pass a function!
app.directive("font-size", (el, binding) => {
  el.style.fontSize = 24 + "px";
});
```

**If a function is passed instead of an object, then it will run during the bind and update hooks.**

We have our first custom directive working! Now, let’s make this a little more advanced.

## Passing arguments to your directive

There are a few ways of adding more control over your directive. This can be done through passing additional values, arguments, or modifiers

For our example, let’s say we want better control of the font size in our elements.

### Passed Values – for reactive data

The most intuitive way to pass data is to simply give it a value. This allows your directive to responsively update whenever the value changes. This also gives the most flexible control because you can accept a wide array of values (any font size).

In your component, the declaration would look like this…

```html
<p v-font-size='12'>Uses font-size directive</p>
<!-- OR USE A VARIABLE -->
<p v-font-size='fontSize'>Uses font-size directive</p>
```

And inside your directive, you would need to change your method to use the value from the `binding` object.

```js
app.directive('font-size', (el, binding, vnode) => {
  el.style.fontSize = binding.value + 'px'
})
```

### Sending arguments to directives

If you don’t really need any reactivity and just want a way to provide multiple options to your directive. Arguments are a great way to do that.

The code inside our directive goes like this.

```js
app.directive('font-size', (el, binding, vnode) => {
  console.log(binding + ' ' + vnode)
  var size = 16
  switch (binding.arg) {
    case 'small':
      size = 8
      break
    case 'large':
      size = 32
      break
    default:
      size = 16
      break
  }
  el.style.fontSize = size + 'px'
})
```

And then in our template.

```html
<p v-font-size:small>Small</p>
<p v-font-size:medium>Medium</p>
<p v-font-size:large>Large</p>
```

### Using modifiers

Modifiers are similar to arguments in that they’re not geared for reactivity. But when used in combination with arguments, you can create an extremely customized system.

**This is because you can apply multiple modifiers on a directive.**

Let’s just implement them in our directive first. The order of the `if` and `else-if` just depends on which modifiers you want to take priority.

```js{}[main.js]
Vue.directive("font-size", (el, binding, vnode) => {
  console.log(binding + " " + vnode);
  var defaultSize;
  if (binding.modifiers.small) {
    defaultSize = 12;
  } else if (binding.modifiers.large) {
    defaultSize = 32;
  } else {
    defaultSize = 16;
  }

  if (binding.modifiers.red) {
    el.style.color = "#ff0000";
  }

  el.style.fontSize = defaultSize + "px";
});
```

And then we can use them in our template

```html
<p v-font-size.small.red>Small</p>
<p v-font-size.medium>Medium</p>
<p v-font-size.large>Large</p>
```

## Conclusion

Congrats!

You’ve made it here and should now have some working knowledge of registering your Vue custom directives.

Thanks for following along and I hope that this article gave you the tools you need to build some amazing tools.

Happy Coding!
