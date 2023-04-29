# nuxt-vitest
> A Nuxt 3 project

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/learnvueco/learnvue/tree/main/demos/nuxt-3/nuxt-vitest)

[Link to Video]()
[Link to Article]()

## Outlines

### Why is Unit Testing in Nuxt 3 Tricky?

### Installation

1. install `nuxt-vitest` 

```sh
pnpm add -D nuxt-vitest

# or
yarn add --dev nuxt-vitest
npm i -D nuxt-vitest
```

2. add to `nuxt.config.js`

```js
export default {
  // ...
  modules: [
    'nuxt-vitest'
  ]
}
```

3. use your `vitest.config.js` to configure your tests

```js
import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineVitestConfig({
  // any custom vitest config you require
})
```

4. use the environment in tests

can either use filenames that contain `.nuxt.`, add `@vitest-environment nuxt` to the top of the file, or set `test.environment` to `nuxt` in your `vitest.config.js`

```js
import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt'
  }
})
```

5. running your tests

to run your tests, add a script to your `package.json` that runs `vitest`

```json
{
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "test": "vitest"
  }
}
```

### Writing Tests

now, we can write tests in a way that feels natural to the rest of the Nuxt Project. We can access the same autoimported values, and test them.

#### Mocking Composables
- we have a `mockNuxtImport` utility that we can use to mock things that are automatically imported by Nuxt

#### Testing Components
To help test components, we have a `mountSuspended` utility that will mount a component and return a promise that resolves when the component is mounted. This is useful for testing components within Nuxt's suspense. 

#### Mocking Components
If we want to mock a component, we can use the `mockComponent` utility. We can pass in the component name, and then a function where we define our component. 
- we have a few different ways to mock this component. we cab import a `.vue` file, or return an object with a `template` string or a `render` function that defines the component.

### Final Thoughts

- still very early-on, but there's already a huge value-add (I've been using it for a few weeks now)
- I'm excited to see where this goes. And if you're interested, try it out and help contribute to the project and make it something super useful for the community!



