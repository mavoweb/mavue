---
id: v-focus
title: v-focus
type: directive
---
{% raw %}
<header>

# `v-focus`

Automatically focus elements when they are inserted

</header>

<main>

This is different than the HTML [`autofocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus)
attribute which focuses elements on page load.


## Examples

Basic usage:
```html
<v-app data='{"list":[""]}'>
	<article v-for="(item, i) in list">
		<input v-model="list[i]" @keyup.enter="list.push('')" v-focus>
	</article>

	<button @click="list.push('')">Add item</button>
</v-app>
```

{% endraw %}
