---
id: v-app
title: <v-app>
hasCSS: true
---
{% raw %}
<header>

# `<v-app>`

Make simple Vue apps by writing HTML

</header>

<main>

## Features

- Automatically fetches Vue for you
- `element.app` to access the app instance from JS


## Limitations

- Attribute `data` only sets the initial data and never gets updated. `element.data` only contains the initial data.

## Examples

Basic, no data (data default to `{}`):

```html
<v-app>
	{{ 1 + 2 }}
</v-app>
```

With data (provided as a JSON string):

```html
<v-app data='{"foo": 2}'>
	<input type="number" v-model="foo" />
	sqrt({{ foo }}) = {{ Math.sqrt(foo) }}
</v-app>
```

Invalid data (unquoted property name):

```html
<v-app data='{foo: 2}'>
	<input type="number" v-model="foo" />
	sqrt({{ foo }}) = {{ Math.sqrt(foo) }}
</v-app>
```

Lists:

```html
<v-app data='{"list":[{"foo": 1}]}'>
	<article v-for="item in list">
		<input v-model="item.foo"> {{ item.foo }}
	</article>
	<button @click="list.push({foo: list.length + 1})">Add item</button>
</v-app>
```

## Customization

Custom methods:

```html
<v-app id="sum_demo" data='{"list":[]}'>
	Sum: {{ sum(list) }}
	<span v-for="(n, i) in list">
		<input v-model="list[i]" />
	</span>

	<button @click="list.push(list.length)">Add number</button>
</v-app>
<script>
	// or document.querySelector("#sum_demo").methods = ...
	sum_demo.methods = {
		sum (numbers) {
			return numbers.reduce((a, c) => a + +c, 0);
		}
	}
</script>
```

or, alternatively, to make the `sum()` function available on *all* `<v-app>` instances:

```js
// or import { VApp } from "https://mavue.mavo.io/mavue.js" if you're using all of MaVue
import VApp from "https://mavue.mavo.io/v-app/v-app.js";

VApp.methods = {
	sum (numbers) {
		return numbers.reduce((a, c) => a + +c, 0);
	}
}
```

Please note this will not affect any `<v-app>` instances *already* created.

You could also add computed properties, e.g. to compute things or expose specific globals to your Vue app:

```html
<v-app id="url_demo" data='{"relative": "../v-default/", "base": ""}'>
	<label>Relative URL: <input v-model="relative" /></span>
	<label>Base: <input v-model="base" /></span>
	<output v-if="!/\w+:/.test(base)">
		Resolved base: <a :href="absoluteBase">{{ absoluteBase }}</a>
	</output>
	<output>
		Result: <a :href="new URL(relative, absoluteBase)">{{ new URL(relative, absoluteBase) }}</a>
	</output>
</v-app>
<script>
	// or document.querySelector("#url_demo").computed = ...
	url_demo.computed = {
		absoluteBase () {
			return new URL(this.base, location);
		},
		URL () {
			return URL;
		}
	}
</script>
```
<style>
#url_demo {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: .5em 1em;
	border: 1px solid hsl(220 10% 90%);
	background:hsl(220 10% 98%);
	padding: .5em;
	margin: 1em 0;
}

	#url_demo label,
	#url_demo output {
		display: contents;
	}

	#url_demo a {
		font-weight: bold;
	}

</style>

In the same way you can also add `directives` or `components` to either a `<v-app>` instance
or all `<v-app>` instances.

</main>
{% endraw %}