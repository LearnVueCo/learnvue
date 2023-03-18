---
author: Matt Maribojoc
title: How to Use Vue CSS Variables - Reactive Styles RFC
snippet: The Single File Component Styles RFC gives us Vue developers a way to use a component’s reactive data as CSS variables.
publishedDate: 2021/05/25
tags: rfc,styles,vue 3
slug: how-to-use-vue-css-variables-reactive-styles-rfc
videoLink: https://youtube.com/v/PPrUWISAbmU
category: Quick Tips
cover: articles/reactive-styles-vue-3
---
The [Single File Component Styles RFC](https://github.com/vuejs/rfcs/pull/231) gives us Vue developers a way to use a component’s reactive data as CSS variables.

In just one simple syntax, we can update styles at runtime [in Vue 3](https://learnvue.co/2020/12/setting-up-your-first-vue3-project-vue-3-0-release/).

This proposed change takes full advantage of CSS variables, which most modern browsers support, and Vue 3’s reactivity library. Combining the two gives us an easy way to **update our styles using our component’s data**.

In this guide, we’ll take a look at how we can use these SFC styles, how it works under the hood, and then some advanced knowledge from the RFC.

Ready? Me too. Let’s hop right in.

## How can we use SFC Styles?

To keep it short, there are just two steps we need to use this feature:

- Declare reactive data inside our component’s script
- Access them in our CSS using v-bind

Let’s take a look at an example where we bind the color of a paragraph to component data.

```vue
<script setup >
import { ref } from 'vue'

const color = ref('red')
</script>
<template>
  <div>
    <div class="text">hello</div>
  </div>
</template>

<style>
  color: v-bind(color);
}
</style>
```

That’s it!

If we look at our component in the browser, we can see that our element is properly getting the value for its color from our data.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/how-to-use-vue-css-variables-reactive-styles-rfc-1.png)

This also works with more complex data structures, let’s say that we have an object called `fontStyles` and inside it has a property called `weight`.

We still access it using v-bind, but since we are not just passing a variable name and need to use a JavaScript expression to access this inner property, **we have to wrap our expression in quotes.**

```vue
<template>
  <div>
    <div class="text">hello</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red',
      font: {
        weight: '800',
      },
    }
  },
}
</script>

<style>
.text {
  color: v-bind(color);
  /* wrapped in quotes */
  font-weight: v-bind('font.weight');
}
</style>
```

And now our result should look something like this.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/how-to-use-vue-css-variables-reactive-styles-rfc-2.png)

## Reactive Styles in Vue

No matter if we’re using a JavaScript expression or just a root-level data binding, we can leverage Vue’s built-in reactivity to update our styles at runtime.

Let’s say that we want to be able to change the color of our text using a button, that can be done like this.

```html
<div>
  <div class="text">hello</div>
  <button @click="color = 'blue'">Make Blue</button>
</div>
```

All we have to do is change our reactive data and our CSS styles will update! This is why this feature is so powerful, it gives us a clean way to modify **how our page looks at runtime.**

So here’s what the text example would look like…

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/how-to-use-vue-css-variables-reactive-styles-rfc-3.png)

## How Do Vue SFC Style Variables Work?

Now that we’ve seen how to add reactive styles into our Vue app, let’s take a deeper look and understand exactly what’s happening.

If we inspect element, we can get a better idea of how Vue is working its magic.

Any variable referenced inside of our style section is being added as inline style on our component’s root element.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/how-to-use-vue-css-variables-reactive-styles-rfc-4.png)

Written as normal CSS that looks something like this, where we are declaring CSS variables called `--015c408c-color` and setting it to **red** and `--015c408c-font_weight` and setting it to **800**.

```css
element.style {
  /* root element */
  --015c408c-color: red;
  --015c408c-font_weight: 800;
}

.text {
  color: var(--015c408c-color);
  font-weight: var(--015c408c-font_weight);
}
```

Then, the v-bind in our styles converts to using the CSS var syntax with our new CSS variables. If we look at the style for our `.text`, we can see this.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/how-to-use-vue-css-variables-reactive-styles-rfc-5.png)

This is what is allowing each element to access the data properties.

Then, whenever a piece of reactive data changes…

- Our inline style changes, which means…
- Our CSS variables change, which means…
- The end styles change to reflect the new values of the CSS variables

And this is how we can update the styles at runtime as we did with our color!

I think this is smart and a fantastic addition to Vue.

## Some things you should know…

### CSS Variables are not available in the child component

To avoid inheritance issues, CSS variables defined are not available to any of its child components.

For example, if we add a child to our existing component.

```vue
<template>
  <div>
    <div class="text">hello</div>
    <button @click="color = 'blue'">Make Blue</button>
    <child-component />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue'
export default {
  components: {
    ChildComponent,
  },
  data() {
    return {
      color: 'red',
      font: {
        weight: '800',
      },
    }
  },
}
</script>

<style>
.text {
  color: v-bind(color);
  /* expressions (wrap in quotes) */
  font-weight: v-bind('font.weight');
}
</style>
```

And let’s say our child component is built like this.

```vue
<template>
  <div class="child-text">Child Component</div>
</template>

<style>
.child-text {
  color: v-bind(color);
}
</style>
```

This will **not change** the color because our child component does not know any CSS variables.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/how-to-use-vue-css-variables-reactive-styles-rfc-6.png)

### Check the Browser Support before Using

If you’re looking to implement this in a production setting, please make sure to check the browser support for CSS variables.

Without CSS variables, SFC Style Vars will not work so if your application needs to support certain older browsers, this may not be a viable option for you.

[Here’s a link to a table of browsers that support this feature.](https://caniuse.com/css-variables)

## Final Thoughts

This is a really interesting feature that – similar to the [script setup syntax](https://learnvue.co/2021/05/explaining-the-new-script-setup-type-in-vue-3-major-takeaways-from-the-rfc/) – looks like it will eventually work its way out of the experimental stage and wind up being merged into Vue 3.

Using Vue for CSS Variables with SFC style variables is an intuitive way to add reactive styles to your Vue component.

I’d love to know your thoughts about this feature! Let me know any comments or questions down in the replies and let’s talk!

Happy coding!
