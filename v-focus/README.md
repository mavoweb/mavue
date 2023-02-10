---
id: v-focus
title: v-focus
type: directive
---
{% raw %}
<header>

# `v-focus`

Automatically focus elements when they are inserted or when data changes

</header>

<main>

This is different than the HTML [`autofocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus)
attribute which focuses elements on page load.


## Examples

Basic usage, element is focused when inserted:

```html
<v-app data='{"list":[""]}'>
	<article v-for="(item, i) in list">
		<input v-model="list[i]" @keyup.enter="list.push('')" v-focus>
	</article>

	<button @click="list.push('')">Add item</button>
</v-app>
```

Focus element based on data:

```html
<v-app data='{"list":[{}]}'>
	<article v-for="(item, i) in list">
		<input v-model="item.text" v-focus="item.active"
		       @keyup.enter="list.push({active: true})">
		<button @click="list.splice(i, 1); list[i-1].active = true">x</button>
	</article>

	<button @click="list.push({active: true})">Add item</button>
</v-app>
```

{% endraw %}
