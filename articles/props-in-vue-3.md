---
author: Matt Maribojoc
title: An Introduction to Vue Props
snippet: The ability to pass data between components is a key part of Vue projects. In Vue 3 the way we access props inside components is different than before.
publishedDate: 2020/08/25
tags: basics,props,tutorial,vue3
category: Vue Essentials
cover: articles/props-in-vue-3
---
Props are an essential part of any modern JavaScript framework.

The ability to pass data between components is a fundamental element of Vue projects. In Vue 3, the way we can access props inside a Vue component is a little different than before.

In this quick little article, we’ll go over this new change as well as take a look at the decisions behind the switch.

Alright, let’s jump right in!

## Why is it important to use props?

First, we have to understand what [props are.](https://vuejs.org/v2/guide/components-props.html) Props are custom attributes that we can register on a component that allow us to pass data from a parent component to one of its children.

Since props allow us to share data between components, it lets us organize our Vue projects and components into more modular components.

![Parents pass props to child components, and child components emit events to communicate with their parent component](/img/articles/props-in-vue-3/props-diagram.png)

## Let’s just jump into an example

Previously, a component’s props were just part of the `this` object and could simply be accessed by using this.propName.

However, one huge change in Vue 3 is the introduction of the setup method.

This setup method, which you can learn more about here, now contains almost all of the code that used to be separated into different options like data, computed, watchers, etc. One major detail about this new method is that `this` does not have the properties that it used to in Vue2.

So how do we use Vue 3 props without using `this`?

Luckily, it’s super simple. Our setup method actually takes two arguments

- `context` – an object that exposes specific properties that used to be found on `this`
- props – an object that contains a component’s `props`

As you might guess, this props argument is what we’re going to be using to access our props. All we have to do is props.propName – no more need for the this variable!

Our code might look something like this.

```vue
<script>
setup (context, props) {
    // context has attrs, slots, and emit()
    console.log(props.propName) // access a prop to our component
}
</script>
```

Easy right!

## Why do Vue 3 props work differently than Vue2?

The main motivation behind the change in the way we access Vue 3 props is to make it clearer `this` means in a component/method. Sometimes when looking at Vue2 code, it could be ambiguous what `this` was referring to.

A big goal for the Vue Team when designing Vue 3 was to make it more scalable for large projects. Part of this was redesigning the Options API to the Composition API to allow for better code organization.

![Grouping logic in the Composition API versus the Options API](/img/articles/props-in-vue-3/options-vs-composition.png)


But by eliminating a majority of references to `this` and instead using explicit context and props variables, it would increase readability for large Vue projects.

If you want to learn more about the setup method and the [main differences between Vue2 and Vue 3, check out this article](https://learnvue.co/2020/02/building-the-same-component-in-vue2-vs-vue3).

## And there ya go

As you can tell, Vue 3 props work generally the same as Vue2, the main change is how we can access them inside our new setup method.

I hope that this quick little lesson will help make the transition to Vue 3 a little bit easier.

If you have any questions, comments, or just want some Vue help, leave a comment down below. Happy coding!
