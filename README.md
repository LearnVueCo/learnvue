# LearnVue

Content and a public Nuxt Layer for LearnVue's website and videos.

## How It Works?

The `content` folder is a [Nuxt Layer](https://nuxt.com/docs/getting-started/layers) that is then used by the LearnVue Website (private repo). It contains the Markdown content for the long-form content on the Website.

The `demos` folder contains the source code for the examples used in the tutorials and videos. These apps are deployed to enable the preview embeds on the website.

The `packages` folder contains code that ends up being used in a private repo to create the actual site. 
  - `layers/base` is a Nuxt Layer with some smart defaults specific for LearnVue app
  - `presets/tailwind` is a Tailwind preset with a good base for LearnVue branded content
