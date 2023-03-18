---
author: Matt Maribojoc
title: How To Deploy Your Vue App to GitHub Pages
snippet: GitHub Pages is a great free option to deploy your Vue application. It’s a static site hosting service that takes files straight from a repository on GitHub.
publishedDate: 2020/09/01
tags: deployment,github
videoLink: https://youtube.com/v/yo2bMGnIKE8
category: Tools and Libraries
cover: articles/deploy-vue-to-github-pages
---
GitHub Pages is a great free option to deploy your Vue application. It’s a static site hosting service that takes files straight from a repository on GitHub.

A great part about GitHub Pages is that it’s pretty easy to set up once you know how it works. And that’s what we’re going to do today!

In this tutorial, we’re going to cover:

- The basics of GitHub Pages
- Setting up a Vue project to work with GitHub Pages
- Deploying a Vue project
- Configuring Vue Router in this deployment environment

A lot of these steps are based on [this great article](https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd) by Roland, in combination with some of the tips I found while deploying a Vue 3 demo space.

Alright, let’s jump right in.

## How Does GitHub Pages Work

[GitHub Pages](https://pages.github.com/) allows you to serve static HTML, CSS, and JavaScript files from a GitHub repository. In terms of Vue, it means that once we build our project, we can serve those files as long as we push them to a repo.

One of the easiest ways to do this is to create a separate gh-pages branch on your repository. Our end goal is for this branch to contain just our build folder – which for a lot of projects, will be dist.

And we can do this by using this gh-pages branch as a [subtree](https://gist.github.com/SKempin/b7857a6ff6bddb05717cc17a44091202) of our master branch.

This will make a lot more sense when we do it so let’s go.

## Setting Up Your Project

Alright, first we have to understand where our gh-pages branch will be deployed. A majority of the time, the URL of the deployed site will be _`GITHUB_USERNAME`_.github.io/_`REPO_NAME`_.

This means that all files on our gh-pages branch can be accessed at something like <https://matthewmaribojoc.github.io/learnvue-tutorials/main.css> – for example.

Okay – enough background info. Let’s actually get our project online.

### Step 1. Set publicPath in vue.config.js to our repository name

On the master branch, we want to create a `vue.config.js` file in the root directory of our project. Here, we want to configure the `publicPath` (which also edits the webpack publicPath) to route all static assets to the proper path.

If we don’t have this configuration, our deployed site will not properly load assets such as images.

We want to route it to the URL path of our deployed GitHub Pages site, which we can find in our repository settings.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/how-to-deploy-your-vue-app-to-github-pages-1.png)

We want to take the path found in that red box – anything after github.io – and use it in our `vue.config.js`like this.

```js{}[vue.config.js]
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/REPO_NAME/" : "/",
};
```

Now, when we deploy our site, all the static assets should be loaded from the correct paths.

## Deploying Your Vue Project

With our Vue `publicPath` configured, we can now work on deploying our project.

### Step 2. Build your project using npm build

This step is pretty self explanatory, we actually need to have a dist folder to deploy.

### Step 3. Run git add dist && git commit -m 'adding dist subtree'

This commits our changes to the master branch so that we can create a `dist` subtree in the next step. Make sure that `dist` is not included in your `.gitignore`file!

### Step 4. Run git subtree push --prefix dist origin gh-pages

This step makes gh-pages a subtree of our master branch. The [prefix option](https://gist.github.com/SKempin/b7857a6ff6bddb05717cc17a44091202) specifies the folder that we want for our the subtree. If we take a look at our gh-pages branch, we will see that it is equivalent to being the root of the dist folder.

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/how-to-deploy-your-vue-app-to-github-pages-2.png)

### Step 5. Done

In a few minutes, GitHub Pages should refresh with your newest repository changes, and you should be able to see your Vue project online. Exciting!

![](https://dltqhkoxgn1gx.cloudfront.net/img/posts/how-to-deploy-your-vue-app-to-github-pages-3.png)

## Tip – Handling Vue Router with a Custom 404 Page

One thing, I discovered when trying to set up my GitHub Pages site, is that working with [Vue Router](https://learnvue.co/2020/04/a-first-look-at-vue-router-in-vue3/) gets a little tricky.

If you’re using history mode in Vue router, you’ll notice that if you try to go directly to a page other than / you’ll get a 404 error. This is because GitHub Pages does not automatically redirect all requests to serve index.html.

Luckily, there is an easy little workaround.

All you have to do is duplicate your `index.html` file and name the copy `404.html`.

What this does is make your 404 page serve the same content as your index.html – which means your Vue router will be able to display the right page.

Once you do this, you’re going to have re-run steps 2 to 5 from before, and also you’ll have to wait a few minutes for your site to update with your changes.

## That’s It?

Yup! It’s that simple to get up and running in GitHub Pages. There are several ways to optimize this process such as writing shell scripts to simplify the process or by [configuring CI which the Vue docs](https://cli.vuejs.org/guide/deployment.html#gitlab-pages) go over.

But this is a great place to get started so you can show off your Vue projects to your family and friends!

I’d love to see links to your GitHub Pages! If you have any questions or comments, just drop a reply.

Good luck!
