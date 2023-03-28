---
author: Matt Maribojoc
title: How to use Vue Watch and Vue watchEffect
snippet: Throughout the course of developing a Vue app you’ll have tons of reactive data properties. Your app will track input fields data calculations and a bunch of…
publishedDate: 2020/03/30
tags: reactivity,vue2,watchers
videoLink: https://youtube.com/v/K7zx0tZQO7E
category: Advanced Vue
cover: articles/vue-watch-and-watcheffect
---
**Throughout the course of developing a Vue app, you’ll have tons of reactive data properties.** Your app will track input fields, data calculations, and a bunch of other properties and may need to perform an action when a value updates.

Watchers in Vue observe **reactive properties** and can detect when a property changes. It essentially acts as an event listener for our component’s reactive data.

Especially when combined with asynchronous API calls, there are hundreds of use cases like

- Getting an object from database when an ID changes
- Rerunning an animation when a prop changes
- So many more!

[In Vue 3](https://learnvue.co/2020/09/setting-up-your-first-vue3-project-vue-3-0-release/), in addition to the watch method, there’s a new watchEffect method that can be used in the Composition API.

This tutorial will go over both methods, cover how to use them, and some cool features of both.

Okay – let’s go!

## How do you use Vue watch?

The [Vue Options API provides a watch option](https://vuejs.org/v2/api/) in which you can define your watchers. To use this, you must first have a property in your data object that you want to track. That code will look like this.

```vue
<script>
export default {
  data() {
    return {
      title: '',
      description: '',
    }
  },
  watch: {
    // your watchers will go in here!
  },
}
</script>
```

Then, we have to look at the structure of a watcher method. All you have to do is declare a function with the same name as the property you want to observe.

It should take two parameters:

The new value of the watched propertyThe old value of the watched property

For example, this is a watcher for the title property.

```js
export default {
  watch: {
    title: (newTitle, oldTitle) => {
      console.log("Title changed from " + oldTitle + " to " + newTitle);
    };
  }
}
```

Whenever our title value changes, we can see the following printed out in the console.

```
Title changed from Version Vue 2 to Version Vue 3
```

Simple right!

Watchers are not that confusing of a topic. In fact, they’re one of the basic principles of reactivity in any framework.

The biggest pros and cons that come with watchers is their flexibility. On the positive side, they are very adaptable and can be used to make API calls, trigger secondary actions, and so on.

Conversely, a Vue watcher only tracks one dependency, but let’s say we have a value that has two dependencies.

We could create 2 identical watchers for each method, but the Vue 3 Composition API offers a better solution for this use case.

Let’s take a look at Vue watchEffect.

## How does Vue watchEffect work?

watchEffect is one of the ways to track reactive dependencies in Vue 3. Essentially, we can just write a method using reactive properties, and whenever **any of their values updates**, our method will run.

One thing to note is that `watchEffect` will also run immediately whenever the component is initialized in addition to running when the dependency changes, so just be careful when trying to access the DOM before it’s [mounted](https://learnvue.co/2020/03/how-to-use-lifecycle-hooks-in-vue3/).

## Let’s check out an example

Let’s look at a really simple sample similar to the one from the Vue documentation.

For this, let’s assume that we have some sort of reactive `userID` property and just want to log whenever it changes.

The code would look like this.

```vue
<script>
import { ref, watchEffect } from 'vue'

export default {
  setup() {
    const userID = ref(0)

    watchEffect(() => console.log('Value: ' + userID.value))

    setTimeout(() => {
      userID.value = 1
    }, 1000)

    return {
      userID,
    }
  },
}
</script>
```

So, right when our component is initialized, our watchEffect will run and log the starting value. Then, whenever the value of `userID` changes, our watchEffect will be triggered.

```
Value: 0
Value: 1
```

Easy enough, right?

## Why is it different from watch?

So why does this new watchEffect method even exist when there’s already a watch method?

There are some key differences.

`watchEffect` will run a method whenever **any** of its dependencies are changed, watch tracks a specific reactive property and will only run when that property changes.

On the other hand, watch tracks a **specific** property or properties and will only run when it changes. Also, the way that a watch method is setup, it contains the old value of the property, as well as its updated value.

Also, by default, `watch` is lazy so it will only trigger when the dependency changes. watchEffect runs immediately when the component is created and then tracks dependency.

However, we could pass watch an `immediate` property to make it run on initialization.

```js
export default {
  watch: {
    title: {
      handler: (newTitle, oldTitle) => {
        console.log('Title changed from ' + oldTitle + ' to ' + newTitle)
      },
      immediate: true,
    },
  },
}
```

So watch is useful for when…

- You need to control which dependencies trigger the method
- You need access to the previous value

Of course, I can’t tell you which is best for your project, but just make sure you know the reasons why you’re making a coding design choice.

## Some things to look out for

By now, we know the basics of the watchEffect method and how it’s different from the other Vue watch method. So let’s cover some of the more advanced tips. These are some of the things that[Vue’s Composition API Reference points](https://vue-composition-api-rfc.netlify.com/api.html#watcheffect) out.

### 1. Props are reactive

This is a handy little piece of knowledge. One great use case is changing other values on a page depending on a prop attribute.

For example, let’s say we had a SongPlayer component that accepts a `songID` value as a prop. If we changed our song, we would want to load all the content about it. And we can do this with props.

It’d look something like this.

```js
export default {
  props: {
    songID: String,
  },
  setup(props) {
    watchEffect(() => console.log(props.songID))
  },
}
```

### 2. We can invalidate side effects using onInvalidate()

A common use case for using Vue watchEffect will be to make some sort of asynchronous API call whenever a reactive dependency changes. But what happens, if the dependency changes again before our first API call finishes?

That’s where invalidating side effects come on.

Our watchEffect method also has an `onInvalidate` method that runs whenever the method is about to run again OR the watcher is stopped.

We can stop our asynchronous API call like this.

```js
export default {
  setup() {
   watchEffect(onInvalidate => {
        // async API call
        const apiCall = someAsyncMethod(props.songID)

        onInvalidate(() => {
          // cancel the api call
          apiCall.cancel()
        })
   })
  }
}
</script>
```

### 3. Stopping a watcher

Another neat thing that we can do is stop a watcher on our own. This could be useful if we want to watch a dependency until it reaches a certain value. If we continued to watch after it hit the target value, we’d just be **wasting resources.**

Our Vue watchEffect method returns a stop method that will stop our watcher.

So we can simply store this as a variable, and call invoke it later on.

```js
export default {
  setup(props) {
    let stopWatcher = watchEffect(() => console.log(props.songID))
    stopWatcher()
  },
}
```

## And we’re done

There you have it! I hope that this quick introduction to Vue watch and Vue watchEffect shows off some of the ways that we can use this handy method in our code.

If you have any questions, comments, or anything really, just leave a reply down below and I’ll get back to you!
