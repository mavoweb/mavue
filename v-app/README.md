---
id: v-app
title: <v-app>
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

Lists:

```html
<v-app data='{"list":[{"foo": 1}]}'>
	<article v-for="item in list">
		<input v-model="item.foo"> {{ item.foo }}
	</article>
	<button @click="list.push({foo: list.length + 1})">Add item</button>
</v-app>
```


## Installation

Just include the corresponding JS file and you're good:

```html
<script src="https://mavue.mavo.io/v-app/v-app.js" type="module"></script>
```

Import this before any other MaVue directives, and they will be automatically available on any `<v-app>` apps.

</main>
{% endraw %}