import * as Vue from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

class VApp extends HTMLElement {
	constructor() {
		super();

		this.attributeChangedCallback();

		let data = this.data ?? {};

		this.app = Vue.createApp({
			data() {
				return data;
			},

			computed: this.computed,
			methods: Object.assign(this.methods ?? {}, VApp.methods),

			directives: Object.assign({}, this.directives, VApp.directives),
			components: Object.assign({}, this.components, VApp.components),
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

	/**
	 * Directives for every <v-app> instance
	 * Imported MaVue directives will be auto-added here
	 * but you can also add third-party directives
	 */
	static directives = {};

	/**
	 * Components for every <v-app> instance
	 * Imported MaVue components will be auto-added here
	 * but you can also add third-party components
	 */
	static components = {}

	/**
	 * Methods for every <v-app> instance
	 */
	static methods = {}

	static register() {
		if (this.registered) {
			return;
		}

		this.registered = true;

		if (!customElements.get("v-app")) {
			customElements.define("v-app", VApp);
		}
	}
}

async function ready() {
	if (document.readyState === "complete") {
		return true;
	}
	else {
		return new Promise(resolve => document.addEventListener("DOMContentLoaded", resolve));
	}
}

// Failsafe
ready().then(() => VApp.register());

export default VApp;
globalThis.VApp = VApp;

export {Vue};