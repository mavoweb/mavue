import * as Vue from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

export default class VApp extends HTMLElement {
	constructor() {
		super();

		this.attributeChangedCallback();

		let data = this.data ?? {};

		this.app = Vue.createApp({
			data() {
				return data;
			},

			directives: Object.assign({}, VApp.directives)
		}).mount(this)
	}

	static observedAttributes = ["data"];

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== undefined && oldValue === newValue) return;

		if (!name || name === "data") {
			try {
				this.data = JSON.parse(this.getAttribute("data"));
				// TODO do something with this.data
			}
			catch (e) {
				console.warn(`Invalid JSON in v-app data attribute: ${e.message}`);
			}
		}
	}

	// Vue instance
	static Vue = Vue;

	// Directives for every <v-app> instance
	// Imported MaVue directives will be auto-added here
	// but you can also add third-party directives
	static directives = {};
}

if (!customElements.get("v-app")) {
	customElements.define("v-app", VApp);
}