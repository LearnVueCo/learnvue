---
author: Matt Maribojoc
title: Get Kanye West Quotes w/ Vue and Axios - Beginner’s Guide to APIs
snippet: Axios is one of the most popular HTTP request libraries for JavaScript and it’s commonly used to call APIs inside of Vue apps.
publishedDate: 2021/05/11
tags: api,axios,composition api,http,request,vue 3
slug: get-kanye-west-quotes-w-vue-and-axios-beginners-guide-to-apis
videoLink: https://youtube.com/v/k8hrLNnhZS4
category: Tools and Libraries
cover: articles/vue-and-axios
---
Axios is one of the most popular HTTP request libraries for JavaScript, and it’s commonly used to call APIs inside of Vue apps.

In this article, we’re going to be making a Kanye West Quote Generator using Axios in a Vue 3 app. Not only are we going to get some deep inspiration from Ye himself, but we’re going to learn how to connect our Vue apps to APIs and even learn how to **better organize** your Vue project with reusable API calls.

Let’s jump right into the code.

## Setting Up Our First Basic HTTP Request

The first thing we have to do is install Axios into our project in the terminal

```bash
npm install axios
```

Then, we can go inside of a Vue component and import axios like this.

```vue
<script>
import axios from 'axios'

export default {
  setup() {},
}
</script>
```

Next, inside our setup method let’s run `axios.get`with the URL of Kanye REST API to get a random quote. After, we can use a `Promise.then` to wait for the our request to give us a response.

```vue
<script>
import axios from 'axios'

export default {
  setup() {
    axios.get('https://api.kanye.rest/').then((response) => {
      // handle response
    })
  },
}
</script>
```

Alright so now we’re getting a response from our API, but let’s go ahead and see what it actually is. To do this, we’ll store it as a ref called `quote`.

```vue
<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  setup() {
    axios.get('https://api.kanye.rest/').then((response) => {
      // handle response
      quote.value = response
    })
    return {
      quote,
    }
  },
}
</script>
```

Finally, let’s print it up in our template in italics and surrounded by some quotes. And of course, we need some attribution on this quote.

```vue
<template>
  <div>
    <i>"{{ quote }}"</i>
    <p>- Kanye West</p>
  </div>
</template>
```

Alright – let’s check out what we have in our browser.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/get-kanye-west-quotes-w-vue-and-axios-beginners-guide-to-apis-1.png)

We can see our quote here, but there’s all this extra information from the API response

For our Kanye quote generator, we’re only really interested in this `data.quote` value – so back inside of our script section, let’s specify which property on `response` we want to access.

```js
axios.get('https://api.kanye.rest/').then((response) => {
  // handle response
  quote.value = response.data.quote
})
```

Alright, if we go back, we’ll see that we’re only getting the quote. Awesome.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/get-kanye-west-quotes-w-vue-and-axios-beginners-guide-to-apis-2.png)

## Using Axios with async/await

Another way that we can use Axios in our Vue app is with an `async`/`await` pattern.

Inside setup, let’s start off by commenting out our current GET code and creating an asynchronous method called `loadQuote`.

Inside, we can use our same `axios.get` method, but this time we want to use `async` to wait for it to finish and then store that result inside a constant called `response`.

Then, once again, let’s set the value of `quote`.

```js
const loadQuote = async () => {
  const response = await KanyeAPI.getQuote()
  quote.value = response.data.quote
}
```

That’s it. If we look at our app, it works exactly the same, but in our code, we’re using the async/await pattern.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/get-kanye-west-quotes-w-vue-and-axios-beginners-guide-to-apis-3.png)

Awesome.

## Error Handling in Axios

In the async-await pattern, we can add error handling by surrounding our API call with a `try` and `catch`. That’s it.

```js
try {
  const response = await KanyeAPI.getQuote()
  quote.value = response.data.quote
} catch (err) {
  console.log(err)
}
```

With the original promises syntax, we can add a `.catch` after our API call to capture any errors coming from our request.

```js
axios
  .get('https://api.kanye.rest/')
  .then((response) => {
    // handle response
    quote.value = response.data.quote
  })
  .catch((err) => {
    console.log(err)
  })
```

## Sending a POST Request

Now that we know how to send GET requests with Axios, let’s look at sending POST requests.

