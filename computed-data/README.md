---
id: computed-data
title: <computed-data>
type: component
---
{% raw %}
<header>

# `<computed-data>`

Name expressions and use the result in other expressions, all from HTML!

</header>

<main>

## Examples

Simple example, showing both a root-level property, and one scoped to a list item:

```html
<v-app data='{"cats": [
	{ "name": "Adam Catlace", "age": 4 },
	{ "name": "Alan Purring", "age": 7 },
	{ "name": "Vector", "age": 12 }
]}'>
	<computed-data name="count" :value="cats.length"></computed-data>
	cats ({{ count }})
	<article v-for="cat in cats">
		{{ cat.name }}
		is <input v-model="cat.age" type="number"> years old.
		They will be <computed-data name="next" :on="cat" :value="cat.age + 1"></computed-data>
		next year, and {{ cat.next + 1 }} the year after
	</article>
	<button @click="cats.push({})">Add cat</button>
</v-app>
```

By default, the value will be included as contents (if it's a primitive value (string, number, boolean)),
but you can customize how (or even if) it’s displayed:

```html
<v-app data='{"c": 25}'>
	<input v-model="c" type="number" /> ℃ =
	<computed-data name="f" :value="c * 1.8 + 32">{{ +f.toFixed(2) }} ℉</computed-data>
</v-app>
```


</main>

{% endraw %}
