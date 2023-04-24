---
author: Matt Maribojoc
title: Extract and Reuse Logic in the Vue Composition API
snippet: The Vue 3 Composition API allows for better code organization in large projects. It actually just takes a little bit of more planning to reuse logic.
publishedDate: 2020/03/27
tags: best practices,composition api,organization,vue3
slug: extract-and-reuse-logic-in-the-vue-composition-api
category: Quick Tips
cover: articles/composition-api-reusability
---
The [Vue 3 Composition API](https://learnvue.co/2020/02/building-the-same-component-in-vue2-vs-vue3) allows for better code organization in large projects. However, with the switch from using several different options properties to a singular setup method, a question that a lot of developers have is…

> “Won’t this even be more cluttered since everything is in one method”?

While it may be easy to think this at first glance, it actually just takes a little bit of more planning to write [reusable and modular code](https://learnvue.co/2020/01/4-vue3-composition-api-tips-you-should-know/).

Let’s take a look at how to do this.

## The Problem

If you have experience in Vue, you’ve seen the Options API, which is a pretty intuitive way to separate code. A component might look something like this:

```js
export default {
  data() {
    return {
      articles: [],
      searchParameters: [],
    }
  },
  mounted() {
    this.articles = ArticlesAPI.loadArticles()
  },
  methods: {
    searchArticles(id) {
      return this.articles.filter(() => {
        // some search code
      })
    },
  },
}
```

The issue is that if you have hundreds of lines in a single component, you would have to add code for a single feature (like a searching for example) in multiple sections data, methods, computed, and so on.

This means that code for just one feature could be spread out hundreds of lines apart and in several different places – making it hard to read or debug.

Now, here is the equivalent code using the new Composition API.

```js
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const articles = ref([])
    const searchParameters = ref([])

    onMounted(() => {
      this.articles = ArticlesAPI.loadArticles()
    })

    const searchArticles = (id) => {
      return articles.filter(() => {
        // some search code
      })
    }

    return {
      articles,
      searchParameters,
      searchArticles,
    }
  },
}
```

So now, to address the earlier question about organization, let’s check out a great way to extract our logic.

## Extracting Logic

Our end goal is to have each feature extracted into its own method. That way, if we want to debug it, all of the code is one place.

This is pretty simple, but we just have to remember that in the end, we have to still use our setup method to return data if we want to be able to access it in our template.

So let’s create our new method. We’ll call it `useSearchArticles` and will make it return everything that we were returning in our setup method.

```js
const useSearchArticles = () => {
  const articles = ref([])
  const searchParameters = ref([])

  onMounted(() => {
    this.articles = ArticlesAPI.loadArticles()
  })

  const searchArticles = (id) => {
    return articles.filter(() => {
      // some search code
    })
  }

  return {
    articles,
    searchParameters,
    searchArticles,
  }
}
```

Now, inside our setup method, we can access the properties by calling our method. And, of course, we got to remember to return them from our setup method as well.

```js
export default {
  setup() {
    const { articles, searchParameters, searchArticles } = useSearchArticles()

    return {
      articles,
      searchParameters,
      searchArticles,
    }
  },
}
```

## Accessing Component Properties in our Extracted Logic

Another new change in the Composition API is the change in the \`this\` reference. The change means that we can no longer things like a props, attributes, or emit events in the same way.

In short, we’re going to have to use the two arguments of the setup method to access props, attributes, slots, or the emit method. If we were only using the setup method, a quick, dummy component might look like this.

```js
export default {
  setup(props, context) {
    onMounted(() => {
      console.log(props)
      context.emit('event', 'payload')
    })
  },
}
```

But now that we want to extract our logic, we have to take our logic wrapper method accept parameters as well. This way, we can pass our props and context properties from our setup method and the logic code can access them.

```js
const checkProps = (props, context) => {
  onMounted(() => {
    console.log(props)
    context.emit('event', 'payload')
  })
}

export default {
  setup(props, context) {
    checkProps(props, context)
  },
}
```

## Reusing Logic

Finally, if we are writing some logic that we want to be able to use in multiple components, we can extract the logic to its own file and import it in our components.

Then, we can just call the method like we did earlier. Let’s say that we moved our `useSearchArticles` method into a file called use-search-articles-logic.js like this

```js
import { ref, onMounted } from 'vue'
export function useSearchArticles() {
  const articles = ref([])
  const searchParameters = ref([])

  onMounted(() => {
    this.articles = ArticlesAPI.loadArticles()
  })

  const searchArticles = (id) => {
    return articles.filter(() => {
      // some search code
    })
  }

  return {
    articles,
    searchParameters,
    searchArticles,
  }
}
```

Using this new file, our original component would look something like this

```js
import { useSearchArticles } from './logic/use-search-articles-logic'

export default {
  setup(props) {
    const { articles, searchParameters, searchArticles } = useSearchArticles()

    return {
      articles,
      searchParameters,
      searchArticles,
    }
  },
}
```

## Conclusion

Hopefully, this article helped give you a better understanding of how the Composition API will change the way we code.

But as always, the organization of your project depends on the developers’ willingness to design great component code and create reusable logic.

Just remember, the goal is to increase readability and the Composition API is a great way to do that in Vue.

Happy coding!
