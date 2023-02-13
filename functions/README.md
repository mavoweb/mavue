---
id: functions
title: MaVue Helper Functions
type: functions
hasTests: true
---
{% raw %}
<header>

# MaVue Functions

A bunch of convenient helper functions for working with data

</header>

<main>

## The functions

### iff(test, iftrue [, iffalse]) { #iff }

More readable than a ternary, and the third optional argument defaults to `""` which is helpful for output.

```html
<v-app data='{"test": false}'>
	<input type="checkbox" v-model="test">
	{{ iff(test, "checked!") }}
</v-app>
```

### get(object, propertyPath) { #get }

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

* [More `get()` examples](./tests/#get)

### sum(...numbers) { #sum }

Sum one or more arrays of numbers

```html
<v-app data='{
	"list": [1, 2, 3]
}'>
	{{ list.join(" + ") }} = {{ sum(list) }}
	<button @click="list.push(list.length + 1)">Add more</button>
</v-app>
```

* [More `sum()` examples](./tests/#sum)

### count(...values) { #count }

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

* [More `count()` examples](./tests/#count)

### average(...numbers) { #average }
### median(...numbers) { #median }

Calculate the average/median of one or more arrays of numbers.

```html
<v-app data='{
	"list": [1, 2, 30]
}'>
	<p><label>Numbers:
		<input type="number" v-for="(n, i) of list" v-model="list[i]"></label>
		<button @click="list.push(list.length + 1)">Add more</button>
	<p>Average is <strong>{{ average(list) }}</strong>, median is <strong>{{ median(list) }}</strong>

</v-app>
```

* [More `average()` examples](./tests/#average)
* [More `median()` examples](./tests/#median)

### min(...numbers) { #min }
### max(...numbers) { #max }

Calculate the average/median of one or more arrays of numbers.

```html
<v-app data='{
	"list": [-1, 30, 2]
}'>
	<p><label>Numbers:
		<input type="number" v-for="(n, i) of list" v-model="list[i]"></label>
		<button @click="list.push(list.length + 1)">Add more</button>
	<p>Min is <strong>{{ min(list) }}</strong>, max is <strong>{{ max(list) }}</strong>

</v-app>
```

* [More `min()` examples](./tests/#min)
* [More `max()` examples](./tests/#max)

</main>

{% endraw %}
