---
author: Matt Maribojoc
title: 12 VueJS Best Practices for Pro Developers
snippet: Hopefully these best practices can help you write better VueJS code. You’ll definitely thank yourself down the line for making your life easier.
publishedDate: 2020/01/12
tags: best practices,dev tips,efficiency
category: Quick Tips
cover: articles/vue-best-practices
---
As Vue continues to become more and more widespread, there are several best practices emerging and becoming standard.

For this article, I included some tips from a few great resources.

- [VueJS Official Style Sheet](https://vuejs.org/v2/style-guide/)
- [LearnVueJS Vue Patterns](https://learn-vuejs.github.io/vue-patterns/patterns/#composition-2)
- [Deverus VueJS Style Guide](https://gist.github.com/letanure/8b4e8ee8f7b065860df942f0e53d6fc9)

Hopefully, these best practices can help you write better VueJS code. Not only will that make all your fellow developers love you, but you’ll definitely thank yourself down the line for making your life easier.

Okay, enough introduction. Let’s dive right in.

## 1\. Always use :key inside v-for

Using the key attribute with the v-for [directive](https://learnvue.co/2020/01/creating-your-first-vuejs-custom-directive/) helps your application be constant and predictable whenever you want to manipulate the data.

This is necessary so that Vue can track your component state as well as have a constant reference to your different elements. An example where keys are extremely useful is when using animations or [Vue transitions](https://learnvue.co/2020/01/how-you-can-use-vue-transitions-right-now).

Without keys, Vue will just try to make the DOM has efficient as possible. This may mean elements in the v-for may appear out of order or their behavior will be less predictable. If we have a \_unique\_ key reference to each element, then we can better predict how exactly our Vue application will handle DOM manipulation.

```vue
<template>
  <!-- BAD -->
  <div v-for="product in products">{{ product }}</div>

  <!-- GOOD! -->
  <div v-for="product in products" :key="product.id">{{ product }}</div>
</template>
```

## 2\. Use kebab-case for events

When it comes to emitting custom events, it’s always best to use kebab-case. This is because in the parent component, that’s the same syntax we use to listen to that event.

So for consistency across our components, and to make your code more readable, stick to using kebab-case in both places.

```js{}[PopupWindow.vue]
this.$emit("close-window");
```

```vue{}[ParentComponent.vue]
<template>
<popup-window @close-window='handleEvent()' />
</template>
```

## 3\. Declare props with camelCase and use kebab-case in templates

This best practice simply just follows the conventions for each language. In JavaScript, camelCase is the standard and in HTML, it’s kebab-case Therefore, we use them accordingly.

Luckily for us, VueJS converts between kebab-case and camelCase for us so we don’t have to worry about anything besides actually declaring them.

> In JavaScript, camelCase is the standard and in HTML, it’s kebab-case Therefore, we use them accordingly.

```vue
<template>
  <PopupWindow title-text="hello world" />
</template>

<script>
export default {
  props: {
    titleText: String,
  },
}
</script>
```

## 4\. Data should always return a function

When declaring component data in the Options API, the data option should always return a function. If it does not, and we just simply return an object, then that data will be shared across **all** instances of the component.

```js
export default {
  data() {
    // <---
    return {
      name: 'My Window',
      articles: [],
    }
  },
}
```

However, most of the time, the goal is to build **reusable** components, so we want each object to return a unique object. We accomplish this by returning our data object inside a function.

## 5\. Don’t use v-if with v-for elements

It’s super tempting to want to use v-if with v-for in order to filter elements of an array.

```html
<!--BAD-->
<div
   v-for='product in products'
   v-if='product.price < 500'
>
```

The problem with this is that VueJS prioritizes the v-for directive over the v-if directive. So under the hood, it loops through every element and THEN checks the v-if conditional.

> This means that even if we only want to render a few elements from a list, we’ll have to loop through the entire array.

This is no good.

A smarter solution would be to iterate over a [computed property](https://learnvue.co/2019/12/mastering-computed-properties-in-vuejs/). The above example would look something like this.

This means that even if we only want to render a few elements from a list, **we’ll have to loop through the entire array.**

```vue
<template>
  <div v-for="product in cheapProducts">{{ product }}</div>
</template>

<script>
export default {
  computed: {
    cheapProducts: () => {
      return this.products.filter(function (product) {
        return product.price < 100
      })
    },
  },
}
</script>
```

This is good for a few reasons.

- Rendering is much more efficient because we don’t loop over every item
- The filtered list will only be re-evaluated when a dependency changes
- It helps separate our component logic from the template, making our component more readable

## 6\. Validate your props with good definitions

This is arguably the most important best practice to follow.

_Why is it important?_

Well. It basically saves future you from current you. When designing a large scale project, it’s easy to forget exactly the exact format, type, and other conventions you used for a prop.

And if you’re in a larger dev team, your coworkers aren’t mind-readers so make it clear to them how to use your components! So save everyone the hassle of having to painstakingly trace your component to determine a prop’s formatting and please just write prop validations.

Check out this example from the Vue docs.

```js
export default {
  props: {
    status: {
      type: String,
      required: true,
      validator: function (value) {
        return (
          ['syncing', 'synced', 'version-conflict', 'error'].indexOf(value) !==
          -1
        )
      },
    },
  },
}
```

## 7\. Use PascalCase or kebab-case for components

A common naming convention for components is to use PascalCase or kebab-case.

No matter which one you choose for your project, it’s most important that you stay consistent all the time.

PascalCase works best because it is supported by most IDE autocomplete features.

```md
# BAD

mycomponent.vue  
myComponent.vue  
Mycomponent.vue

# GOOD

MyComponent.vue
```

## 8\. Base components should be prefixed accordingly

Another naming convention is focused around naming base components – or components that are purely presentational and help setup common styles across your app.

According to the Vue style guides, base components are components that **only** contain…

- HTML elements
- Additional base components
- 3rd party UI components

The best practice for naming these components is to give them the prefix “Base”, “V”, or “App”.

Once again, it’s alright to use either of these as long as you stay consistent throughout your project.

The purpose of this naming convention is that it keeps your base components together in your file system.

Also, using a webpack import function, you can search for components matching your naming convention pattern and automatically import all of them as globals in your Vue project.

## 9\. Components declared and used ONCE should have the prefix “The”

Similar to base components, single instance components (ones used _once per page_ and does not accept props) have
their own naming convention.

These components are specific to your app and are normally things like a header, sidebar, or footer.

There should only ever be **one** active instance of this component.

- TheHeader.vue
- TheFooter.vue
- TheSidebar.vue
- ThePopup.vue

## 10\. Stay consistent with your directive shorthand A common technique among

Vue developers is to use shorthand for directives. For example,

- `@` is short for v-on:
- `:` is short for v-bind
- `#` is short for [v-slot](https://learnvue.co/2019/12/using-component-slots-in-vuejs%e2%80%8a-%e2%80%8aan-overview/)

It is great to use these shorthands in your Vue project. But to create some sort of convention across your project, you should either **always** use them or **never** use them. This will make your project more cohesive and readable.

## 11\. Don’t call a method on created AND watch

A common mistake Vue developers make (or maybe it was just me) is they unnecessarily call a method in created
and watch.

The thought behind this is that we want to run the watch hook as soon as a component is initialized.

```vue
<script>
// BAD!
  export default {
   created: () {
    this.handleChange()
   },
   methods: {
    handleChange() {
     // stuff happens
    }
   },
   watch () {
    property() {
     this.handleChange()
    }
   }
  }
</script>
```

However, there Vue has a built in solution for this. And it’s a property of [Vue watchers](https://learnvue.co/2019/12/a-simple-vue-watcher-tutorial-for-beginners/) that we often forget.

All we have to do is restructure our watcher a little bit and declare two properties:

- handler (newVal, oldVal) – this is our watcher method itself
- immediate: true – this makes our handler run when our instance is created

```vue
<script>
export default {
 methods: {
  handleChange() {
   // stuff happens
  }
 },
 watch () {
  property {
   immediate: true
   handler() {
    this.handleChange()
   }
  }
 }
}
</script>
```

## 12\. Template expressions should only have basic JavaScript expressions

It’s natural to want to add as much inline functionality in your templates as possible. But this makes our template less declarative and more complex. Meaning that our template just gets extremely cluttered.

For this, let’s check out another example from the Vue style guide.Look how confusing it is.

```vue
<template>
  <!--BAD-->
  {{
    fullName
      .split(' ')
      .map(function (word) {
        return word[0].toUpperCase() + word.slice(1)
      })
      .join(' ')
  }}
</template>
```

Basically, we want everything in our template to be intuitive as to what it is
displaying. To keep this, we should refactor complex expressions into
appropriately named component options. Another benefit of separating out complex
expressions is that it means these values can be reused.

```vue
<template>{{ normalizedFullName }}</template>

<script>
export default {
  // The complex expression has been moved to a computed property
  computed: {
    normalizedFullName: function () {
      return this.fullName
        .split(' ')
        .map(function (word) {
          return word[0].toUpperCase() + word.slice(1)
        })
        .join(' ')
    },
  },
}
</script>
```

## Conclusion

And there you have it.

Those were 12 of the most common best practices that will make your Vue code more maintainable, readable, and more professional. Hopefully these tips were useful to you (because they’re definitely things that I always want to remember).
