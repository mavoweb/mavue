---
id: functions
title: MaVue Helper Functions
type: functions
---
{% raw %}
<header>

# MaVue Functions

A bunch of convenient helper functions for working with data

</header>

<main>

## The functions

### iff(test, iftrue [, iffalse])

More readable than a ternary, and the third optional argument defaults to `""` which is helpful for output.

```html
<v-app data='{"test": false}'>
	<input type="checkbox" v-model="test">
	{{ iff(test, "checked!") }}
</v-app>
```

### get(object, propertyPath)

Get a deeply nested property path without `map()` etc.
Will always return a flat array of values, not nested arrays etc.
Forgiving: if any part doesn't exist, it just returns null.

```html
<v-app data='{
	"list": {
		"bar": [
			{"foo": 1},
			{"foo": 2},
			{"foo": 3}
		]
	}
}'>
	{{ get(list, "bar.*.foo") }}
	<button @click="list.bar.push({foo: list.bar.length + 1})">Add more</button>
</v-app>
```

### sum(...numbers)

Sum one or more arrays of numbers

```html
<v-app data='{
	"list": [1, 2, 3]
}'>
	{{ list.join(" + ") }} = {{ sum(list) }}
	<button @click="list.push(list.length + 1)">Add more</button>
</v-app>
```

### count(...values)

Count truthy values in one or more arrays

```html
<v-app data='{
	"list": [0, "", "hello", true, false]
}'>
	{{ count(list) }} values
	<div v-for="(item, i) in list">
		<input v-model="list[i]">
	</div>
	<button @click="list.push(list.length + 1)">Add more</button>
</v-app>
```

</main>

{% endraw %}
