---
id: create-app
title: createApp()
---

<header>

# `createApp()`

Create Vue apps with less JS

</header>

<main>

## Features

- API largely compatible with [Vue’s `createApp()`](https://vuejs.org/guide/essentials/application.html)
- Automatically fetches Vue for you
- Automatically imports all MaVue helpers
- Initialize & mount your app with less (or no!) code
- If using [`<set-data>`](../set-data/) as well, it automatically makes root-level properties reactive even if you do not initialize them (requires `data` to be an object, see below)

## Other differences from Vue’s `createApp()`

- **`data`**: Value can be an object, which can be helpful if you only need to provide static data.
The `data` key can even be missing, in which case it defaults to an empty object (`{}`).
- **`element`**: Specify the element to [mount](https://vuejs.org/guide/essentials/application.html#mounting-the-app) the app on.
If not provided, it defaults to `#app` if there is an element with `id="app"` on the page which doesn’t *already* have a Vue app mounted on it.
Use `element: false` to disable.
- **`expose`**: Quickly expose globals and other variables

{% raw %}

## Examples

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
});
</script>
```

Using `element` and `expose` options:

```html
<div id="app2">
	<button @click="alert(foo++)">alert(foo++)</button>
	<button @click="console.log(foo--)">console.log(foo--)</button>
	{{ math.round(foo * 10 / 3)/10 }}
</div>
<script type="module">
import { createApp } from "https://mavue.mavo.io/mavue.js";

let app = createApp({
	element: "#app2",
	data: {
		foo: 1
	},
	expose: {console, alert, math: Math}
});
</script>
```

Note: Any functions you expose will be bound to the global scope.
If that is not desirable, you can `.bind()` it yourself to a different context.

## Installation

You can import `createApp()` either from the main MaVue file, or from the `create-app` subdirectory.

```js
// Named import
import { createApp } from "https://mavue.mavo.io/mavue.js";
```

```js
// Notice here it's a default import
import createApp from "https://mavue.mavo.io/create-app/index.js";
```

{% endraw %}

</main>

