![lv-background-thin](https://user-images.githubusercontent.com/18535681/235318736-ba629f89-0e65-41bd-92b4-2891551d3e1e.png)

# LearnVue

Content and a public Nuxt Layer for LearnVue's website and videos.

## How It Works?

The `content` folder contains content that is used by the LearnVue Website (private rep for not). It contains the Markdown content for the long-form articles on the website.

The `demos` folder contains the source code for the examples used in the tutorials and videos. These apps are deployed to Vercel to enable the preview embeds on the website.

The long term goal for the `demos` folder is to have each article/video have a corresponding folder with the source code for the example. This will allow for the website to have a "Try It Yourself" button that will open the example in your own browser.

## Creating a New Demo

To create a new demo, there are several starting points in the `intternals/_templates` folder. These are projects with same defaults that will likely be across many demos.

You can easily create a new demo project by running `pnpm demo:create` and following the prompts.