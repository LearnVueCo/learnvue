---
author: Matt Maribojoc
title: A Guide To Vue 3 Form Validation - Vuelidate Tutorial
snippet: Vue Form Validation is an essential part of any form system. Luckily for Vue developers the Vuelidate library does most of the hard work for us.
publishedDate: 2020/01/29
tags: forms,libraries,validation
slug: getting-smart-with-vue-form-validation-vuelidate-tutorial
videoLink: https://youtube.com/v/2BR6Vvjw3wQ
category: Tools and Libraries
cover: articles/intro-to-vuelidate
---
**Vue Form Validation is an essential** part of any form system. You need to be sure that people are submitting data that your app can work with!

Whether it’s ensuring users have a strong password or checking that a message isn’t too long, input validation is everywhere in web apps.

Luckily for Vue developers, the Vuelidate library does most of the hard work for us. We don’t have to write hundreds of conditionals to verify our inputs. We get to work smarter instead of working harder.

Vuelidate is a great library for all Vue developers, so let’s dive right in and get coding.

## What is Vuelidate?

[Vuelidate](http://vuelidate.js.org/) provides model-based validation for Vue projects.

It’s a simple, yet powerful way to add form validation into your projects because it has **dozens of built in validators**. Some of the basics include…

- `required` – value cannot empty
- `minLength/maxLength` – provides a min or max length for a value
- `email` – value must be a valid email address format
- `alpha` – value only accepts the alphabet
- `numeric` – value only accepts numbers

This is only a short list of the built in validators that Vuelidate offers. For a complete list, be sure to go to the [Vuelidate docs](https://vuelidate.js.org/#sub-builtin-validators).

## A basic Vue form validation example

Now that we know what Vuelidate is and have some sort of idea what it can do,**let’s implement it.**

To go ahead and add Vuelidate to our project, let’s open up a terminal and install 2 dependencies – vuelidate core and validators.

```bash
npm install @vuelidate/core @vuelidate/validators
```

Now let’s jump right into an example form. For this video, we’re going to make a very simple user registration form. We’re going to start off with the Options API and then see how to convert it to the Composition API after.

So in an empty component, let’s start off by building our template – which will contain the form and its inputs.

```vue
<template>
  <div class="root">
    <h2>Create an Account</h2>
    <p>
      <input type="text" placeholder="Email" />
    </p>
    <p>
      <input type="password" placeholder="Password" />
    </p>
    <p>
      <input type="password" placeholder="Confirm Password" />
    </p>
    <button>Submit</button>
  </div>
</template>
```

This is a pretty basic form setup, but the approach to validate inputs with Vuelidate **works the same** no matter how many inputs you have.

Alright, I’m going to add some CSS to pretty it up a little bit. To keep this tutorial focused on Vuelidate, we won’t covering the styles in detail, but here are the one’s that I’ll be using

```vue
<style lang="css">
.root {
  width: 400px;
  margin: 0 auto;
  background-color: #fff;
  padding: 30px;
  margin-top: 100px;
  border-radius: 20px;
}

input {
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
  font-size: 1em;
  padding: 5px 0;
  margin: 10px 0 5px 0;
  width: 100%;
}

button {
  background-color: #3498db;
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  color: white;
}
</style>
```

And here’s a look at our current form.

![](/img/articles/intro-to-vuelidate/1.png)

Now that we have our form set up, let’s connect it to some data.

## Modeling our Form

Inside, our script section, since we are using the Options API, let’s add a `data` method to our export default and return an object with two properties – `email`, and `password`.

```js
export default {
  data() {
    return {
      email: '',
      password: {
        password: '',
        confirm: '',
      },
    }
  },
}
```

All of these properties allow us to model our data in a clean, logical structure.

To actually get our inputs connected to our data, we’re going to use a `v-model`on each of our inputs that correspond to the proper data.

```html
<input type="text" placeholder="Email" v-model="email" />
<!-- -->
<input type="password" placeholder="Password" v-model="password.password" />
<!-- -->
<input
  type="password"
  placeholder="Confirm Password"
  v-model="password.confirm"
/>
```

Now let’s go to our button and listen for the click event and when it’s captured, let’s call a method called `submitForm`.

```html
<button @click="submitForm">Submit</button>
```

Okay – time to make this method. Let’s add a `methods` section and a `submitForm` method. In real apps, this is where we’d make our API call with our form data, but for our example, we’ll put an alert that says form submitted.

```js
export default {
  // ...
  methods: {
    submitForm() {
      alert('Form successfully submitted')
    },
  },
}
```

So, if we click our button, we get our nice alert notification.

![](/img/articles/intro-to-vuelidate/2.png)

Fantastic. We’re finally ready to start validating our inputs.

## Adding Vuelidate to our App

The first thing we want to do is go ahead and import `useValidate` in our script section. We’ll also import validations from Vuelidate’s built validator functions. To keep it simple, we’re just going to use the `required` check for now.

```js
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
```

Okay – now that we have our imports, let’s include Vuelidate in this component by adding a data property called `v$`, which is the standard **naming convention** for the Vuelidate object.

```js
export default {
  data() {
    return {
      v$: useValidate(),
      email: '',
      password: {
        password: '',
        confirm: '',
      },
    }
  },
}
```

Next, to actually create our validations, let’s add a method to our export default called `validations` and inside, similar to data, we want to return an object.

```js
export default {
  data() {
    /* ... */
  },
  methods: {
    /* ... */
  },
  validations() {
    return {}
  },
}
```

Great – since **Vuelidate is a model-based validation system**, we want our validation model to have the same format as our form data model, so let’s copy and paste our email and password properties from data into validations.

But in Vuelidate, instead of having the value of each data property, we want them to be equal to an object that contains all of the validations to check on each property.

```js
export default {
  // ...
  validations() {
    return {
      email: { required },
      password: {
        password: { required },
        confirm: { required },
      },
    }
  },
}
```

Since, we’re using the required property, each field for email, password, and confirm will be set to an object that contains required.

Okay – so we set up our validation model, but if we hit submit, our form will still submit. And that’s because our **validation functions are never actually running and checking our data.**

## Running validate() on our form

To understand why our form isn’t validating yet, we have to understand a little bit more about the Vuelidate object.

Inside `submitForm`, let’s add `console.log(this.v$)`

In our console, we can see a ton of different properties. Dirty properties check if there are new input values that haven’t been validated yet, error is a boolean that says if **any input**is invalid, errors is where we can get the specific error information for our form.

![](/img/articles/intro-to-vuelidate/3.png)

If you want to learn specifics about each one, I recommend checking out the [Vuelidate documentation](https://vuelidate-next.netlify.app/).

If we scroll down, we’ll see both our `email` and `password` properties that are also Vuelidate objects with a pretty similar structure to this root object.

![](/img/articles/intro-to-vuelidate/4.png)

Right above them, are two pretty important methods: `touch` and `validate`:

- `touch` is a property on each Vuelidate object/property that allows us to individually validate a value.
- Our root object contains a `validate` method that will validate all of the inputs and, like `touch`, update the Vuelidate objects

So for our case, when we submit our form, we want to make sure that all of the inputs pass their validations. To do this, let’s first call `this.v$.validate()` to check all of our inputs.

And after that runs, if any fail their validation, our Vuelidate object will have an error.

We can check for this in our submitForm method by surrounding our alert with an if statement that checks `!this.v$.$error`. So if we have an error, meaning an input isn’t valid, our form won’t submit.

Then, just for our sake, let’s add an else statement that gives an alert with a message saying that our form didn’t pass validation.

```vue
<script>
export default {
  methods: {
    submitForm() {
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        alert('Form successfully submitted.')
      } else {
        alert('Form failed validation')
      }
    },
  },
}
</script>
```

So in our app, if we try submitting right away, our form is invalid. If we only have an email, still invalid. The only time our form will submit, is when all three inputs have some sort of value.

**Congrats! You’ve added Vuelidate to your project!** I know it doesn’t seem like much, but it’s really that easy to wrap your head around the basics.

## Using Vuelidate with the Composition API

The first step to moving to the Composition API is to actually create our setup method. Inside, we’ll start off by declaring our data state and our validation rules. To do this, we’ll need to import both `reactive` and `computed` from Vue.

```js
import { reactive, computed } from 'vue'
export default {
  setup() {},
  // ... keep everything else for now
}
```

For our form data, we’ll create a `const state` equal to a reactive object that **looks the same** as our old properties with our email and password properties. And then we can delete our old data option.

```js
export default {
  setup() {
    const state = reactive({
      email: '',
      password: {
        password: '',
        confirm: '',
      },
    })
  },
}
```

For our rules, we want a computed property. And the reason we want this to be a computed property is when we use other validations to check if our password fields match, we want access to the current `state.password` values.

> **Using computed allows us to have a responsive set of rules.**

Alright, so let’s make `const rules` equal to a computed property. Inside, we’ll make our getter function and we want to return the same object as our old validation. Then, we can delete our old validations option.

```vue
<script>
export default {
 setup() {
        const state = reactive({
            email: '',
            password: {
                password: '',
                confirm: '',
            },
        })
        const rules = computed(() => {
            email: { required },
            password: {
                password: { required },
                confirm: { required },
            }
        })
 }
}
</script>
```

Then, let’s create our Vuelidate object and pass it rules and state. Also, since this is the Composition API, let’s make sure that we return both `state` and `v$` from our setup method.

```vue
<script>
export default {
 setup() {
    const state = reactive({
      email: '',
      password: {
        password: '',
        confirm: '',
      },
    })
    const rules = computed(() => {
       email: { required },
       password: {
         password: { required },
         confirm: { required },
       }
    })

    const v$ = useValidate(rules, state)

    return { state, v$ }
 }
}
</script>
```

Since we are using reactive, let’s go to our template and change how we reference our data in the `v-model`s to use our state object. So let’s say `state.email` and `state.password` instead of just email and password.

```html
<!-- OLD FORMAT -->
<input type="text" placeholder="Email" v-model="email" />
<!-- NEW FORMAT WITH STATE -->
<input type="text" placeholder="Email" v-model="state.email" />
```

But checking if all the fields have a value isn’t necessarily the best validation so let’s add some more checks.

## Adding More Built-in Vuelidate Checks

After importing `required` from validators, let’s import three more: `email`, `minLength`, and `sameAs`.

```js
import { required, email, minLength, sameAs } from '@vuelidate/validators'
```

These validators work exactly as you’d expect…

- `email` checks if the value is a valid email address
- `minLength` takes a number and requires the input to be that long
- And `sameAs` takes a value and returns true if the input is the same

We’re going to add these to our rules object like this.

```js
const rules = computed(() => {
  return {
    email: { required, email },
    password: {
      password: { required, minLength: minLength(6) },
      confirm: { required, sameAs: sameAs(state.password.password) },
    },
  }
})
```

This is one of the examples where it’s clear why we need rules to be computed. To get the current value of password, this rules variable has to update when its dependencies change

Cool. But now let’s actually figure out how to display these error messages so we now exactly how to fix each property.

## Displaying error messages from Vuelidate

If we remember, each Vuelidate property has two error related fields: `$error`which is a boolean saying if that property has an error and `$errors` which is an array with more information about each error.

In our template, below our email input. Let’s create a span that renders when our email property fails validation. Inside, we want to get the first error and print it out.

That code looks like this.

```html
<span v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }} </span>
```

Now, if we hit submit with typing an email, we’ll see that it’s a required field. If we give it a value but not a valid email, we’re told that the value is not a valid email address.

![](/img/articles/intro-to-vuelidate/5.png)

Fantastic – let’s do the same thing for password and confirm password.

```vue
<template>
  <div class="root">
    <h2>Create an Account</h2>
    <p>
      <input type="text" placeholder="Email" v-model="state.email" />
      <span v-if="v$.email.$error">
        {{ v$.email.$errors[0].$message }}
      </span>
    </p>
    <p>
      <input
        type="password"
        placeholder="Password"
        v-model="state.password.password"
      />
      <span v-if="v$.password.password.$error">
        {{ v$.password.password.$errors[0].$message }}
      </span>
    </p>
    <p>
      <input
        type="password"
        placeholder="Confirm Password"
        v-model="state.password.confirm"
      />
      <span v-if="v$.password.confirm.$error">
        {{ v$.password.confirm.$errors[0].$message }}
      </span>
    </p>
    <button @click="submitForm">Submit</button>
  </div>
</template>
```

Now, we get really nice error messages that tell us exactly what’s wrong.

## Adding Custom Validation Rules in Vuelidate

The final concept we’ll cover is adding a simple custom validation to our form.

Let’s say that we want our email to have learnvue somewhere in its value.

This is super simple. **All we have to do is create a function that returns a boolean for our validation**. That’s it.

So right before rules, let’s add this.

```js
const mustBeLearnVue = (value) => value.includes('learnvue')
```

And to add it to our email validations, we can just add `mustBeLearnVue` to our `email` object in rules.

```js
const rules = computed(() => {
  return {
    email: {
      required,
      email,
      mustBeLearnVue,
    },
    password: {
      password: { required, minLength: minLength(6) },
      confirm: { required, sameAs: sameAs(state.password.password) },
    },
  }
})
```

Let’s try this out.

We’ll give an email of matt@gmail.com, password of `123456`, and confirm password of `123456`.

If we hit submit, our form won’t submit, but we don’t get any error message printed to the screen. And that’s because our custom validation doesn’t have an associated error message.

We can easily add one by adding importing `helpers` from `validators`

```js
import {
  required,
  email,
  minLength,
  sameAs,
  helpers, // include helper functions from Vuelidate
} from '@vuelidate/validators'
```

Then, where we add `mustBeLearnVue`, we want to set it equal to `helpers.withMessage()` – and the first argument is our message and the second argument is our validator function.

```js
const rules = computed(() => {
  return {
    email: {
      required,
      email,
      mustBeLearnVue: helpers.withMessage('Must be learnvue', mustBeLearnVue),
    },
    password: {
      password: { required, minLength: minLength(6) },
      confirm: { required, sameAs: sameAs(state.password.password) },
    },
  }
})
```

Awesome.

So now, if we have everything valid, but it’s not from learnvue, we get our nice error message.

![](/img/articles/intro-to-vuelidate/6.png)

You can also apply these `helpers.withMessage` to add custom messages to built in validators like `required`.

## Conclusion

There you go!

Vuelidate is an extremely powerful tool and can save you from having to write a complicated reactive system all on your own. I’ve personally used it in countless personal projects.

Now, you should now have an idea of how to get started in Vuelidate. We’ve covered

- Installing Vuelidate
- Building an example form
- Adding some of Vuelidate’s advanced features

Let me know how you’re using Vuelidate in your projects. I’d love to hear your creative solutions 🙂
