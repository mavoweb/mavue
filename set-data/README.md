---
id: set-data
title: <set-data>
type: component
hasCSS: true
---
{% raw %}
<header>

# `<set-data>`

Name expressions and use the result in other expressions, all from HTML!

</header>

<main>

## Features

- Unlike computed properties, you can use `<set-data>` to set "computed" properties inside `v-for` too

## Limitations

- Root level properties (e.g. `name="foo"` with no `:on`) are not reactive unless you initialize them in your initial data
(the value doesn't matter, you could initialize them to `null` or `undefined`).
If using `<v-app>`, it takes care of this for you.

## Examples

Simple example, showing both a root-level property, and one scoped to a list item:

```html
<v-app data='{"cats": [
	{ "name": "Adam Catlace", "age": 4 },
	{ "name": "Alan Purring", "age": 7 },
	{ "name": "Vector", "age": 12 }
]}'>
	<set-data name="count" :value="cats.length"></set-data>
	cats ({{ count }})
	<article v-for="cat in cats">
		{{ cat.name }}
		is <input v-model="cat.age" type="number"> years old.
		They will be <set-data name="next" :on="cat" :value="cat.age + 1"></set-data>
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
	<set-data name="f" :value="c * 1.8 + 32">{{ +f.toFixed(2) }} ℉</set-data>
</v-app>
```

If you only need `<set-data>` to set initial data, you can use the `once` attribute:

```html
<v-app id="dates_demo" data='{"dates": []}'>
	Started on <set-data name="start" :value="Date.now()" once>{{ new Date(start) + '' }}</set-data>
	<article v-for="date in dates">
		<set-data :on="date" name="time" :value="Date.now()" once></set-data>
			({{ date.time - start }} ms elapsed)
	</article>
	<button @click="dates.push({})">Add time</button>
</v-app>
<script>
dates_demo.computed = {
	globalThis() {
		return globalThis;
	}
}
</script>
```

Note that using the `once` attribute does not prevent you from manually setting the data to another value later.

`<set-data>` works with `v-if` and `v-else` too,
allowing you to set data conditionally:

```html
<v-app data='{"checked": true, "if_checked_1": null}'>
	<input type="checkbox" v-model="checked">
	<set-data name="if_checked_1" value="1" v-if="checked"></set-data>
	<set-data name="if_checked_1" value="2" v-else></set-data>
	<mark>{{ if_checked_1 }}</mark>
</v-app>
```

## ⚠️ Order of operations

While `<set-data>` is primarily useful for computing expressions,
it can sometimes be useful for static values.

However, beware that you cannot depend on it running before other code,
e.g. this produces an error when you click "Add window" due to `win.size` not existing in time:

```html
<v-app id="win_size" data='{"windows": []}'>
	<article v-for="win in windows">
		<!-- This does not work as you'd expect -->
		<set-data name="size" :on="win" :value="{width: 0, height: 0}" once></set-data>

		<input type="number" v-model="win.size.width" />
		&times;
		<input type="number" v-model="win.size.height" />
	</article>
	<button @click="windows.push({})">Add window</button>
</v-app>
```

<div class="warning">

Do *not* depend on `<set-data>`’s assignment happening before other parts of your code.

</div>


<div class="warning">

Do *not* use large objects in `:value`, as it can be quite slow.

</div>

</main>

{% endraw %}
