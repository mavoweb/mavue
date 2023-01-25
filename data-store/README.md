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

Simple example (just data loading):

```html
<v-app data='{"cats": []}'>
	<data-store :data="cats" src="https://github.com/leaverou/mv-data/cats2.json"></data-store>

	<article v-for="cat in cats">
		{{ cat.name }} is {{ cat.age }} years old
	</article>
</v-app>
```

Example with auth and storage:

```html
<v-app data='{"cats": []}'>
	<data-store :data="cats" src="https://github.com/leaverou/mv-data/cats2.json"></data-store>

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

</main>

{% endraw %}
