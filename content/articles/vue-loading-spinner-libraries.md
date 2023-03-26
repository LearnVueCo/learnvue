---
author: Matt Maribojoc
title: 6 Vue Loader Animation Libraries to Reduce Your Bounce Rate
snippet: Vue Loader Libraries are a great way to reduce bounce rate by holding attention so the loading times seems much shorter than it would with a static screen.
publishedDate: 2020/02/10
tags: libraries,ui,ux
category: UI Design
cover: articles/vue-loading-spinner-libraries
---

::block-warning
This article may be outdated and contains links to Vue 2 libraries. 
::

**Nobody likes waiting** for things to load. Just look at Google’s 2017 data finding a correlation load times and bounce rates.

::captioned-image
#img
![](/img/articles/vue-loading-spinner-libraries/google-data.png)

#caption
Google’s 2017 data finding a correlation load times and bounce rates ([source: thinkwithgoogle.com](https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/page-load-time-statistics/)).
::

One way to keep people from leaving your website is to add visual feedback so that they know things are just loading and not broken. It also attracts people’s attention so the wait time seems much shorter than it would with a static screen.

Whether it’s including a spinner animation or adding actual progress bars, giving a nice visual element can improve your site’s performance (and make your visitors happier).

Luckily for Vue developers, there are tons of amazing loader libraries that you can add to your project in minutes.

In this article, we’ll be discussing six of my favorites.

Ready? Let’s go.

## 1\. Vue Simple Spinner

[GitHub](https://dzwillia.github.io/vue-simple-spinner/examples/)

Just like the name implies, this is a very simple component, but it’s still very powerful. Vue Simple Spinner gives a customizable spinner element. Using props, we can control our spinners:

- Size
- Background and foreground colors
- Speed
- Label Text
- Much more…

<!-- -->

In just a few lines, we can add a spinner into our project. First, we can install the library in our command line with `npm install vue-simple-spinner --save.`

Then, we import it into our component, declare it in our template, and change whatever props we want. Easy!

```vue
<template>
  <vue-simple-spinner size="medium" />
</template>
<script>
import VueSimpleSpinner from 'vue-simple-spinner'
export default {
  components: {
    VueSimpleSpinner,
  },
}
</script>
```

And just like that, we should have our first spinner.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/6-vue-loader-animation-libraries-to-reduce-your-bounce-rate-2.png)

## 2\. Vue Radial Progress

