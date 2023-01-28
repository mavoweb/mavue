---
id: data-store
title: data-store
type: component
---
{% raw %}
<header>

# `data-store`

Authentication, data loading & storing, uploads, on a variety of cloud services.
Powered by [Madata](https://madata.dev)

</header>

<main>

## Limitations

- You **must** declare the property and set it to an object or array through `data()` (if manually creating a Vue app)
or the `data` attribute (if using [`v-app`](../v-app/)).
- You must never overwrite the object you passed through `:data` with another object.
`<data-store>` relies on having a reference to it that doesn't change.

## Examples

Simple example (just data loading):

```html
<v-app data='{"cats": []}'>
	<data-store v-model="cats" src="https://github.com/leaverou/mv-data/cats2.json"></data-store>

	<article v-for="cat in cats">
		{{ cat.name }} is {{ cat.age }} years old
	</article>
</v-app>
```

Example with local storage:

```html
<v-app data='{"info": {"name": "Lea Verou"}}'>
	<data-store v-model="info" src="local:profile"></data-store>

	<label>Name: <input v-model="info.name"></label>
	<button @click="info.save()">Update</button>
</v-app>
```

Example with auth and storage:

```html
<v-app data='{"cats": []}'>
	<data-store v-model="cats" src="https://github.com/leaverou/mv-data/cats2.json"></data-store>

	<p>{{ cats?.inProgress }}</p>
	<button @click="cats.login()">Login</button>
	<div mv-if="cats.user">
		Logged in as {{ cats.user?.username }}
		<button @click="cats.save()">Save</button>
		<button @click="cats.logout()">Logout</button>
	</div>

	<article v-for="cat in cats">
		<input v-model="cat.name">
		is
		<input type="number" v-model="cat.age">
		years old
	</article>
</v-app>
```

## Autosave

Autosave calls `save()` when data changes.
It can either be a time string like `"3s"`, `"500ms"`,
or a boolean (the attribute simply being present sets it to `true`).

Example (using element storage so you can see the data):

```html
<v-app data='{"countries": []}'>
	<data-store v-model="countries" src="#data-countries" autosave="2s"></data-store>

	<article v-for="country in countries">
		<label><input v-model="country.code" /></label>
		<label><input v-model="country.name" /></label>
	</article>
	<button @click="countries.push({})">Add country</button>
</v-app>
<pre id="data-countries">
[
	{
		"code": "us",
		"name": "United States"
	},
	{
		"code": "gb",
		"name": "United Kingdom"
	}
]
</pre>
```

Avoid enabling autosave when you have a lot of data, as it can slow things down quite a lot!
In those cases, you might be better off just using [event delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation)
(monitoring `input` and `change` events at the root and saving then).

</main>

{% endraw %}
