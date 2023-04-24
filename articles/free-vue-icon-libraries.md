---
author: Matt Maribojoc
title: Free Vue Icon Libraries to Pretty Up Your Web App
snippet: Icons (when used properly) are a great way to grab a visitor’s attention and give them visual cues.
publishedDate: 2020/03/27
tags: best practices,composition api,organization,vue3
category: Tools and Libraries
cover: articles/free-vue-icon-libraries
---
# 8 Free Vue Icon Libraries to Pretty Up Your Web App

Icons (when used properly) are a great way to grab a visitor’s attention and give them visual cues. With the rise of VueJS, especially with the anticipation for the release of Vue 3.0, the community has also started to develop a lot more Vue Icon Libraries that are directly designed for people developing in Vue.

Here’s a list of 8 FREE Vue Icon Libraries that I have used (or want to use). This list spans everything from standalone Vue libraries all the way to pure icon libraries. Just make sure you don’t overuse them. Because you’ll definitely want to.

## Vue Specific Libraries

While there are tons of framework agnostic tools out there, here are a few that are custom-built for the Vue ecosystem.

### 1. [Vue-Awesome](https://github.com/Justineo/vue-awesome)

Everybody loves [Font Awesome](https://fontawesome.com/) – it’s one of the most popular icon libraries out there with thousands of high quality, customizable icons. Vue-Awesome bring Font Awesome to Vue allowing you to access all of the free icons with a single component.

You can even pass all of the options in as attributes so making your icon pulse, spin, or scale so it’s easy to customize or even animate your icons.

![Vue Awesome Icon Sheet](/img/articles/free-vue-icon-libraries/vue-awesome.png)

### 2. [Vue Unicons](https://github.com/antonreshetov/vue-unicons)

Perhaps one of the most underrated/underutilized icon libraries that I’ve come across. Vue Unicons has over 1K free SVG icons. It’s super simple to add to your project and start using.

Each Vue Unicon component acts very similarly to an svg taking a few attributes:

- name
- width and height
- fill color
- icon-style (line/monochrome)

I personally find the icons clean as hell, but you can take a lot for yourself.

![Vue Unicons Icon Sheet](/img/articles/free-vue-icon-libraries/vue-unicons.png)

### 3. [Vue Material Design](https://github.com/robcresswell/vue-material-design-icons)

This is a great library for using Google’s Material Design icons in your Vue project.

Not only is there great documentation for this library, but I think that it’s super easy to get up and started with these icons. It includes each icon as a single file component so you can import exactly what you need for each use case.

Also since Vue Material Design uses SVGs, all you have to do is change some props around to customize an icon.

![Vue Material Design Icons](/img/articles/free-vue-icon-libraries/vue-material-design.png)

## List of Full UI Libraries that Include A Vue Icon Library

The list above just goes into some standalone Vue icon libraries, but there are a bunch of great UI libraries that you could use for entire projects. There are just some of my favorites that have an overall great interface.

### 1. [Icons from Vuetify UI Library](https://vuetifyjs.com/en/)

It’s impossible to have not have Vuetify on this list. As one of the most popular and well maintained Vue component libraries, it’s super flexible, yet powerful for all projects. Vuetify has over 100 component elements, comes with a responsive grid system, and full support for event handling.

In terms of icons, Vuetify uses support for both the Material Design and Font Awesome libraries. I think having the capability to handle both makes Vuetify a great option for developers looking for a consistent UI.

Withweekly patches and continuous updates, Vuetify is likely to remain one of the most popular Vue libraries for several years.

![image](/img/articles/free-vue-icon-libraries/vuetify.png)

### 2. [AT UI](https://at-ui.github.io/at-ui/#/en)

AT UI is built for frontend web applications. With the ability to use CSS preprocessors, it is very adaptable for almost all development teams.

Personally, I really like the minimal style and font-choices that come default with AT UI and I think that it’s intuitive and easy to add to any project. Its built-in icon library (Feather) is also a huge benefit when compared to other libraries.

![Icons from AT UI](/img/articles/free-vue-icon-libraries/at.png)

### 3. [iView](https://www.iviewui.com/)

iView is one of the most popular UI libraries because of its fantastic customization capabilities. It comes built with support for different fonts, icon sizes, element sizes, endless form options, and almost everything a developer would need to build a nice looking front-end.

It comes with a bunch of built in components and sleek icons that make developing a breeze. iView is definitely something to consider if you’re looking at developing a front-end, but don’t want to have to remake essential components yourself.

![Icons from iView](/img/articles/free-vue-icon-libraries/iview.png)

## More Generic Icon Libraries

A lot of the time, you may be willing to put in a little more work and implement the icon library of your choice on your own. While this may not be as easy as an npm install and go, this is a great option if there’s an icon set that you love. And who knows – maybe you can even release your own Vue integration for it!

Anyways, here are some of my favorites.

### 1. [Icomoon](https://icomoon.io/)

Icomoon is super popular icon library that is used by some major companies like Google and Apple. It has a ton of free and premium options for SVG and icon fonts that you can mix and match to find your perfect icon set.

It’s definitely worth checking out if you’re willing to put in the extra work in integrating it into Vue.

![Icomoon icon set](/img/articles/free-vue-icon-libraries/icomoon.png)

### 2. [IconMonstr](https://iconmonstr.com/)

Personally, IconMonstr has some of my favorite style of icon – the minimal appearance seems to be perfect for so many of apps. And they have thousands of free svg, png, psd, and eps files.

If you just want to quickly implement it into your project, they have a copy and paste embed code. But I think a great way to implement this into your project is to use one of the Vue Icon Libraries from the first section and implement whatever you download from IconMonstr as a custom icon.

![IconMonstr icons](/img/articles/free-vue-icon-libraries/iconmonstr.png)

## Build Your Own Vue Icon Set

If you want to pick and choose your svg icons from different sources, there are pretty simple ways to implement them into your project. For example, in Nuxt, there is a handy library called [nuxt-svg-loader](https://www.npmjs.com/package/nuxt-svg-loader) that allows you to automatically convert your svg files into components.

Even just in an ordinary Vue app, [vue-svg-loader](https://www.npmjs.com/package/vue-svg-loader) works very similarly. So if you’re feeling extra creative and want things from all over, you can do it with a little bit of setup.

## Enjoy the Vue Icon Libraries

Vue Icon libraries are a great way to spruce up your web app. The standalone apps provide you a clean easy interface to include some of the biggest icon libraries into your project. The complete UI libraries help you build a cohesive app experience for your users.

Regardless of what you use, make sure you use icons wisely in order to maximize their effectiveness.

Hope this helped!
