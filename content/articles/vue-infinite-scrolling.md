---
author: Matt Maribojoc
title: A Quick Vue 3 Infinite Scrolling Component
snippet: An infinite scrolling component is when content is loaded continuously as someone scrolls down your web app. Learn how to build one in Vue 3!
publishedDate: 2020/09/01
tags: daily vue,tutorial,ui
videoLink: https://youtube.com/v/je7ucGl_tkU
category: Build Along
cover: articles/vue-infinite-scrolling
---
If you’ve ever caught yourself on social media for way too long, chances are the site you were on was using an **infinite scrolling component**.

An infinite scrolling component is when new content is loaded as the user scrolls down the page as opposed to separating it out into multiple pages.

**If you rather watch a video version of this tutorial, check out our YouTube video!**

They are highly effective for specific types of content such as user-generated content.

Here’s an example of what infinite scrolling is.

![](https://addyosmani.com/assets/images/infinite-scroll.png)

[Source: Addy Osmani](https://addyosmani.com/blog/infinite-scroll-without-layout-shifts/){.image-caption}

In this tutorial, we’ll be creating a Vue 3 Infinite Scrolling Component using the [Composition API](https://learnvue.co/2020/01/4-Vue-3-composition-api-tips-you-should-know/).

Here’s a sneak peek of what we’ll be building by the end of it. As you can see, it scrolls indefinitely and the scrollbar on the right side of the screen reflects this.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/a-quick-vue3-infinite-scrolling-component-daily-vue-tips-4-2.png)

Okay – let’s jump right in.

## Why even use Infinite Scrolling Component?

We’ve all seen examples of websites that use infinite scrolling to display their content, but when would this be a better option than using a typical pagination system?

There’s a great article by Nick Babich on the[pros and cons of infinite scrolling/pagination](https://uxplanet.org/ux-infinite-scrolling-vs-pagination-1030d29376f1).

I definitely recommend giving it a read, but I’ll sum up the main points.

Pros of Infinite Scrolling:

- User Engagement and Content Discovery
- Scrolling is Better Than Clicking (better usability)
- Scrolling is Good For Mobile Devices

Cons of Infinite Scrolling:

- Page Performance and Device Resources
- Item Search and Location – users can’t bookmark a page and retain position
- Irrelevant Scroll Bar

Like all things with web development, there are valid reasons for choosing either option. Just be sure to consider which is best for your website!

Regardless, learning how to build a Vue 3 infinite scrolling component is pretty interesting and could be useful for you down the line.

## Okay. Let’s make it

First, let’s go over – from a high level – how this system will work.

There are going to be three main parts:

- A Mock API call that generates posts
- PostComponent that renders an individual post
- ListComponent that contains all the post components and handles loading posts from the API

## Mocking an API Call

For this tutorial, we’ll be writing a dummy API call that returns hard coded data. If you implement this in a real backend and database, the important aspects are that you can decide somehow limit your results based on size and position in the database.

This API call can be anything from a simple database query in simpler applications all the way to a complex recommendation algorithm in more advanced ones.

Here are some different ideas for content loading algorithms that are used commonly by social media sites:

- Date posted
- Relevance to the current user
- Activity on a post

However, for simplicity, our algorithm will just generate random post data and return X number of posts depending on the parameters it’s given.

```js
var names = ['Matt Maribojoc', 'Lebron James', 'Bill Gates', 'Childish Gambino'] // used to generate posts for this tutorial

const getPosts = (number) => {
  // generate a number of posts
  // in a real setting, this would be a database call or algorithm

  let ret = []

  for (var i = 0; i < number; i++) {
    ret.push({
      author: names[i % names.length],
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    })
  }

  return ret
}

export default getPosts
```

## Making our post component

Now that we have a way to generate posts, let’s create a component that will allow us to render them.

There’s not anything fancy about this code, we just have to take in a post via the component’s props and then render the author and content. There are also a few styles here to pretty things up a little bit.

```vue{}[PostComponent.vue]
<template>
  <div class="post">
    <h2>{{ post.author }}</h2>
    <p>{{ post.content }}</p>
  </div>
</template>
<script>
  export default {
   props: {
    post: Object
   }
  }
</script>
<style scoped>
  .post {
   background: #fff;
   padding: 1.5em;
  }

  .post:not(:last-child) {
   border-bottom: 1px solid #ddd;
  }

  .post h2 {
   font-size: 1.3em;
   padding-bottom: 0.25rem;
  }

  .post p {
   color: #888;
  }
</style>
```

## Displaying our posts

Next, let’s actually figure out how to display some posts on the screen. And this is where that `ListComponent.vue` component comes in handy.

If you don’t have any experience in Vue 3, this code may look a little weird to you. But check out this guide to getting started in Vue 3.

In short, Vue 3 replaces the Options API with the Composition API meaning that the code ([lifecycle hooks](<https://learnvue.co/2020/03/how-to-use-lifecycle-hooks-in-Vue> 3/), data, etc) is all organized inside a single `setup` method.

So first, we want to import a few things:

- Our API call
- Our PostComponent
- `ref` for creating reactive data
- `onMounted` and `onUnmounted` to access these lifecycle hooks

Then, We want to set up a reactive posts variable that calls our `getPosts` API call.

```vue
<script>
import PostComponent from './PostComponent.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import getPosts from '../scripts/post-loader'
const posts = ref(getPosts(10))
</script>
```

Finally, to display our data inside our template, we want to run a `v-for` loop that iterates over our posts and renders a PostComponent for each of them. Our template should look like this (note that the `.list-component` has a ref, we’ll get to that later)

```vue
<template>
  <div class="scrolling-component" ref="scrollComponent">
    <post-component v-for="post in posts" :post="post" />
  </div>
</template>
```

Our current page should render 10 posts and look like this.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/a-quick-vue3-infinite-scrolling-component-daily-vue-tips-4-3.png)

But if we scroll to the bottom, nothing happens. So let’s move on to the exciting part: infinite scrolling!

## Handling Vue 3 Infinite Scrolling

Now that we have everything set up, we can start loading in more data as the user scrolls down to the bottom of the posts.

Let’s start off by creating a method that loads in 10 posts at a time and appends them to our posts variable.

```vue
<script>
setup () {
 // ...
 const loadMorePosts = () => {
  let newPosts = getPosts(10)
  console.log(newPosts)
  posts.value.push(...newPosts)
 }
 // ...
}
</script>
```

Now, we just need a way to trigger this method. We are going to do this by adding an event listener that listens to a scroll event and calls a method. We are going to add it when the component is mounted and remove it when the component is unmounted (destroyed).

```vue
<script>
setup () {
 // ...

 onMounted(() => {
  window.addEventListener("scroll", handleScroll)
 })

 onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
 })

 const handleScroll = (e) => {

 }
 // ...
}
</script>
```

Great. We’re all set up to start loading in more posts. If you remember from the previous section, we added a refs attribute to the `.list-component`element. If you’ve worked with refs in Vue before, this is a familiar concept, but the way we set them up in Vue 3 is a little different.

We are going to use the `refs` method again to instantiate our ref and then return it from our setup method.

```vue
<script>
setup () {
 const posts = ref(getPosts(10))
 const scrollComponent = ref(null)
 return {
  posts,
  scrollComponent
 }
}
</script>
```

With this access to our element using `refs`, we can finish up our method to determine if we are scrolled to the bottom of our content.

The following code works by checking if the bottom of our content is visible on the screen. If it is, we call our method to load in more posts!

```js
const handleScroll = (e) => {
  let element = scrollComponent.value
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    loadMorePosts()
  }
}
```

And that’s it! When we scroll down to the bottom of our current posts, new posts should automatically load in. Let’s take a look at what we have.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/a-quick-vue3-infinite-scrolling-component-daily-vue-tips-4-4.png)

Perfect!

## Possible Extensions to our Infinite Scrolling Component

This is just an introduction to creating a Vue 3 infinite scrolling component. There are so many different directions to take this to improve it.

Here are some ideas that I would think about adding if you’re building this in a real system.

- Since the API call would be asynchronous, create some sort of [loading spinner](https://learnvue.co/2020/04/vue-skeleton-loading-screen-using-suspense-components-daily-vue-4/)that displays while new data is being loaded
- Create a more complex API algorithm and connect it to a database
- Add more data to each post and find new ways to display it

## Conclusion

And there you have it! I hope this tutorial was helpful to both get you acclimated in Vue 3 as well as create a pretty cool component.

If you build this/add any extensions, I would love to see what you make! To show off your projects or if you have any questions, just leave a reply.

Happy coding!
