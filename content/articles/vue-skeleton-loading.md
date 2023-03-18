---
author: Matt Maribojoc
title: Vue Skeleton Loading Screen using Suspense Components
snippet: Vue skeleton loading screens show a content outline while waiting for data to load - providing a great user experience and making load times feel shorter.
publishedDate: 2020/04/08
tags: daily vue,suspense components,ui,vuejs
slug: vue-skeleton-loading-screen-using-suspense-components-daily-vue-4
videoLink: https://youtube.com/v/2-jQ1v6X7vA
category: UI Design
cover: articles/vue-skeleton-loading
---
**Skeleton loading screens show** an outline of your content while waiting for it to load. It provides a [better user experience](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a) and makes content feel faster than traditional loading spinners.

For example, sites like Facebook and LinkedIn use skeleton loading screens on their content.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/vue-skeleton-loading-screen-using-suspense-components-daily-vue-4-1.png)

In Vue 3, the [introduction of suspense components](https://learnvue.co/2020/01/an-introduction-to-vuejs-suspense-components/) has made it really easy to add skeleton loaders.

For this example, I’ve recreated the [Medium author section](https://medium.com/@mattmaribojoc) using an asynchronous component, a skeleton loader, and Vue’s new suspense components.

Here’s a quick screenshot of what we’ll be building!

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/vue-skeleton-loading-screen-using-suspense-components-daily-vue-4-3.gif)

Excited? Me too – let’s jump right in.

## How is our skeleton loading screen going to work?

Skeleton loading screens are most often used when a website needs to load data asynchronously from an API.

In Vue 3, we can do this by creating an **asynchronous component** that shows our user information – all this means is that it has an [asynchronous setup component](https://learnvue.co/2020/01/4-vue3-composition-api-tips-you-should-know/).

Then, we will create a second component that displays a skeleton of our user information component. We’ll do this by just **creating blocks**of various sizes to represent different sections.

Finally, using Vue’s **suspense** feature, we will render our skeleton component while waiting for our asynchronous component to resolve.

This is the high level explanation – let’s start programming so it makes more sense.

## Creating our ProfileCard

First, let’s create our default `ProfileCard.vue` component that will display our author information.

Since this is an asynchronous component, we need to make our setup method an async method. We also want to create another async method that loads in our profile data using a `setTimeout` for demonstration purposes.

```js{}[ProfileCard.vue]
import { ref } from 'vue'

const loadUserData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'Matt Maribojoc',
                pic: 'https://cdn-images-1.medium.com/fit/c/100/100/2*EcZb9cndrhTF7_d74dv2Fg.png',
                bio: 'I run a VueJS community over at https://learnvue.co, develop web sites, and post whatever I find cool on the Internet.',
            })
        }, 4000)
    })
}

export default {
    async setup() {
        const userData = ref(await loadUserData())

        return {
            userData,
        }
    },
}
```

If this looks completely confusing to you, check out our Composition API tutorial.

Let’s get this working displaying our template.

```vue
<template>
  <div class="profile-card">
    <div class="profile-image">
      <img class="profile-image__border" src="../assets/img-border.png" />
      <img class="profile-image__img" :src="userData.pic" />
    </div>
    <div class="profile-info">
      <span> Written By </span>
      <h3>{{ userData.name }}</h3>
      <p>{{ userData.bio }}</p>
    </div>
  </div>
</template>
```

Finally, let’s style it to make it look nice. These are the styles that I used.

```vue{}[ProfileCard.vue]
<style>
.profile-card {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: #fff;
    overflow: hidden;
    position: relative;
    min-height: 150px;
}

.profile-card .profile-image__img {
    width: 10%;
    height: auto;
    border-radius: 50%;
    position: absolute;
    top: 30px;
    left: 30px;
}

.profile-card .profile-image__border {
    width: calc(10% + 20px);
    height: auto;
    position: absolute;
    top: 20px;
    left: 20px;
}

.profile-info {
    width: 85%;
    float: right;
    padding-left: 10px;
    box-sizing: border-box;
}

.profile-info span {
    text-transform: uppercase;
    color: #666;
    letter-spacing: 3px;
}

.profile-info h3 {
    margin: 10px 0;
    font-weight: 700;
    font-size: 1.5em;
    color: #222;
}

.profile-info p {
    line-height: 140%;
    color: #666;
}
</style>
```

Now, our ProfileCard component should look like this.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/vue-skeleton-loading-screen-using-suspense-components-daily-vue-4-4.png)

## Using Suspense Components to Render Fallback Content

Now that we have an async component, we can use a suspense component to display fallback content.

Inside some other component, we can use this code to build our suspense component.

```vue
<template>
  <Suspense>
    <template #default>
      <profile-card />
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>
```

Now, if we run our app, we’ll see that it says `Loading…` for a few seconds until our ProfileCard component resolves.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/vue-skeleton-loading-screen-using-suspense-components-daily-vue-4-5.gif)

