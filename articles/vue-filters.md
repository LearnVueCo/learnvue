---
author: Matt Maribojoc
title: How to Use VueJS Filters to Write Better Code
snippet: We have to understand what exactly are VueJS Filters. Simply put filters give us a way to create reusable text transformations.
publishedDate: 2020/01/06
tags: filters,reusable,tips,vuejs
category: Vue 2
cover: articles/vue-filters
---
Most VueJS developers are extremely familiar with computed properties. They’re a great way to design more readable code and declutter your template.

However, in certain cases, there’s a better solution that can make even more [reusable code](https://learnvue.co/2019/12/building-reusable-components-in-vuejs-tabs/): VueJS Filters.

By the end of this article, you should have a solid idea of when, why, and how to implement VueJS filters into your projects.

**3…2...1…Filter time!**

## How to Use VueJS Filters

First, we have to understand what exactly are VueJS Filters. Simply put, filters are a way in Vue 2 give us a way to create reusable text transformations.

Vue Filters differ from [computed properties](https://learnvue.co/2019/12/mastering-computed-properties-in-vuejs/) in two ways.

- Computed properties are **dependent** on specific properties whereas filters can be reused on different values
- Computed properties can be used on all properties while filters are primarily meant for **text transformations**

Going off number 2, because VueJS filters are meant for text transformations, they can only be used in two places: **mustache interpolations** (the curly braces in your template) and in **v-bind expressions**.

> Computed properties are **dependent** on specific properties whereas filters can be reused on different values

## So How Do We Code Them?

Coding a Vue filter should feel extremely familiar. Like defining computed properties or component methods in the Options API, just put them in your component options object inside a filters object.

For example, let’s say we want a preview filter that takes a String, returns the first 50 characters followed by an ellipsis. Inside our options object would look a little like this.

```js
export default {
  filters: {
    preview: (value) => {
      if (!value) {
        return ''
      }
      return value.substring(0, 50) + '...'
    },
  },
}
```

There are a couple important things to note here. First, we did an error check to see if the value was null. Second, we have to make sure that we **return** the value.

But overall, pretty easy right? Now, let’s see how to add this to your template.

Using a Vue filter requires a simple syntax. The format goes `value | filter`

As stated previously, there are two times we can use computed properties: between curly braces in your template and when using v-bind

```vue
<template>
  <!-- Mustache Interpolation -->
  {{ content | preview }}

  <!-- using a v-bind: -->
  <div :class="rawID | formatID" />
</template>
```

## More Advanced Techniques

Now that we’ve covered the basics of Vue filters, there are several advanced tips and tricks that make them even more powerful.

After learning these tips, the sky’s the limit to the kind of filters you can add.

### Declaring Global Filters

Our first implementation of filters went over using them locally, meaning that those filters will only be available to the component where we defined it. However, there are certain common filters that we would want available across our entire Vue project.

Examples could be generating a preview, date formatting, standardizing capitalization, and so on.

Luckily, just like other things in Vue, it’s easy to globally declare a filter. All we have to do is put use the Vue.filter function **before** initializing your Vue object.

```js{}[main.js]
Vue.filter("preview", (value) => {
  if (!value) {
    return "";
  }
  return value.substring(0, 30) + "...";
});
// init code
new Vue({
  /*...*/
});
```

### Chaining Filters

It’s also possible to apply multiple filters to a single value.

This is pretty intuitive. All we have to do is insert another “pipe” after our first filter, and then declare our second filter. Something like this.

```vue
<template>
  {{ content | preview | capitalized }}
</template>
```

Now, both text transformations are applied to our original data.

### Passing Arguments to Filters

Since Vue Filters are really just JavaScript functions, we can pass them parameters. It generally works just the way you’d expect, but with one **important** thing you have to know.

No matter if you pass arguments or not, the value you want to modify will be passed as the first argument.

For example, if we want to add an argument to our preview filter that allows us to change the cutoff point, we can do that like this.

```js
export default {
  filters: {
    preview: (value, cutoff) => {
      if (!value) {
        return ''
      }
      return value.substring(0, cutoff) + '...'
    },
  },
}
```

Then, when we declare our filter we just have to add a second parameter after our value. It would look like this.

```vue
<template>
  {{ content | preview(15) }}
</template>
```

The first parameter will be the value and the second, third, etc will be whatever we pass into the function.

## Why Not Computed Properties

You may be asking, _“Wait, can’t I just do this with computed properties?”_ And you can. However, that’s not always the best solution.

Like we were discussing earlier in the article, computed properties are just [Vue watchers](https://learnvue.co/2019/12/a-simple-vue-watcher-tutorial-for-beginners/). As a result, they are bound to specific properties. This means they can’t be generalized and applied to all sorts of data.

One common example where it would be super useful to use a filter instead of a computed property is**date formatting.**

Let’s say we have a list of articles and we want to display the date of every single item. If we used computed properties, this would be extremely hard. We would need to create computed properties for each item.

However, if we used filters, we could just format each date like this.

> As a result, they are bound to specific properties. This means they can’t be generalized and applied to all sorts of data.

This makes it so much simpler, readable, and can save major headaches down the line.

## Conclusion

Phew. We did it. The end of the article.

In short, VueJS filters can be a great way to implement reusable modifiers into your projects. They can be extremely powerful if used correctly and designing common filters should be one of the first steps of every Vue team.

Hopefully, you learned a thing or two or Vue filters and have thought of a few ways that you can implement it into your own projects.
