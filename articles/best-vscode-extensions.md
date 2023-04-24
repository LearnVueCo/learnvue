---
author: Matt Maribojoc
title: The Best VS Code Extensions For Vue Developers
snippet: The right VS Code Extensions can make your life so much easier - they help with formatting scalability and automating simple tasks in your workflows.
publishedDate: 2021/01/06
tags: ide,tips,top tools,VS Code,vue
slug: the-7-best-vs-code-extensions-for-vue-developers
category: Tools and Libraries
cover: articles/best-vscode-extensions
---
Adding the right VS Code Extensions to Visual Studio can make your life as a developer so much easier.

They can help with formatting, scalability, enforcing best practices, and so automate so many of the forgettable tasks in our dev process. They can also just be fun extensions that make our code look prettier / easier to write.

As a Vue enthusiast, I’ve spent time looking for the best VS Code Extensions for Vue developers. Here are some of the ones that have made my life so much simpler.

## Essential Extensions

Here are some of the plugins that I believe are essential for Vue development.



### [Volar](https://github.com/johnsoncodehk/volar)

If you only download one VS Code extension from this list, it has to be Volar.

It provides Vue specific syntax highlighting, snippets for common snippets, and so much more that every Vue developer needs.

Volar adds high-performance tooling for Vue language support and comes ready to handle type checks!

Volar is very well maintained – it even comes with [Vue 3](https://learnvue.co/2020/12/setting-up-your-first-vue3-project-vue-3-0-release/) TypeScript support.

There’s not really too much else to say about Volar – just get it. It’ll make your development so much better.

Volar is made by [Johnson Chu](https://twitter.com/johnsoncodehk) - so give him a follow!

::warning
If you have Vetur (the old Vue tooling) installed, make sure to disable it after installing Volar.
::

[Check out Volar](https://github.com/johnsoncodehk/volar){.mt-4.px-4.py-2.bg-green.text-white.rounded}

### [ESLint Plugin Vue](https://eslint.vuejs.org/)

Most developers are familiar with ESLint – one of the most popular linter tools that helps keep your code consistent with best practices and readable across large codebases.

Vue has its own ESLint Plugin to check the syntax of single file components. I think it’s one of the best tools for writing maintainable and scalable code.

There’s nothing worse than looking at some old code and not even knowing where to start debugging it.

No worries!

ESLint can help you stay organized, and with increasing support for Vue 3, you’ll be writing scalable Vue projects.

[ESLint Plugin Vue](https://eslint.vuejs.org/){.mt-4.px-4.py-2.bg-green.text-white.rounded}

### [Prettier](<https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-VS> Code)

People often get ESLint and Prettier mixed up, but while ESLint is a linter, Prettier is a formatter.

This means that Prettier makes sure your code is all consistently formatted (semi-colons, trailing commas, indents, etc) but does not throw errors for code quality errors like ESLint (like `no-unused-vars`).

So if you want to enforce a strict formatting structure to your project, add VS Code and a `prettierrc` file to start declaring your rules!

[Prettier](<https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-VS> Code){.mt-4.px-4.py-2.bg-green.text-white.rounded}

## Quality of Life Extensions

The thing I like about Vue is you don't __need__ tons of plugins to get up and running. The rest of this list is entirely optional based on your preferences.

### [CoPilot](https://copilot.github.com/)

GitHub Pilot gives you suggestions for code from an AI model that has analyzed billions of lines of publice code.

I was skeptical of CoPilot at first, but it has been suprisingly useful for writing simple helper functions. It's able to pick up well on Vue 3's `.value` syntax and saves a bunch of time writing redundant conditionals.

[Try CoPilot](https://copilot.github.com/){.mt-4.px-4.py-2.bg-green.text-white.rounded}

### [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

GitLens by GitKraken "supercharges Git inside VS Code". It brings several features:

- visual file history view
- inline blame with links to each commit
- Git CodeLens and more...

![GitLens Current Line Blame](https://raw.githubusercontent.com/gitkraken/vscode-gitlens/main/images/docs/current-line-blame.png)

While this is essential when you're working in teams, I use it in personal projects as well. Knowing when I wrote a line and being able to quickly access the specific commit helps provide context as to _why_ I wrote a certain line or what functionality it's tied to.

[Try GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens){.mt-4.px-4.py-2.bg-green.text-white.rounded}

## Some VS Code Settings

### Active Indent Highlights

Especially working with larger templates, it can get hard to track which divs are matching. While there are many bracket pair colorizers - I prefer having my theme handle all the coloring.

A subtle way to get all the functionality is by changing the color of the indent stroke.  

This will create a more clearly defined line between the opening and closing tags of your DOM element, conditional statement, and anything else that causes different indent levels.

I like having the active section have a light color that stands out, without being distracting.

To get this, we have to change some of our VS Code settings by `cmd + p` > `Preferences: Open Settings (JSON)`

```json [settings.json]
{
  "workbench.colorCustomizations": {
    "tree.indentGuidesStroke": "#f8f8f2",
    "editorIndentGuide.activeBackground": "#f8f8f2",
    "editorIndentGuide.background": "#44475a"
  }
}
```

## Conclusion

Overall, there are so many VS Code Extensions out there for Vue Developers.

While many on this list may seem insignificant at first, these small changes can save you hours and hours of development time. I definitely recommend at least trying out all of them. Who knows – you might fall in love with some of them.

If there’s any other VS Code Extensions you think deserve to be on this list – let me know!
