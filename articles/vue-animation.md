---
author: Matt Maribojoc
title: Understanding Vue Transitions & Animations with Examples
snippet: Animations are a great way to give site visitors a better user experience. Luckily for developers VueJS animations take just minutes to set up.
publishedDate: 2020/02/19
tags: transitions,ui,ux
slug: vuejs-animations-for-beginners
videoLink: https://youtube.com/v/L77Uq93XXzk
category: UI Design
cover: articles/vue-animation
---
**Vue Transitions and Animations are a great way to make your website** feel more modern and to give site visitors a better user experience. Luckily for developers, Vue animations take just minutes to set up.

By the end of this guide, you’ll understand the Vue `<transition>` element, create some Vue animations using it, and know the essentials to adding them into your projects.

First, we’ll take a look at Vue Transition to handle conditionally rendered content.

![](/img/articles/vue-animation/1.gif)

Then, we’ll create our own CSS animation styles.

![](/img/articles/vue-animation/2.gif)

Finally, we’ll see how to use a third party CSS library with Vue animations.

![](/img/articles/vue-animation/3.gif)

Okay! Let’s jump right in.

## Understanding Vue Transition

While most people think transitions are just decorations, a well designed transition can…

- Capture and direct your user’s attention
- Emphasize important information
- Suggest a natural flow on your website
- Guide user’s around your page
- Help create a more professional brand image

All of these points will help improve the user experience of your site and improve your conversion rate and user retention rates. **A win-win for all.**

Ok. Now that we know that transitions can be extremely beneficial to your website, let’s learn how to implement them in Vue.

## Adding Vue Transition to Your Project

In order to accommodate a broad range of developers, VueJS offers a couple of ways to implement transitions:

- CSS transition/animation styling
- JavaScript hooks to make edits to the DOM
- Integrating 3rd party CSS/JS libraries

The difficulty of each of these depends on your existing knowledge.

If you have more HTML/CSS experience, you’ll like using transition/animation styling. However, if you are coming over from React or just have more JavaScript experience, manually editing the DOM is the way to go.

For now we’ll focus on working with a single element using CSS. But don’t worry, we’ll get into the fancier stuff (multiple elements, dynamic components, etc.) later.

## What’s the transition element anyways?

The transition element is a wrapper that helps you add transition functionality to your elements. Essentially, it sets up different hooks and adds classes to your changing elements so we can style them throughout different stages of the transition.

There are 6 different transition classes (3 for enter, 3 for leaving).

- `v-enter-from` / `v-leave-from`: start state of the transition; removed once transition starts (in Vue2 this is just `v-enter` and `v-leave`)
- `v-enter-active` / `v-leave-active`: active state of the transition
- `v-enter-to` / `v-leave-to`: end state of the transition

> Note: these are the default names when you give your transition a name attribute the format of the class is `{name}-enter-from`, `{name}-enter-active`, and so on.

Let’s check out the simple way to add transitions.

## Vue Transition Example

Creating your template code for a Vue Transition isn’t hard. Just choose the element that you want to transition and wrap it in a `<transition>` component.

For this example, we’re creating a button that toggles a `<p>` element to render.

```vue
<template>
  <div>
    <h1>Vue Transition Animation</h1>
    <button @click="open = !open">Toggle Animation</button>
    <transition name="fade">
      <p v-if="open" class="example-div">Hello World</p>
    </transition>
  </div>
</template>
```

And the corresponding `<script>` section.

```js
import { ref } from 'vue'

export default {
  setup() {
    const open = ref(true)

    return {
      open,
    }
  },
}
```

Now, we just have to add some styles to actually get the transitions working.

Let’s use the example styling from the Vue documentation.

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

**See how all of our classes contain the prefix fade?** That comes from our transition `name` attribute!

Now what does this code do? It’s actually pretty intuitive because it joins the classes that similar state.

These styles say that when the transition is active, add a transition to the opacity attribute so it smoothly moves.

![](/img/articles/vue-animation/4.gif)

Nice!

In addition to using CSS transitions, you can also use CSS animations.

As long as you are able to use the proper class names, you can style these components out to your heart’s content.

## Custom Class Names and JS Hooks

We can also override any of these default class names by adding any of these 6 attributes to our <transition> element:

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

This is especially useful when adding custom libraries to your code. For example, this is what we’ll be doing later with Animate.css – don’t worry we’ll cover this more in depth later.

```html
<transition
  enter-active-class="animated fadeIn zoomIn"
  leave-active-class="animated fadeOut zoomOut"
>
  <!-- conditional content -->
</transition>
```

