---
author: Matt Maribojoc
title: An Introduction to VueJS Suspense Components
snippet: Suspense components allow our app to render fallback content while waiting for asynchronous components - letting us create a smooth user experience.
publishedDate: 2020/01/22
tags: composition api,suspense components,vue3
videoLink: https://youtube.com/v/2wh4feX5LfU
category: Advanced Vue
cover: articles/vue-suspense
---
Suspense components are one of the well known features in Vue 3. They allow our app to render some fallback content while waiting for asynchronous components – letting us create a smooth user experience.

Thankfully, Suspense components are _extremely_ simple to understand and start using in your components. They don’t even require any additional imports!

By the end of this article, you should know:

- What Suspense components are
- When to use them
- How to use them

Enough talking! Let’s get coding.

## What even are Suspense Components?

Suspense components are used to display fallback content when waiting for some sort of asynchronous component to resolve.

You may be wondering, _“When would we even be using an async component?”_

Honestly, more than you might think. Whenever we want our component to wait until it fetches data (which is usually in an async API call), we can make an asynchronous component using the [Vue 3 Composition API](https://learnvue.co/2020/01/4-vue3-composition-api-tips-you-should-know/).

Here are some instances when an async component would be useful:

- Showing a loading animation before a page loads
- Displaying placeholder content
- Handling lazy loaded images

Previously, in Vue2, we would have to use conditions (e.g. `v-if`or `v-else`) to check if our data has been loaded and show fallback content.

But now, Suspense comes built in with Vue 3 so we don’t have to worry about tracking when our data is loaded and rendering the corresponding content.

## Okay…so how do we implement Suspense?

In this example, we are going to say that we have an asynchronous `ArticleInfo.vue` component.

Since the focus of this article is Suspense and not the Composition API, won’t go into crazy detail about the details. If you’re interested in a more complete Composition API tutorial, I have one here.

Keeping it short, just know that the setup method can be made asynchronous just like any other method.

For our example, ArticleInfo will have an async `setup` method that load’s user data before returning.

```vue{}[ArticleInfo.vue]
async function getArticleInfo() {
  // some asynchronous API call
  return { article };
}

export default {
  async setup() {
    var { article } = await getArticleInfo();

    return {
      article,
    };
  },
};
```

Then, let’s say we have a `ArticlePost.vue`component that contains our ArticleInfo component.

If we want to display something like “Loading Profile…” while waiting for our component to fetch the data and resolve, we can implement suspense in just three steps.

- Wrap our async component in a `<template #default>` tag
- Add a sibling right next to our async component with the tag `<template #fallback>`
- Wrap both components in a `<suspense>` component

Using slots, the suspense will render the fallback content until the default one is ready to go. Then, it will automatically switch to display our async component.

It would look a little like this.

```vue{}[ArticlePost.vue]
<template>
<Suspense>
      <template #default>
        <article-info/>
      </template>
      <template #fallback>
        <div>Loading Profile...</div>
      </template>
</Suspense>
</template>
```

## You can also catch component errors

Another cool feature of Vue, especially when we start using asynchronous components, is that we can catch errors and actually show the user some error message.

Even in Vue2, this was possible using the [errorCaptured](https://vuejs.org/v2/api/#errorCaptured) hook, but in Vue 3, it has been renamed to `onErrorCaptured`.

Regardless of what it’s called, this [hook](https://learnvue.co/2019/12/a-beginners-guide-to-vuejs-lifecycle-hooks/) runs when an error from any descendant component is captured. We can use this with Suspense to render an error if something goes wrong.

This is what our above component would look like if we handled an error to display an error message.

```vue{}[ArticlePost.vue]
<template>
  <div v-if="errMsg">{{ errMsg }}</div>
  <Suspense v-else>
    <template #default>
      <article-info />
    </template>
    <template #fallback>
      <div>Loading Profile...</div>
    </template>
  </Suspense>
</template>

<script>
  import { ref, onErrorCaptured } from 'vue'

  setup () {
    const errMsg = ref(null)
    onErrorCaptured(e => {
      errMsg.value = 'Uh oh. Something went wrong!'
      return true
    })}
    return { errMsg }
</script>
```

## There you have it

Suspense is just another way that Vue makes it easier for developers to tackle common problems. Instead of having to conditionally render components, we can just use Suspense to take care of things for us.

In my opinion, it’s one of the neatest additions to Vue 3.

Now, you should have a little more familiarity with Suspense components in Vue and that you’ve thought of some cool ways to start implementing them into your projects!

If you’d like to know more about the differences between Vue 2 and Vue 3, continue reading here.Or if you’re interested in getting started in the Vue 3 Alpha Release.