[GitHub](https://github.com/wyzantinc/vue-radial-progress)

If you’re looking for an actual progress bar rather than a spinner animation, Vue Radial Progress is a fantastic library to use.

Vue Radial Progress allows you to set the number of steps in your progress bar and what step the user is currently on. Then, it will fill a certain percentage of the progress bar according to how much is completed.

With smooth animations, customizable features, and an SVG based fill system, this library is extremely powerful when you have an asynchronous process with multiple, discrete steps.

It’s also a breeze to implement.

First, just install the library with `npm install --save vue-radial-progress`. Then, here’s the example component from the documentation.

As you can see, it’s extremely straightforward with the main props being the size, completed steps, and the total number of steps.

Also, the library uses [component slots](https://learnvue.co/2019/12/using-component-slots-in-vuejs%e2%80%8a-%e2%80%8aan-overview/) to make it simple to add text inside the circle.

```vue
<template>
  <radial-progress-bar
    :diameter="200"
    :completed-steps="completedSteps"
    :total-steps="totalSteps"
  >
    <p>Total steps: {{ totalSteps }}</p>
    <p>Completed steps: {{ completedSteps }}</p>
  </radial-progress-bar>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'

export default {
  data() {
    return {
      completedSteps: 0,
      totalSteps: 10,
    }
  },

  components: {
    RadialProgressBar,
  },
}
</script>
```

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/6-vue-loader-animation-libraries-to-reduce-your-bounce-rate-3.png)

## 3\. Vue Loading Overlay

[GitHub](https://github.com/ankurk91/vue-loading-overlay)

Vue Loading Overlay is the perfect solution for full screen loading components. For example, if your app includes some sort of dashboard and you want to wait until all of your data is loaded until letting the user click around, this library could be useful.

One of the features I find super neat about this library is the fact that you can allow users to cancel the loading overlay when they click. This will close the overlay and also trigger an [event](https://learnvue.co/2020/01/a-vue-event-handling-cheatsheet-the-essentials) that you can use to cancel whatever task you’re running.

By adding this feature, you can allow users to decide on their own when a task is taking too long to load and quit. This means that they don’t have to leave the page.

To add this to your project, run `npm install --save vue-loading-overlay`

Next, this is an example component using the Vue Loading Overlay library. Our component takes a few props that determine visibility, handle cancellations, and change the display.

```vue
<template>
  <div class="vld-parent">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>

    <label><input type="checkbox" v-model="fullPage" />Full page?</label>
    <button @click.prevent="doAjax">fetch Data</button>
  </div>
</template>

<script>
// Import component
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data() {
    return {
      isLoading: false,
      fullPage: true,
    }
  },
  components: {
    Loading,
  },
  methods: {
    doAjax() {
      this.isLoading = true
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false
      }, 5000)
    },
    onCancel() {
      console.log('User cancelled the loader.')
    },
  },
}
</script>
```

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/6-vue-loader-animation-libraries-to-reduce-your-bounce-rate-4.png)

## 4\. Vue Progress Path

[GitHub](https://github.com/Akryum/vue-progress-path)

Vue Progress Path is one of the most popular loader libraries out there. Built by Guillaume Chau, a member of the Vue Core team, this is one of my favorite tools to use.

Using SVGs, Vue Progress path creates shaped progress bars. It comes with a couple of built in shapes, but the most powerful feature is the ability to pass in your own SVG shape – meaning that the possibilities are endless.

Add it to your project with `npm i --save vue-progress-path` and then add it globally in your`src/main.js` file with.

```js
import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'

Vue.use(VueProgress, {
  // defaultShape: 'circle',
})
```

Now, let’s see how to add a progress path to our component.

```vue
<template>
  <loading-progress
    :progress="progress"
    :indeterminate="indeterminate"
    :counter-clockwise="counterClockwise"
    :hide-background="hideBackground"
    shape="semicircle"
    size="64"
  />
</template>
```

Another amazing thing about this library is how easy it is to customize. Instead of forcing you to deal with props to customize appearance, you can just write CSS code to edit the styles.

```css
.vue-progress-path path {
  stroke-width: 12;
}

.vue-progress-path .progress {
  stroke: red;
}
vue
```

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/6-vue-loader-animation-libraries-to-reduce-your-bounce-rate-5.png)

## 5\. Vue Loading Button

[GitHub](https://github.com/shwilliam/vue-loading-button)

Vue Loading Button is a simple, yet effective way of showing a user that something is loading.

All it does is add a spinner animation to a button, when it’s clicked. But with smooth animations, it creates a seamless look that will make your site pop.

It’s insanely quick to set up.

First, install it with`npm install --save vue-loading-button`. Then, you can get started as easily as this example from the documentation.

```vue
<template>
  <VueLoadingButton aria-label="Send message" />
</template>
<script>
import VueLoadingButton from 'vue-loading-button'

export default {
  components: {
    VueLoadingButton,
  },
}
</script>
```

In short, all you have to do is set the loading value to true/false depending on the situation. You can also add custom styles to make it fit into your application.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/6-vue-loader-animation-libraries-to-reduce-your-bounce-rate-6.png)

## 6\. TB Skeleton

[GitHub](https://github.com/anthinkingcoder/tb-skeleton)

Skeleton loading is a great way to give the [illusion of speed](https://css-tricks.com/building-skeleton-screens-css-custom-properties/). Basically, you’ll be

This screenshot from LinkedIn shows a great example of skeleton loading.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/6-vue-loader-animation-libraries-to-reduce-your-bounce-rate-7.png)

TBSkeleton is a great way to implement this feature in your Vue projects. However, it is pretty code intensive and will require you to plan your elements wisely.

When creating a skeleton, you essentially have to create all of the outlines of your different elements in a unique skeleton element.

I think the best way to understand this is just to walk through an example.

First, install it using `npm install --save tb-skeleton`. Then, add it to your Vue project’s `src/main.js` file with these lines.

```js
import skeleton from 'tb-skeleton'
import 'tb-skeleton/dist/skeleton.css'
Vue.use(skeleton)
```

Then, here’s an example of a skeleton component from the TBSkeleton documentation.

```vue
<template>
  <div>
    <skeleton :theme="opacity" :shape="radius" :bg-color="#dcdbdc">
      <tb-skeleton
        width="30%"
        :aspect-ratio="1"
        :shape="circle"
        bg-color="#eee"
      ></tb-skeleton>
      <tb-skeleton width="30%" :aspect-ratio="0.3"></tb-skeleton>
      <tb-skeleton width="30%" :aspect-ratio="0.3"></tb-skeleton>
    </skeleton>
  </div>
</template>
<script>
import { TbSkeleton, Skeleton } from 'tb-skeleton'
export default {
  components: {
    TbSkeleton,
    Skeleton,
  },
}
</script>
```

As you can see, it will definitely take some effort if you’re adding this into more complicated [components](https://learnvue.co/2019/12/using-component-slots-in-vuejs%e2%80%8a-%e2%80%8aan-overview/), but I think it’s definitely worth the effort.

## Conclusion

These are only a few of the dozens of fantastic Vue loader libraries that you can use in your projects. If you want to find more, I definitely recommend checking out the [awesome-vue GitHub repo](https://github.com/vuejs/awesome-vue).

And if you don’t find anything that suits your needs, build your own and share it! I’m sure other people will find it extremely helpful too.

What are your favorite loader libraries? It’s always a blessing to get new resources so let me know!