Alternatively, there are also JS [hooks emitted](https://learnvue.co/2020/01/a-vue-event-handling-cheatsheet-the-essentials) by the transition element, so we can capture them and perform our animations in JavaScript instead of CSS. The available hooks are:

- before-enter / before-leave
- enter / leave
- after-enter / after-leave
- enter-cancelled / leave-cancelled

```html
<transition @before-enter="beforeEnter">
  <!-- ... -->
</transition>
```

Then, we can handle them in our JavaScript.

```js
export default {
  methods: {
    // done is an optional callback method
    beforeEnter(el, done) {
      done()
    },
  },
}
```

Let’s move on to some more advanced techniques using Vue Transitions.

## Advance Techniques with Vue Transition

While the transition element we just built is a great overview of how components work, we’ll often encounter way more complex use cases in the real world.

Luckily, like most of Vue, templates are very flexible and can adapt to most projects. Let’s check out some different situations.

### Getting your component to transition on load

Stupidly simple. Just add the attribute `appear` to your transition element like this.

```html
<transition name="fade" appear>
  <!-- ... -->
</transition>
```

### Transitioning between multiple elements

Let’s say you have two divs that alternate between each other like this.

```vue
<template>
  <transition name="fade" appear>
    <div v-if="visible">Option A</div>
    <div v-else>Option B</div>
  </transition>
</template>
```

All you have to do is wrap them in a transition element and BAM – your transition styles will work for both.

There are a couple of things to watch out for to make your code function the way you want:

### 1. You may want to absolutely position your elements

When Vue transitions between the two elements, there will be times when both elements are visible and transitioning in/out. If you want a smooth effect, you may want to absolutely position them on top of each other.

Otherwise, the elements may just be jumping all over the place when they are added/removed from the DOM.

### 2. If your elements have the same tag, you have to add a `key` attribute to the component

If your elements have the same tag, Vue will try to optimize things and only replace the content of the elements. [According to the docs](https://vuejs.org/v2/guide/transitions.html#Transitioning-Between-Elements), it’s always best practice to add a key if you’re transitioning between multiple elements.

## Changing the Duration of Your Transition

Vue typically can detect whenever your transitions/animations are over, but just in case you want to set the exact duration, Vue transitions have a `duration` prop.

You can either pass one value for both the enter and leave transitions or pass an object with two values.

```vue
<template>
  <transition :duration="500">...</transition>

  <!-- OR -->

  <transition :duration="{ enter: 1000, leave: 200 }">...</transition>
</template>
```

## Transitioning between dynamic components

All you’re going to have to do is wrap your [Vue dynamic component](https://learnvue.co/2020/01/an-overview-of-vuejs-dynamic-components/) in a transition element. It acts just like the base use case for transitions!

Your template code might look something like this.

```vue
<template>
  <transition name="fade" appear>
    <component :is="componentType" />
  </transition>
</template>
```

### Creating a Reusable Vue Transition Component

A great habit to get into when working in Vue is trying to design reusable components.

This is easy to do with transitions – all we really have to do is put a transition element in the root and insert a component slot so we can add more content.

It would look a little like this.

```vue{}[ReusableTransition.vue]
 <template>
   <transition name="fade" appear>
     <slot></slot>
   </transition>
 </template>
```

Now, instead of having to worry about adding your transition style, name, and everything to each component, you can just use this component and have it all taken care of.

Great! Now that we know all about the `<transition>` element, let’s use it to make an animation.

## Building our first animation

For starters, we’ll need a conditional element surrounded by a transition element. Our starter single file component would look a little like this.

```vue
<template>
  <div class="main-content">
    <transition name="rotate">
      <img v-if="show" src="../img/logo.png" />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    }
  },
}
</script>
```

Next, let’s add a button that toggles the display of our element by switching the value of the variable.

```html
<button @click="show = !show">Toggle</button>
```

With the element’s conditional rendering set up, let’s actually style our animation using the two classes: `rotate-enter-active` and `rotate-leave-active` because we named our transition rotate.

A cool trick is to make the leave animation use the same as the enter animation, but just to throw it in reverse!

```css
@keyframes rotate {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.rotate-enter-active {
  animation: rotate 0.2s;
}

.rotate-leave-active {
  animation: rotate 0.2s reverse;
}
```

Now, when we view our component and toggle our component, we should see something like this.

![](/img/articles/vue-animation/5.gif)

There you have it! You’re using VueJS animations!

## Using third-party libraries

But let’s say we don’t want to write all of our own CSS animations. There are so many great CSS animation libraries out there and it’s easy to incorporate them into a VueJS animation.

In our first example, we just used the default class names generated by our `<transition>` element, but one thing we can do is override these values to any class we want, in this case, it would be the class names from a CSS library.

For our example, we’ll be using [Animate.css](https://daneden.github.io/animate.css/) – to add this, we can just add the CDN link to our `index.html` file.

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
/>
```

Now, in our `<transition>` element, we can use the attributes `enter-active-class` and `leave-active-class`to connect our transition to Animate.js.

> Note that for Animate.js, we need to add the class animated.

```vue
<template>
  <transition
    enter-active-class="animated fadeIn zoomIn"
    leave-active-class="animated fadeOut zoomOut"
  >
    <!-- ... -->
  </transition>
</template>
```

Super straightforward. Here’s our result.

![](/img/articles/vue-animation/6.gif)

## There you have it

Just like that, you were able to start adding VueJS animations into your project.

**It’s important to not overdo things.**

Adding too many big animations is a fast way to make your site seem tacky, but adding subtle visual feedback using animations is a great way to make your site more user-friendly. Just be smart!

Hopefully this tutorial helped you get more comfortable with Vue animations and transitions.

Happy coding!
