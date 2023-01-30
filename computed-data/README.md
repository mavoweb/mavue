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

Simple example (just data loading):

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

</main>

{% endraw %}
