# lore-forms

[![Build Status][circle-image]][circle-url] [![Slack Status][slackin-image]][slackin-url]


Libraries and Hooks for [Lore](https://github.com/lore/lore) that simplify the process of creating Forms and Dialogs.


> ### Work in Progress!
> This repo is a work in-progress. It's currently "settling" but still a bit volatile. I recommend you ignore it for now.  

### Purpose

Forms and dialogs are a core component in most applications that allow users to enter data. Lore's primary mission is
simplify every aspect of front-end web application development that isn't connected to component creation, user flows 
and branding.

In practice, the framework greatly simplifies the process of communicating with APIs and caching data, but the creation
of forms and dialogs is still a comparatively slow and fragile process.

This repo is intended to house a set of React-centric libraries that make it simple to build and manage complex forms,
as well as hooks that are specific to Lore that remove the boilerplate associated with form and dialog creation.

### Documentation

There is not currently any documentation for this repo outside of the in-flux examples.

### Discussion
If you have any questions, feel free to [create an issue](https://github.com/lore/lore-forms/issues/new). If you'd rather discuss over chat, there is a [Lore Slack Team](https://lorejs.slack.com) which you can join [using this link][slackin-url].


### Near-term Focus

Since Lore Forms is still in active development, I'm going to list the things that have immediate focus here.

1. [[done-ish](https://github.com/lore/lore/commit/a2bf5ad7fa817f396df1978d02b61d8bb285a6c7), needs polish] Create `lore-react-forms` library for generic form components
2. [[done-ish](https://github.com/lore/lore/commit/fd9d23ad91d19801b748613620bae94784c3c3a2), needs polish] Create `lore-react-forms-bootstrap`, an implementation of `lore-react-forms` with Bootstrap components
3. [[done-ish](https://github.com/lore/lore/commit/d37145ae94586a703b67819dcffdf7ad9f837cb1), needs polish] Create `lore-react-forms-material-ui`, an implementation of `lore-react-forms` with Material UI components
4. [[done-ish](https://github.com/lore/lore/commit/931f35dc42b97c2ec4c0dca59fcc67f73c437157), needs polish] Create `lore-hook-forms-bootstrap`, a hook to automatically generate Bootstrap forms based on a model config
5. [[done-ish](https://github.com/lore/lore/commit/96f7892dc551caa38244bf3b955a67c76cf7d6c3), needs polish] Create `lore-hook-forms-material-ui`, a hook to automatically generate Material UI forms based on a model config
6. [[done-ish](https://github.com/lore/lore/commit/edf9b79c55d2e9108ed3a3ffe4bba1e90898370c), needs polish] Create `examples/forms-bootstrap` to demonstrate usage of `lore-react-forms`, `lore-react-forms-bootstrap`, and `lore-hook-forms-bootstrap`
7. [[done-ish](https://github.com/lore/lore/commit/3507a0b259a570760e895cc4fc4a73af4da9eecf), needs polish] Create `examples/forms-material-ui` to demonstrate usage of `lore-react-forms`, `lore-react-forms-material-ui`, and `lore-hook-forms-material-ui`
8. Refactor `lore-hook-dialogs-bootstrap` and `lore-hook-dialogs-material-ui` to consume their respective `lore-react-forms-*` library to support complex field creation, validation, and more flexible dialogs (like wizards)
9. Publish lore-forms


### Thanks
Todo. 


[circle-url]: https://circleci.com/gh/lore/lore-forms
[circle-image]: https://circleci.com/gh/lore/lore.svg?style=shield&circle-token=6ef9571387d0e08d802f6769026fcf91fc30459f
[slackin-image]: https://lorejs-slack.herokuapp.com/badge.svg
[slackin-url]: https://lorejs-slack.herokuapp.com
