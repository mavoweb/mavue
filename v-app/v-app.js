import * as Vue from "https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js";
import { register } from "../src/util.js";

class VApp extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		if (this.app) {
			return;
		}

		try {
			this.data = JSON.parse(this.getAttribute("data"));
		}
		catch (e) {
			console.warn(`Invalid JSON in v-app data attribute: ${e.message}`);
		}

		let data = this.data ?? {};

		// Register computed properties declared through <set-data>
		VApp.components["set-data"]?.fixupRoot(this, data);

		this.data = data;

		let computed = this.computed ?? {};

		if (this.hasAttribute("globals")) {
			this.globals = this.getAttribute("globals").split(/,\s*/);
			Object.assign(computed, Object.fromEntries(this.globals.map(global => {
				let value = () => window[global];

				// Global functions can produce errors if called with a different context
				if (typeof window[global] === "function") {
					value = () => window[global].bind(window);
				}

				return [global, value];
			})));
		}

		this.app = Vue.createApp({
			data() {
				return data;
			},

			computed,
			methods: Object.assign(this.methods ?? {}, VApp.methods),

			directives: Object.assign({}, this.directives, VApp.directives),
			components: Object.assign({}, this.components, VApp.components),
		}).mount(this);
	}

	/**
	 * Directives for this <v-app> instance
	 */
	directives = this.directives ?? {};

	/**
	 * Components for this <v-app> instance
	 */
	components = this.components ?? {};

	/**
	 * Methods for this <v-app> instance
	 */
	methods = this.methods ?? {};

	/**
	 * Computed properties for this <v-app> instance
	 */
	computed = this.computed ?? {};

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

	/**
	 * Computed properties for every <v-app> instance
	 */
	static computed = {}

	static register() {
		if (VApp.registered) {
			return;
		}

		VApp.registered = true;

		if (!customElements.get("v-app")) {
			customElements.define("v-app", VApp);
		}
	}

	static registerHelper (helper) {
		register(VApp, helper);
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