But this isn’t a skeleton loading screen! So let’s build that right now.

## Building our Skeleton Loading Screen

Although it may not seem like the most elegant solution, one of the best ways to control how your skeleton looks is to style each element. So that’s what we’re going to do – replace each content block in our ProfileCard with a corresponding outline block.

We will **reuse** some of the layout styles to ensure that our skeleton has the same outline as our actual component. Because we did not limit our styles to scoped in our ProfileCard component, they will automatically style our ProfileCardSkeleton component as well.

Our template will look basically the same minus the content.

```vue{}[ProfileCardSkeleton.vue]
<template>
    <div class="profile-card">
        <div class="profile-image">
            <img class="profile-image__border" src="../assets/img-border.png" />
            <img class="profile-image__img" />
        </div>
        <div class="profile-info">
            <span />
            <h3 />
            <p />
        </div>
    </div>
</template>
```

Then, the only other thing we need is to add some scoped styles to add that gray background we’re looking for.

So for each element – which in this case is the profile image, span, h3, and p – we want to replace it with just a gray background.

To do this, we just give each one its own height, width, and background-color.

```vue
<style scoped>
.profile-card .profile-image__img {
  width: 10%;
  padding-top: 10%;
  border-radius: 50%;
  background-color: #ddd;
}

.profile-info span {
  min-width: 100px;
  height: 16px;
  display: inline-block;
  background-color: #ddd;
}

.profile-info h3 {
  content: ' ';
  width: 250px;
  height: 24px;
  background-color: #ddd;
  margin: 10px 0;
}

.profile-info p {
  width: 80%;
  background-color: #ddd;
  height: 16px;
  line-height: 140%;
}
</style>
```

You can play around with the values depending on your component to get it looking just right.

To add this skeleton component into our project, we can replace our suspense fallback content with our new component.

```vue{}[ParentComponent.vue]
<template>
    <Suspense>
        <template #default>
            <profile-card />
        </template>
        <template #fallback>
            <profile-card-skeleton />
        </template>
    </Suspense>
</template>
```

Looking back at our app, we’ll see that now, it’s the type of look that we’re aiming for. It shows a rough outline of our content until our page loads!

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/vue-skeleton-loading-screen-using-suspense-components-daily-vue-4-6.gif)

## Extra Features We Can Add

So now that we’ve built a skeleton loading screen – there are so many ways to add to this concept. We could,

- [Build reusable](https://learnvue.co/2020/01/12-vuejs-best-practices-for-pro-developers/) skeleton components for images, headings, paragraphs, etc
- Add more styles to make it feel more responsive
- Create skeleton loaders for more components

But the one that we’re going to implement is a UI improvement to our skeleton loader. We’re going to make the background-color pulse between a light and drak gray.

This is a great way to show the user that something is loading and will make our website feel more responsive and load times feel shorter.

We’ll do this using [CSS animations](https://learnvue.co/2020/02/vuejs-animations-for-beginners/).

First, let’s create our keyframes and all we want to do is transition between two background colors.

```css
@keyframes pulse-bg {
  0% {
    background-color: #ddd;
  }
  50% {
    background-color: #d0d0d0;
  }
  100% {
    background-color: #ddd;
  }
}
```

Next, inside each of our elements, we want to replace our background-color property with our new animation. We can do that like this.

```css
.profile-card .profile-image__img {
  width: 10%;
  padding-top: 10%;
  border-radius: 50%;
  animation: pulse-bg 1s infinite;
}
```

The final result is a very subtle touch, but it’s the little things like this that can really make your Vue app stand out.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/vue-skeleton-loading-screen-using-suspense-components-daily-vue-4-7.gif)

## And there we go

We now have a really nice skeleton loader component using Vue3’s new suspense feature.

There are tons of ways to add this into your projects and I want to see what you’ve built!

I hope this tutorial helped give you some ideas and as always, if you have any questions, just let me know in the replies!
