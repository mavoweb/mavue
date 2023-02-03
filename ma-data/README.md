---
id: ma-data
title: <ma-data>
type: component
---
{% raw %}
<header>

# `<ma-data>`

Authentication, data loading & storing, uploads, on a variety of cloud services.
Thin wrapper over the [Madata](https://madata.dev) [Vue component](https://madata.dev/components/vue/).

</header>

<main>

## Limitations

- You **must** declare the property and set it to an object or array through `data()` (if manually creating a Vue app)
or the `data` attribute (if using [`v-app`](../v-app/)).
- You must never overwrite the object you passed through `v-model` with another object.
`<ma-data>` relies on having a reference to it that doesn't change.

## Examples

Simple example (just data loading):

```html
<v-app data='{"cats": []}'>
	<ma-data v-model="cats" src="https://github.com/leaverou/mv-data/cats2.json"></ma-data>

	<article v-for="cat in cats">
		{{ cat.name }} is {{ cat.age }} years old
	</article>
</v-app>
```

For more examples and documentation, look at the [Madata Vue component](https://madata.dev/components/vue/) page.


</main>

{% endraw %}
