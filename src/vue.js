// import * as Vue from "https://unpkg.com/vue@3/dist/vue.esm-browser.js", "https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js"
import { delay } from "./util.js";
// let Vue;

let Vue = await import("https://unpkg.com/vue@3/dist/vue.esm-browser.js", {
	fallbacks: ["https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js"]
});
console.log(Vue);

// Try two different CDNs, in case one is down
let CDNs = [
	"https://unpkg.com/vue@3/dist/vue.esm-browser2.js",
	"https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js",
]

export async function setVue(vue) {
	if (vue instanceof Promise) {
		vue = await vue;
	}

	return Vue = vue;
}

export async function getVue() {
	if (Vue) {
		return Vue;
	}

	// Vue not provided, we load it from a CDN
	// We first try unpkg, and if it has not loaded within 500ms, we try jsdelivr as well
	// Whichever loads first is returned

	let abortController = new AbortController();
	let vue, vue2;

	try {
		vue = import(CDNs[0]);
	} catch (e) { console.log("hi", e)}

	try {
		vue2 = delay(500, { signal: abortController.signal }).then(() => import(CDNs[1]));
	} catch (e) {}

	vue.then(v => abortController.abort());



	return Promise.race([ vue, vue2 ]);
}