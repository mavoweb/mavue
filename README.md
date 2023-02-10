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

**Here be dragons** MaVue has not yet been officially released,
nor is the list of helpers below complete.
It is very much a work in progress.
Please try it out, and [open issues](https://github.com/mavoweb/mavue/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) as you find them!

</div>

## MaVue helpers

### Current

- [`<v-app>`](./v-app/): Make Vue apps by writing HTML
- [`<ma-data>`](./ma-data/): Data storage and authentication, using [Madata](https://madata.dev)
- [`<set-data>`](./set-data/): Name expressions and use the result in other expressions
- [`v-default`](./v-default/): Provide default values for `v-model`
- [`v-focus`](./v-focus/): Focus elements when they are inserted
- [Functions](./functions/): A set of helper functions convenient in developing small data-driven applications

### Future work

- `<v-editable>` to make editable elements bound to data
- `<v-list>` to easily generate UI for editable lists of data, with drag & drop and controls to add, duplicate, or delete items

{% raw %}
<h2 id="installation">Installation</h2>

### Zero hassle, no control

To import all of MaVue and use it with the [`<v-app>`](./v-app/) custom element, all you need is this somewhere in your HTML:

```html
<script src="https://mavue.mavo.io/mavue.js" type="module"></script>
```

This imports every MaVue helper and adds it to `<v-app>`.

### Minimal hassle, some control

To easily create (Ma)Vue apps in JS, you can import `createApp(spec, element)` and use it instead of [Vue’s `createApp()`](https://vuejs.org/guide/essentials/application.html)
which automatically includes all MaVue helpers.

In addition to calling Vue’s `createApp()` and adding all the MaVue helpers, it also:
- allows you to provide the initial data as an object, which can be helpful if you only need to provide static data
- calls [`.mount()`](https://vuejs.org/guide/essentials/application.html#mounting-the-app) for you and returns the Vue instance.

```html
<div id="app">
	<input type=number v-model=foo> + 1 = {{ foo + 1 }}
</div>
<script type="module">
import { createApp } from "https://mavue.mavo.io/mavue.js";

let app = createApp({
	data: {
		foo: 1
	}
}, "#app");
</script>
```

### Some hassle, more control

You can also import all of MaVue on Vue apps you create in your JS, as a mixin,
so you can use it with your own version of Vue

```js
import { createApp } from "vue";
import { mixin } from "https://mavue.mavo.io/mavue.js";

let app = createApp({
	// ...
}).mount("#app");
```

### More hassle, total control

If you only need a few helpers, you can import them individually,
following the instructions on their individual pages.

{% endraw %}

</main>
