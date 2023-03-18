---
author: Matt Maribojoc
title: How to Make Your First VueJS Plugin
snippet: While creating your own plugin may seem like an overwhelming task it’s actually a lot more doable than you think.
publishedDate: 2020/01/07
tags: customization,plugins,tutorial
videoLink: https://youtube.com/v/ar1fJECxbyU
category: Advanced Vue
cover: articles/simple-vue-plugin
---
As VueJS grows in popularity, community-created VueJS plugins are becoming more common and more powerful.

In fact, there are some plugins that I find _insanely_ useful. For example, there are amazing [UI libraries](https://learnvue.co/2019/12/8-free-vue-icon-libraries-to-pretty-up-your-web-app/) and utility plugins that have saved me tons of time in development.

While creating your own plugin may seem like an overwhelming task, it’s actually a lot more doable than you think. By the end of this tutorial, you will have…

- Created your first VueJS plugin
- An overview how they work
- Learned all the tools to build more complicated plugins

Time to dive right in!!

## How to Setup Your Plugin

Speaking broadly, our plugin is just a JavaScript module that exposes the _.install_method. This method takes 2 parameters

- The Vue constructor
- An object of options

Let’s make it.

In our Vue project, create a new folder at `src/plugins`

Then in our new folder, we can actually create our plugin file. For this tutorial, I named it `first-plugin.js`

> While creating your own plugin may seem like an overwhelming task, it’s actually a lot more doable than you think.

Inside our new plugin file, we should just follow a typical [ES6 module pattern](https://tylermcginnis.com/javascript-modules-iifes-commonjs-esmodules/) AKA the whole “export default” thing. Export Default allows us to export our plugin from its file and allow other files to import it.

Next, like we were discussing earlier, our plugin **must** expose a .install(Vue, options) method. This is what Vue actually calls when we install our plugin.

So right now, the skeleton code should look a little like this.

```js{}[first-plugin.js]
export default {
  // called by Vue.use(FirstPlugin)
  install(Vue, options) {},
};
```

Now, let’s actually add some stuff to this code.

## Adding Functionality to a Plugin

Since we have the outline of our plugin set up, we can start building onto it. There are several different options that we can go with to add functionality. For now, we’ll just cover a quick and easy one (don’t worry we’ll get to more advanced techniques later on).

### Building Your First Plugin

One simple way to see our plugin in action is to create a global mixin that will be included on all Vue instances. This is possible using the [Vue.mixin](https://vuejs.org/v2/guide/mixins.html#Global-Mixin)function.

If you’re unfamiliar, this is a basic overview of [VueJS mixins](https://learnvue.co/2019/12/how-to-manage-mixins-in-vuejs/). Essentially, they allow you to inject additional component options. They’re a great way to extract and reuse common functionality between components. Mixins also allow your plugin to access Vue lifecycle hooks.

To add a mixin to a plugin, we declare our additional component options inside the Vue.mixin function. To get started, I just added a created lifecycle hook with a console.log statement.

Our plugin code should now look like this.

```js{}[first-plugin.js]
export default {
  // called by Vue.use(FirstPlugin)
  install(Vue, options) {
    // create a mixin
    Vue.mixin({
      created() {
        console.log(Vue);
      },
    });
  },
};
```

### Installing Your Plugin

If you were to run your project now, you’ll notice that nothing has changed. That’s because we haven’t installed our plugin yet.

Thankfully, this is a super easy two line process. In our src/main.js file – the file that declares our Vue constructor – we just have to import and install our plugin file.

This is done with these lines of code.

```js{}[main.js]
import FirstPlugin from "./plugins/first-plugin.js";

Vue.use(FirstPlugin);
```

One great thing about Vue.use is that it makes sure that your plugin is only installed once. If you were to somehow accidentally add it twice, it would slow down your app and probably mess up some functionality. Thankfully, the Vue developers provided this safety net.

Finally. We have our plugin installed. Now, if we run our project and check out the logs we should see some output in the console.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/how-to-make-your-first-vuejs-plugin-1.com/ctAqtayWrioCiv4AMHhdjUDZsNHZaUpqbBsHQStvJrseledeLxD7C1gEOUA3zvorH7H5LNoU11u2jEHuoBbIU-08iRA9bWAfrKzI6wrEG1C_eIYVUPbxIix_k8oWQuYs5LOw3ryY)

## Let’s Make It Actually Useful

Okay great! You’ve officially created your first plugin. But it doesn’t really do anything too useful.

Let’s go over some neat ways to make your plugins functional.

### Declaring Global Properties

Global Data/Methods are a useful way to add widespread functionality to your code. It’s also super easy to do. Let’s say we want the current version of our app to be a global property. It’ll be something like this…

```js
export default {
  install(Vue, options) {
    // define a global property
    Vue.VERSION = 'v2.0.3'
  },
}
```

One thing to watch out for is overusing globals. It’s super easy to overcrowd the global scope and make it a pain to use.

### Defining Instance Properties

This is one of my favorite ways to add to plugins. Instance properties are a handy way to add both data and methods to your Vue project. I prefer using instance properties in order to keep my global scope clean and easy to understand.

In this example, I just created an instance method that takes a string and places inside <i> tags.

_Note: the $ is not necessary syntax; it’s just the naming convention that Vue uses for instance properties to avoid conflicts._

```js
// define an instance method
Vue.prototype.$italicHTML = function (text) {
  return '<i>' + text + '</i>'
}
```

Then, we can use it inside any component like this…

```html
<div v-html="$italicHTML(content)"></div>
```

### Building a Global Filter

[VueJS Filters](https://learnvue.co/2020/01/how-to-use-vuejs-filters-to-write-better-code/) are one of my favorite techniques because they make text transformations so easy. Once again, all we have to do is call the Vue constructor method Vue.filter and boom – we have a reusable global filter in our entire Vue project.

Using an example from my previous tutorial on filters, let’s say we want to use a filter to generate preview snippet from a longer text. We would want to do something like this in our plugin.

```js
// define a global filter
Vue.filter('preview', (value) => {
  if (!value) {
    return ''
  }
  return value.substring(0, userOptions.cutoff) + '...'
})
```

### Adding Custom Directives

[Custom directives](https://vuejs.org/v2/guide/custom-directive.html) are a great way to have low-level DOM access on specific elements.

Looking at the example from the [VueJS docs](https://vuejs.org/v2/guide/custom-directive.html), let’s create a custom directive inside our plugin that automatically focuses an element on a page.

Inside the install method, we just have to use the Vue.directive method to declare our new directive.

```js
// add a custom directive
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  },
})
```

Then, we can just add it onto an element. This is how we would automatically focus a text input on page load.

```html
<input type="text" placeholder="Type..." v-focus />
```

### Incorporating the Options Object

To this point, we haven’t touched on the second parameter of the install method. This method allows your plugin to be more flexible for different scenarios.

In order to use the options object, we first have to pass our plugin some options.

One **best practice** when working with the options object is to create some default values. We can do this by defining our default options object privately to the plugin file and then using Javascript’s [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to merge our default options with the argument options.

Looking back at our previous example, let’s say that we want to add an option that allows us to set the cutoff point of the text preview. That would go something like this…

```js
const defaultOptions = {
  cutoff: 50,
}

export default {
  // called by Vue.use(FirstPlugin)
  install(Vue, options) {
    // merge default options with arg options
    let userOptions = { ...defaultOptions, ...options }

    // REST OF PLUGIN CODE
  },
}
```

Now, even if there is no options passed to the plugin, it will still run with the default values.

> One best practice when working with the options object is to create some default values.

If we did want to pass options, it’s simple. Inside our `src/main.js` file, all we have to do is add a second argument to our Vue.use method. This argument will be an options object.

```js
Vue.use(FirstPlugin, { cutoff: 100 })
```

Because we put our argument options on the right side of the spread syntax, it overwrites our defaults.

### Our Final Hodge-Podge Plugin

After implementing these techniques. Here is our final plugin code.

```js
const defaultOptions = {
  cutoff: 50,
}

export default {
  // called by Vue.use(FirstPlugin)
  install(Vue, options) {
    // merge default options with arg options
    let userOptions = { ...defaultOptions, ...options }

    // create a mixin
    Vue.mixin({
      created() {
        console.log(Vue)
      },
    })

    // define a global property
    Vue.VERSION = 'v2.0.3'

    // define an instance method
    Vue.prototype.$italicHTML = function (text) {
      return '<i>' + text + '</i>'
    }

    // define a global filter
    Vue.filter('preview', (value) => {
      if (!value) {
        return ''
      }
      return value.substring(0, userOptions.cutoff) + '...'
    })

    // add a custom directive
    Vue.directive('focus', {
      // When the bound element is inserted into the DOM...
      inserted: function (el) {
        // Focus the element
        el.focus()
      },
    })
  },
}
```

Yes. This plugin is definitely all over the place in terms of functionality. But, if you followed along, you are now familiar with most of the tools, methods, and techniques you need to build more advanced plugins.

## Conclusion

See? Not that bad! You made your first plugin. I hope that this tutorial was a good introduction to the possibilities of creating VueJS plugins.

I’d love to see the plugins you create or what your favorite plugins are in general. Just mention us on [Twitter](https://twitter.com/learnvueco) @learnvueco or post on our [Facebook group](https://www.facebook.com/learnvueco/) 🙂
