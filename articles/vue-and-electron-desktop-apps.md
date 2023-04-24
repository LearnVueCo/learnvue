---
author: Matt Maribojoc
title: Building a Vue 3 Desktop App with Vite and Electron
snippet: Let’s a look at how to build a Vue 3 desktop application from your Vite app with Electron - a framework desktop apps with JavaScript.
publishedDate: 2021/05/09
tags: desktop apps,electron,vite,vue 3
slug: build-vue-3-desktop-apps-in-just-5-minutes-vite-electron-quick-start-guide
videoLink: https://youtube.com/v/nD-UJRlG91Q
category: Tools and Libraries
cover: articles/vue-and-electron-desktop-apps
---

In this article, we’re going to be taking a look at how to Vue 3 Desktop Project from a Vite app.

To do this, we’re going to be using [Electron](https://www.electronjs.org/) – one of the most popular frameworks for building cross-platform desktop apps with JavaScript. So many popular apps are using Electron like VS Code, Slack, Twitch, and a ton more.

![Electron Landing Page](/img/articles/vue-and-electron-apps/electron.png)

Let’s first take a quick look at what we’re going to be doing in this tutorial..

![Vite starter app inside of a desktop application](/img/articles/vue-and-electron-apps/demo.png)

So this is just the Vite starter template BUT it’s in its own dedicated app – not in our browser. That’s a super cool step and a necessary one to build your own desktop apps.

Alright – let’s jump right into the code.

## Creating our Basic Vite App

First, let’s make our Vite app. I’m not going to go into too much detail about how Vite works. If you want to learn more about creating your vue project in Vite, check out our youtube video here.

But basically, let’s go to our terminal and run

```bash
npm init @vitejs/app
cd [project-name]
npm install
```

Alright – let’s first try this out just in our browser.

In our terminal, we can just run a plain old `npm run dev`. get our local host url, and load it up.

Here’s the Vite starter template!

![Vite starter app inside of a browser](/img/articles/vue-and-electron-apps/browser.png)

Perfect – now it’s time to add Electron to this setup.

## Adding Electron to Our Vite Project

For this quick start guide, we’re going to be loosely following the [Electron’s own quick start guide](https://www.electronjs.org/docs/tutorial/quick-start) from the official documentation – and tweaking it a little bit to work inside our Vite application.

The first thing we have to do is actually install Electron – so let’s head over to the terminal and do that.

```bash
npm install --save-dev electron
```

Next, let’s take a quick look at the [Electron guide](https://www.electronjs.org/docs/latest/tutorial/quick-start) again.

It says that a simple Electron setup needs a four main files:

- `package.json` – awesome we already have this
- `main.js`
- `preloader.js`
- `index.html`

At first, it may seem like we already have our `main.js` and `index.html`files, but those are the ones we need for Vite **NOT the ones we need for Electron**. The Vite files are used to run our Vite app, we need separate Electron files for our app.

`main.js` will create our desktop application and load in `index.html`, which will have our built Vite app.

## Building our Vite App

So first things first, we have to build our Vite app. And since we’re working with Electron, we have to do a little bit of extra configuration.

We want to make sure that when our project is built, that all of its references to the final javascript and css files actually point to the right paths.

Building our Vite project creates a dist folder with the following structure.

```
- dist
  - assets folder
  - index.html
  - favicon.ico
```

But since our Electron code is in our root directory, we want to set the base for our entire project to be this dist folder. We can do this by using the `path` library and setting the `base` property in our `vite.config.js` file.

```js{}[vite.config.js]
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  base: path.resolve(__dirname, "./dist/"),
  plugins: [vue()],
});
```

Now we can just run `npm run build` in our terminal to create our own dist folder!

Perfect.

## Setting up our Electron main.js

The next step is to create our `main.js` file in our **root directory**.

Once it’s created, we can just copy and paste the code from the [Electron quick start guide](https://www.electronjs.org/docs/tutorial/quick-start#create-the-main-script-file)!

**There’s one change we have to make though.**

Where we’re loading our `index.html`file, all we have to do is change that to `dist/index.html` so we’re using the file inside our `dist` folder.

So the final code inside `main.js`will look like this…

```js{}[main.js]
const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("dist/index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
```

## Making preload.js

Next up, let’s create our `preload.js` file in our root directory and once again, we can use the [quick start code](https://www.electronjs.org/docs/tutorial/quick-start#define-a-preload-script) – but this time we don’t have to change anything.

```js{}[preload.js]
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
```

## Modifying package.json

Alright – almost there, the last thing we have to do is make some changes to our `package.json` file so that we can actually run some of our Electron commands.

First, we have to set the `main` property – by default, Electron will look for an `index.js` file in the root directory to start our app, but since our file is called `main.js`, we just have to define that in our `package.json`

```json{}[package.json]
{
  "name": "vite-electron",
  "version": "0.0.0",
  "main": "main.js"
```

The final thing we have to do is actually make a way to run Electron, so inside the `scripts` section, let’s make a new script called `electron:start` that runs `electron .`

```json{}[package.json]
{
  "name": "vite-electron",
  "version": "0.0.0",
  "main": "main.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview",
    "electron:start": "electron ."
  }
}
```

And that’s all of the code to build our basic Electron app.

All we have to do now is go to our terminal and say `npm run electron:start` and…

![Vite starter app inside of a desktop application](/img/articles/vue-and-electron-apps/demo.png)

We have our desktop app! Amazing 🙂

## And that’s it

Obviously, this is just a quick starter guide to get a basic Electron setup inside of Vite.

If you want to see more Vite + Electron tutorials, let me know in the replies because overall i love to teach what you find interesting. so if enough of you want, maybe ill start a series where we build a large Vue desktop app together.

But until then, happy coding!