To do this in this tutorial, we’re going to be using the [JSONPlaceholder Mock API Calls](https://jsonplaceholder.typicode.com/).

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/get-kanye-west-quotes-w-vue-and-axios-beginners-guide-to-apis-4.png)

And if we look at their[documentation](https://jsonplaceholder.typicode.com/guide/), they give us a `/posts`POST request.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/get-kanye-west-quotes-w-vue-and-axios-beginners-guide-to-apis-5.png)

Okay – let’s make a button that will trigger our API call. In our template, let’s make a button that says *“Create Post”*and when it’s clicked, it calls a method called `createPost`.

```vue
<template>
  <div>
    <i>"{{ quote }}"</i>
    <p>- Kanye West</p>
    <p>
      <button @click="createPost">Create Post</button>
    </p>
  </div>
</template>
```

Alright – we can head down to our script, make this `createPost` method, and return it from `setup`.

In this method, similar to our GET request, we just have to say `axios.post`, pass in our URL, which is the `https://jsonplaceholder.typicode.com/posts` and then we can just copy and paste the placeholder data from their documentation.

```js
const createPost = () => {
  axios
    .post(
      'https://jsonplaceholder.typicode.com/posts',
      JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      })
    )
    .then((response) => {
      console.log(response)
    })
}
```

Alright – let’s try this out.

If we click our button, we’ll see that our console is logging a ton of information telling us that our post request was successful.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/get-kanye-west-quotes-w-vue-and-axios-beginners-guide-to-apis-6.png)

Awesome.

## Pro Tip: Write Reusable API Calls with Axios

One tip that I use in my projects to help organize all of my api calls is to create a `src/services` folder that will contain my API calls.

These will have 2 types of files:

- `API.js` – a file that will create an Axios instance with a defined `baseURL` that will be used for all routes
- `{specific functionality}API.js` – more specific files that can be used to organize the api calls into **reusable modules**

This has several benefits. First, by creating one `API.js` file that creates the axios instances, it means that your base URL is set in one place – meaning that if you wanna toggle between the dev and prod servers, **you only have to change your code in this file.**

So let’s create our `services/API.js` file and set our Axios baseURL to default to the Kanye REST API unless we pass in another value.

```js{}[API.js]
import axios from "axios";

export default (url = "https://api.kanye.rest") => {
  return axios.create({
    baseURL: url,
  });
};
```

And that’s all for that file, next let’s make a `KanyeAPI.js` file and `import API from './API'`. Here, we want to export different API calls.

Calling `API()` gives us an Axios instance that we can call `.get` or `.post` on! So here’s the code that will get our random quote.

```js{}[KanyeAPI.js]
import API from "./API";

export default {
  getQuote() {
    return API().get("/");
  },
};
```

Then, inside `App.vue`, let’s make our component use this new file with its reusable API call instead of creating Axios all on its own.

```js{}[App.vue]
const loadQuote = async () => {
  try {
    const response = await KanyeAPI.getQuote(); // <--- THIS LINE
    quote.value = response.data.quote;
  } catch (err) {
    console.log(err);
  }
};
```

That’s it! If we load up our app, we’re still loading in quotes perfectly.

Now, let’s move this our `createPost` into its own reusable method.

Back in `KanyeAPI.js`, let’s add `createPost` to the export default, and this will take the data for the post request as an argument that we can pass to our HTTP request.

Similar to our GET request, we want to return our API to get an axios instance, but this time we need to override the default URL value and pass in our JSONplaceholder url. Then, we can call Axios post like we’re used to.

```js{}[KanyeAPI.js]
export default {
  getQuote() {
    return API().get("/");
  },
  createPost(data) {
    return API("https://jsonplaceholder.typicode.com/").post("/posts", data);
  },
};
```

Easy as that.

Back in `App.vue`, we can call our new post method like this.

```js
const createPost = () => {
  const response = await KanyeAPI.createPost(
    JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    })
  )

  console.log(response)
}
```

Now, when we click our button, we’ll see that our dedicated API files are working – giving us a 201 code meaning we had a successful post.

## And that’s it

The great thing about moving our API calls out of these Vue components and into their own files is that we can now use these API calls wherever we want across our app. It lets us create more reusable and scalable code.

I hope this helped and happy coding!
