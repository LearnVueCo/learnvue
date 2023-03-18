---
author: Matt Maribojoc
title: Building the Same Component in Vue2 vs. Vue 3
snippet: Learn the main programming differences between Vue2 and Vue 3 and be on your way to becoming a better developer.
publishedDate: 2020/02/25
tags: dev tips,vue2,vue3
slug: building-the-same-component-in-vue2-vs-vue3
category: Build Along
cover: articles/vue-2-vs-vue-3
---
With the release of Vue 3 coming soon, many people are wondering “What’s different in Vue 2 vs. Vue 3?”

Although we’ve written articles before about the biggest changes coming, we haven’t really taken a deep look at _exactly_ how our code will change. So to show these changes, we’re going to build a simple form component in both Vue 2 and Vue 3.

By the end of this article, you’ll understand the main programming differences between Vue 2 and Vue 3 and be on your way to becoming a better developer.

Alright – let’s go!

## Creating our Template

For most components, the code will be very _similar_, if not identical, in both Vue 2 and Vue 3. However, Vue 3 has support for Fragments, meaning that components can have more than one root node.

This is especially useful when rendering components in a list to remove unnecessary wrapper div elements. However, in this case, we’ll keep a single root node for both versions of our Form component.

```vue{}[Vue2]
<template>
  <div class="form-element">
    <h2>{{ title }}</h2>
    <input type="text" v-model="username" placeholder="Username" />

    <input type="password" v-model="password" placeholder="Password" />

    <button @click="login">Submit</button>
    <p>Values: {{ username + ' ' + password }}</p>
  </div>
</template>

```

The major difference is how we access our data. In Vue 3, if we use the `reactive` option, our reactive data is all wrapped in a reactive state variable – so we need to access this state variable to get our values.

```vue{}[Vue 3]
<template>
  <div class="form-element">
    <h2>{{ state.title }}</h2>
    <input type="text" v-model="state.username" placeholder="Username" />

    <input type="password" v-model="state.password" placeholder="Password" />

    <button @click="login">Submit</button>
    <p>Values: {{ state.username + ' ' + state.password }}</p>
  </div>
</template>
```

## Setting Up Data

**This is where the main difference is – the Vue2 Options API vs. the Vue 3 Composition API.**

The Options API separates our code into different properties: data, computed properties, methods, etc. Meanwhile, the Composition API allows us to group our code by function rather than the type of property.

For our form component, let’s say we just have two data properties: a `username` and a `password`.

The Vue 2 code would look like this – we just toss our two values in the data property.

```vue{}[Vue2]
<script>
export default {
  props: {
    title: String,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
};
</script>
```

In Vue 3, we have to put in a little more effort by working with a new `setup()` method where all of our component initialization should be taking place.

Also, to give developers more control over what is reactive, we have direct access to Vue’s reactivity API.

To create reactive data involves three steps:

- Import `reactive` from vue
- Declare our data using the reactive method
- Have our `setup` method return the reactive data so our template can access it

In terms of code, it will look a little like this.

```vue{}[Vue 3]
<script>
import { reactive } from "vue";

export default {
  props: {
    title: String,
  },
  setup() {
    const state = reactive({
      username: "",
      password: "",
    });

    return { state };
  },
};
</script>
```

Then, in our template, we access them like `state.username` and `state.password`

## Creating Methods in Vue 2 vs. Vue 3

The Options API has a separate section for methods. In it, we can just define all of our methods and organize them in whatever way we want.

```vue{}[Vue2]
<script>
export default {
  props: {
    title: String,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      // login method
    },
  },
};

</script>
```

