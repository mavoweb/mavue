---
id: v-default
title: v-default
---
{% raw %}
<header>

# `v-default`

Default values for `v-model`

</header>

<main>

## Limitations

- `v-model` **must** be the first directive in the element for this to work


## Examples

All examples below use [`<v-app>`](../v-app) as well, for clarity,
but the `v-default` directive does not require [`<v-app>`](../v-app).

Basic usage:

```html
<v-app>
	<input v-model="foo" v-default="3">
</v-app>
```

Its value can be an expression, and updates reactively:

```html
<v-app data='{"name": "Jane Doe"}'>
	<label>Name: <input v-model="name" /></label>
	<label>URL: mavue/mavo.io/<input v-model="slug"
	v-default="name?.toLowerCase().replace(/[^\w\s]+/g, '').replace(/\s+/g, '-')" /></label>
</v-app>
```

Even cycles are not a problem!

```html
<v-app data='{"foo": 1, "bar": 1}'>
	<label>rx = <input type=number v-model="foo" v-default="bar"></label>
	<label>ry = <input type=number v-model="bar" v-default="foo"></label>
</v-app>
```

`v-default` is primarily useful for collections:

```html
<v-app data='{"list":[{"foo": 1}]}'>
	<article v-for="(item, i) in list">
		<input v-model="item.foo" v-default="i + 1"> {{ item.foo }}
	</article>
	<button @click="list.push({})">Add item</button>
</v-app>
```

Different form elements:

```html
<v-app>
	<input type=date v-model="date" v-default="'2019-07-02'">
	<select v-model="select" v-default="'b'">
		<option>a</option>
		<option>b</option>
		<option>c</option>
	</select>
	<textarea v-model="textarea" v-default="'Some text'"></textarea>
	<input type="checkbox" v-model="checkbox" v-default="true">
	<input type="radio" name="radio" value="a" v-model="radio">
	<input type="radio" name="radio" value="b" v-model="radio" v-default>
</v-app>
```

{% endraw %}
