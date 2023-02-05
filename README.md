<header>

<h1>MaVue: Easier Vue apps <small>inspired by Mavo</small></h1>

Vue.js is a great framework: it's blazing fast, and has a large community around it.
However, it requires a fair bit of JS knowledge to use.
Even for folks with that, certain things can be cumbersome and repetitive to implement.

MaVue is a modular collection of Vue helpers (directives, Vue components and Web components)
designed to make developing Vue.js apps
faster and approachable to a wider audience.
They can be used all together, or separately.

It is inspired by [Mavo](https://mavo.io), our earlier project for developing entire web apps by writing HTML.
We noticed that several of Mavo's individual functionalities were desirable for developers,
but Mavo is all-or-nothing and cannot easily be used in conjunction with another framework.
Furthermore, Mavo was designed primarily for novices, and its JS API was not as smooth as a JS-first framework.
With MaVue, we want to bridge this gap, and offer developers of all skill levels the best of both worlds.

</header>

<main>

<div class="warning">

**Here be dragons** Madata has not yet been officially released,
nor is the list of helpers below complete.
It is very much a work in progress.
Please try it out, and [open issues](https://github.com/mavoweb/mavue/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) as you find them!

</div>

## MaVue helpers

### Current

- [`<v-app>`](./v-app/): Make Vue apps by writing HTML
- [`<ma-data>`](./ma-data/): Data storage and authentication, using [Madata](https://madata.dev)
- [`v-default`](./v-default/): Provide default values for `v-model`
- [`<set-data>`](./set-data/): Name expressions and use the result in other expressions

### Future work

- `<v-editable>` to make editable elements bound to data
- `<v-list>` to easily generate UI for lists, with drag & drop and controls to add, duplicate, or delete items

</main>