The setup method in the [Vue 3 Composition API](https://learnvue.co)also handles methods. It works somewhat similarly to declaring data – we have to first declare our method and then **return it** so that other parts of our component can access it.

```vue{}[Vue 3]
<script>
export default {
  props: {
    title: String,
  },
  setup() {
    const state = reactive({
      username: "",
      password: "",
    });

    const login = () => {
      // login method
    };
    return {
      login,
      state,
    };
  },
};
</script>
```

## Lifecycle Hooks

In Vue2, we can access the [lifecycle hooks](https://learnvue.co/2019/12/a-beginners-guide-to-vuejs-lifecycle-hooks/) directly from our component options. For our example we’ll be waiting for the mounted event.

```vue{}[Vue2]
<script>
export default {
  props: {
    title: String,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  mounted() {
    console.log("component mounted");
  },
  methods: {
    login() {
      // login method
    },
  },
};

</script>
```

Now with the Vue 3 Composition API, almost everything is inside the setup() method. This includes the mounted lifecycle hook.

However, lifecycle hooks are not included by default so we have to import the `onMounted` method as its called in Vue 3. This looks the same as importing reactive earlier.

Then, inside our setup method, we can use the onMounted method by passing it our function.

```vue{}[Vue 3]
<script>
import { reactive, onMounted } from "vue";

export default {
  props: {
    title: String,
  },
  setup() {
    // ..

    onMounted(() => {
      console.log("component mounted");
    });

    // ...
  },
};

</script>
```

## Computed Properties

Let’s add a computed property that converts our username to lowercase letters.

To accomplish this in Vue2, we add a computed field to our options object. From here, we can define our property like this…

```vue{}[Vue2]
<script>
export default {
  // ..
  computed: {
    lowerCaseUsername() {
      return this.username.toLowerCase();
    },
  },
};
</script>
```

The design of Vue 3 allows developers to import what they used and not have unnecessary packages in their project. Essentially, they didn’t want developers to have to include things they never used, which was becoming a growing problem in Vue2.

So to use computed properties in Vue 3, we first have to import computed into our component.

Then, similarly to how we created our reactive data earlier, we can make a piece of reactive data a computed value like this:

```vue{}[Vue 3]
<script>
import { reactive, onMounted, computed } from "vue";

export default {
  props: {
    title: String,
  },
  setup() {
    const state = reactive({
      username: "",
      password: "",
      lowerCaseUsername: computed(() => state.username.toLowerCase()),
    });

    // ...
  },
};

</script>
```

## Accessing Props

Accessing props brings up an important distinction between Vue 2 and Vue 3 – `this` means something totally different.

In Vue2, `this` would almost always refer to the component, not a specific property. While this made things easy on the surface, it made type support a pain.

However, we could easily access props – let’s just add a trivial example like printing out our `title` prop during the mounted hook:

```vue{}[Vue2]
<script>
export default {
  mounted() {
    console.log("title: " + this.title);
  },
};

</script>
```

However in Vue 3, we no longer use `this` to access props, emit events, and get properties. Instead, the `setup()` method takes two arguments:

- `props` – immutable access to the component’s props
- `context` – selected properties that Vue 3 exposes (emit, slots, attrs)

Using the props argument, the above code would look like this.

```vue{}[Vue 3]
<script>
export default {
  setup(props) {
    // ...
    onMounted(() => {
      console.log("title: " + props.title);
    });
    // ...
  },
};
</script>
```

## Emitting Events

Similarly, [emitting events](https://learnvue.co/2020/01/a-vue-event-handling-cheatsheet-the-essentials) in Vue 2 is very straightforward, but Vue 3 gives you more control over how properties/methods are accessed.

Let’s say, in our case, that we want to emit a login event to a parent component when the “Submit” button is pressed.

The Vue 2 code would just have to call `this.$emit` and pass in our payload object.

```vue{}[Vue2]
<script>
export default {
  methods: {
    login() {
      this.$emit("login", {
        username: this.username,
        password: this.password,
      });
    },
  },
};

</script>
```

However, in Vue 3, we now know that `this` no longer means the same thing, so we have to do it differently.

Luckily, the context object exposes `emit` that gives us the same thing as `this.$emit`

All we have to do is add `context` as the second parameter to our setup method. We’re going to be destructuring the context object to make our code more concise.

Then, we just call emit to send our event. Then, just like before, the emit method takes two arguments:

- The name of our event
- A payload object to pass with our event

```vue{}[Vue 3]
<script>
export default {
  setup(props, { emit }) {
    // ...

    const login = () => {
      emit("login", {
        username: state.username,
        password: state.password,
      });
    };

    // ...
  },
};
</script>
```

## The Final Vue 2 vs. Vue 3 Code

Great! We’ve made it through the end. As you can see, all of the concepts are the same in Vue 2 and Vue 3, but some of the ways we access properties have changed a little bit.

Overall, I think that Vue 3 will help developers write much more organized code – especially in large codebases. This is mostly because the Composition API allows you to group code together by specific features and even extract out functionality into their own files and import them into components as needed.

After everything here is our code for the form component in Vue 2.

```vue
<template>
  <div class="form-element">
    <h2>{{ title }}</h2>
    <input type="text" v-model="username" placeholder="Username" />

    <input type="password" v-model="password" placeholder="Password" />

    <button @click="login">Submit</button>
    <p>Values: {{ username + ' ' + password }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  mounted() {
    console.log('title: ' + this.title)
  },
  computed: {
    lowerCaseUsername() {
      return this.username.toLowerCase()
    },
  },
  methods: {
    login() {
      this.$emit('login', {
        username: this.username,
        password: this.password,
      })
    },
  },
}
</script>
```

And here it is in Vue 3.

```vue
<template>
  <div class="form-element">
    <h2>{{ state.title }}</h2>
    <input type="text" v-model="state.username" placeholder="Username" />

    <input type="password" v-model="state.password" placeholder="Password" />

    <button @click="login">Submit</button>
    <p>Values: {{ state.username + ' ' + state.password }}</p>
  </div>
</template>
<script>
import { reactive, onMounted, computed } from 'vue'

export default {
  props: {
    title: String,
  },
  setup(props, { emit }) {
    const state = reactive({
      username: '',
      password: '',
      lowerCaseUsername: computed(() => state.username.toLowerCase()),
    })

    onMounted(() => {
      console.log('title: ' + props.title)
    })

    const login = () => {
      emit('login', {
        username: state.username,
        password: state.password,
      })
    }

    return {
      login,
      state,
    }
  },
}
</script>
```

I hope this tutorial helped highlight some of the ways Vue code will look different in Vue 3. If you have any other questions, just leave a reply!

Happy coding!
