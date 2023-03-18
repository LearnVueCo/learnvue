---
author: Matt Maribojoc
title: The Top 20 Vue Component Libraries in 2022
snippet: Learn about the Top 20 resources you need to be using in your Vue apps to create responsive components beautiful charts and so much more.
publishedDate: 2021/05/04
tags: components,dev tips,tools
slug: top-20-vue-component-libraries-in-2021
category: Tools and Libraries
cover: articles/top-vue-component-libraries
---
As fun as it can be to build everything yourself in Vue, there are so many awesome libraries out there.

Not only can using these libraries make your development process so much faster, but it can also provide better QA because many of these dedicated component libraries have take care of all of the testing for us!

Here’s a list of some of the most useful Vue component libraries that you should know about.

Ready to learn?

Let’s go!

> Disclaimer: Unless otherwise noted, these Vue component libraries are NOT currently ready for Vue 3. I definitely recommend checking out each library’s product roadmap to see if/when they’ll be making the leap. Also, all GitHub stars are from the writing of this article on May 4, 2021.

## Full Vue UI Frameworks/Libraries

### Vuetify (30.7K ⭐️)

[Vuetify](https://vuetifyjs.com/en/) is a Vue UI Library with handcrafted Material components. Specifically developed according to Material Design specifications, each component is built with a mobile first approach to be both responsive and extremely modular.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-1.png)

Adding Vuetify to your project with the vue-cli is as easy as running`vue add vuetify`.

As a complete framework it has features like:

- Hundreds of default styles and animations
- UI components like alerts, banners, buttons, navigation, and more
- Built in directives to handle user actions like clicking, scrolling, resizing, etc.

I personally really like Vuetify for two key reasons.

First, it has everything you could need to build your app. With

Second, [Vuetify’s documentation is some of the best out there](https://vuetifyjs.com/en/getting-started/installation/). With comprehensive examples and online resource guides, you’ll never be developing in the dark with Vuetify.

Additionally, as one of the largest Vue frameworks, the community surrounding Vuetify is fantastic, with thousands of developers on forums answering all your questions about development.

Vuetify is in the process of [rebuilding their entire framework](https://vuetifyjs.com/en/introduction/roadmap/#in-development) from the ground up in order to support Vue 3 and the Composition API.

### Bootstrap Vue (13.1K ⭐️)

Bootstrap is one of the most popular free and open source CSS and JS framework that helps developers build responsive applications.

[BootStrapVue](https://dev.bootstrap-vue.org/) provides an implementation of Bootstrap v4 component and grid system using Vue 2.6 bringing all the amazing benefits of Bootstrap to the Vue environment.

Perhaps most well known is the fact that Bootstrap (and therefore BootstrapVue) has a great solution for responsive design using a grid-based system. It allows developers to change the size of DOM elements depending on the screen sizes.

Here’s a table summarizing the different screen sizes you can target and what your code might look like.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-2.png)

It comes with 85+ components, 45+ plugins, directives, and 1200+ icons.

The 1200+ icons are insanely useful when building applications. With icons for accessibility, social media, and guiding the user, BootstrapVue has thousands of built-in ways to improve the user experience of your app.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-3.png)

### Vue Material (9.3K ⭐️)

[Vue Material](https://vuematerial.io/) is a lightweight library that is built exactly to the Material Design specifications.

With features like:

- Free, built in themes for your app
- Support for Vue Router
- Dozens of essential components like menus, progress bars, and forms

It is also easy to integrate other tools like Nuxt.js or webpack with Vue Material to make things like rendering and deploying much simpler.

One reason I like Vue Material is that there are so many beautiful themes out there using this framework.

[Here’s one from CreativeTim](https://www.creative-tim.com/product/vue-material-kit-pro?ref=learnvue.co).

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-4.png)

### Quasar (18.4K ⭐️)

[Quasar](https://quasar.dev/) is an open source Vue.js based framework that allows developers to built responsive apps for almost every platform. Quasar has the built-in ability to switch between build modes.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-5.png)

This means that you can make SPAs, PWAs, and SSR apps, but even **mobile apps, desktop apps, and browser extensions**!

Crazy, right?

It comes with everything you would want from a frontend framework:

- Customizable styles including light and dark mode support
- Grid-based layout system to create responsive apps
- 100+ Vue components designed for both performance and responsiveness
- Built in tree-shaking to encourage best practices

I highly recommend checking Quasar out if you’re looking for a powerful framework with minimal overhead.

### Buefy (8.6K ⭐️)

[Buefy](https://buefy.org/) is an open source, lightweight Vue framework built on the Bulma CSS framework.

[Bulma is a modern CSS framework](https://bulma.io/)that allows developers to intuitively create responsive components. With plain english class names, it’s simple to understand at a glance how exactly your class names are affecting an element’s styles.

For example, styling different buttons is as simple as this.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-6.png)

Buefy brings the simplicity of Bulma into Vue by providing developers with dozens of built in components such as buttons, dropdowns, pagination, and more.

Personally, I love how easy it is to build a responsive column layout. All you have to do is create a container with a class of columns and then for each column just create a div with a class of column.

```html
<div class="columns">
  <div class="column">First column</div>
  <div class="column">Second column</div>
  <div class="column">Third column</div>
  <div class="column">Fourth column</div>
</div>
```

With just that code, each column will automatically be the same width and also be responsive for mobile devices!

Amazing.

### Element (49.9K ⭐️)

[Element](https://element.eleme.io/#/en-US) is a desktop UI library that makes development insanely fast.

Of course, it has every component you’ll need to start building apps – layouts, buttons, inputs, etc.

But my favorite feature is how easy it is to add your own theme/color scheme to your app.

Of course, you could always customize the colors by overriding the default CSS properties. But, Element provides a Chrome Extension that lets you customize your theme and preview it in real time.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-7.png)

It can really save hours of changing CSS files, seeing if it looks any good, and then continuously changing colors until you find the ones you like.

## Vue Table Components

### vue-easytable

[vue-easytable](https://github.com/Happy-Coding-Clans/vue-easytable)is one of the most powerful Vue table components I’ve come across.

For a table component, it has so many amazing built-in features that you don’t even realize you need like cell ellipsis, fixed/flexible column sizing, custom filtering, and dozens more.

Plus, look how amazing it looks!

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-8.png)

### vue-dataset

[vue-dataset](https://github.com/kouts/vue-dataset) is a set of 6 Vue components to display lists in Vue with built-in filtering, pagination, sorting, and even custom search capabilities.

I really like how flexible this library is – it has all of the essential features you need from a table component, but does not have any limitations.

You can build your table with any sort of DOM element, not just `&lt;table&gt;` elements. Meaning it’s incredibly easy to use custom components, like cards, to display your list all while keeping the pagination and search features.

Here’s an example of using cards to display a dataset.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-9.png)

## Vue Notification Components

### vue-easy-toast

[vue-easy-toast](https://github.com/noru/vue-easy-toast) is an easy to use tool to create notifications in Vue2.

Creating great notifications is as easy as saying `Vue.toast('Can I have everybody`s attention?')`

You can choose the style of your toast, the HTML message, and my favorite feature is that you can add fade or slide transitions.

It’s simple, yet extremely useful.

[Check out the demo!](https://blog.xiuz.hu/vue-easy-toast/example/index.html)

### vue-toaster

If you’re looking for a great, Vue 3 compatible plugin, [vue-toaster](https://github.com/MeForma/vue-toaster) is the choice for you.

Displaying a notification is as easy as this one liner: `this.$toast.show(`Hey! I'm here`)`

There are so many ways that you can control your notifications using vue-toaster:

- Changing the message, type, and position
- Changing the duration of your notification
- Handling click events

For such a simple plugin, the possibilities are really endless.

## Vue Loader Libraries

### vue-simple-spinner

[vue-simple-spinner](https://github.com/dzwillia/vue-simple-spinner)stays true to its name. It’s a simple and customizable spinner component that gives you control over the size, color, speed, and text of your spinner.

You can add it to your project today just by running `npm install vue-simple-spinner --save`.

Here’s an example of what your spinner could look like.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-10.png)

### vue-progress-path

[vue-progress-path](https://github.com/Akryum/vue-progress-path) is the perfect tool for you if you want to create custom, fun loaders.

Its coolest feature is that you can pass it your own .svg file and it will create a loader based on the shape of your svg.

Just take a look at some of the possibilities!

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-11.png)

### Vue-splash

[vue-splash](https://github.com/MehdiKhoshnevisz/vue-splash) allows you to show a splash screen while waiting for content to load.

You can display your logo, some text, and change the background color of the page with just one quick component.

Here’s an example of what the code for your splash screen might look like.

```vue
<template>
  <vue-splash
    :show="true"
    :logo="logo"
    title="Your Magnificent App Name"
    color="#00bfa5"
    :size="300"
    :fixed="true"
  />
</template>
```

And here’s the resulting splash screen!

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-12.png)

Easy to use and incredibly effective.

## Vue Modal Libraries

### sweet-modal-vue

[sweet-modal-vue](https://github.com/adeptoas/sweet-modal-vue) provides a great framework for all sorts of popup modals.

There are different options for different styles and types of modals including:

- Success modals
- Blocking errors
- HTML content
- Modals with tabs
- Much, much more.

I love the fact that it comes with built in slots for buttons and components for tabs. It streamlines development while allowing for some next level customization.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-13.png)

### Vue-tinybox

[vue-tiny-box](https://github.com/NickKaramoff/vue-tinybox) provides a simple lightbox gallery modal component for Vue. It’s incredibly lightweight and is mobile ready meaning that it supports swipe gestures and is responsive.

While it’s not as customizable as some other options out there, the fact that its only 3 KB minzipped means that it can be incredibly useful for a quick solution.

Plus it looks good! Just check out this demo.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-14.png)

## Vue Icon Libraries

### vue-awesome

[Font Awesome](https://fontawesome.com/) is arguably the most popular icon library out there with thousands of high quality, customizable icons. [Vue-Awesome](https://github.com/Justineo/vue-awesome) brings this to Vue allowing you to access all of the free icons with a single component.

You can even pass all of the Font Awesome options in as component attributes so making your icon pulse, spin, or scale so it’s easy to customize or even animate your icons.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-15.png)

### Vue Unicons

In my opinion, [Vue Unicons](https://github.com/antonreshetov/vue-unicons) is one of the most underrated icon libraries that I’ve come across. It has over 1K free SVG icons. It’s super simple to add to your project.

Each Vue Unicon component acts similarly to an svg taking in attributes like name, size, color, and style.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-16.pngg)

### Vue Material Design

[Vue Material Design](https://github.com/robcresswell/vue-material-design-icons)makes it easy to Google’s Material Design icons into your Vue project.

Not only is there great documentation for this library, but it’s so quick to get up and running. It includes each icon as a single file component so you can import exactly what you need for each use case.

Also since Vue Material Design uses SVGs, all you have to do is change some props around to customize an icon’s style.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-17.png)

## Vue Chart Libraries

### Vue-chartjs

Vue-chartjs brings the full power of Chart.js into an easy to use and reusable Vue chart components.

It abstracts a lot of the basic logic of the Chart.js framework but still gives you control over all of the customization.

Just by passing in your data either via props, local data, or an API, you can create bar charts, line charts, and more.

One cool feature is that by using the reactiveProp or reactiveData mixins, you can create reactive charts that update to your data in real-time.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-18.png)

### Vue 3-chart-v2

If your project needs a Vue 3-compatible Chart.js wrapper, [vue3-chart-v2](https://github.com/vutran6853/vue3-chart-v2) is exactly what you need.

Using a custom renderChart method, you can easily create your own component using any of the Chart.js graphs.

Here’s an example of a doughnut graph made with vue3-chart-v2.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/top-20-vue-component-libraries-in-2021-19.png)

## Alright – that’s all

That’s all for our list! I hope you discovered a couple tools that you’re excited to use in your projects.

If you have any libraries or plugins that you think deserve to be on this list – or if you’re working on an something cool yourself – let me know down below or shoot me an email at [matt@learnvue.co](mailto:matt@learnvue.co)
