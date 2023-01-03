import * as Vue from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import vDefault from "../v-default/v-default.js";


export default class VApp extends HTMLElement {
	constructor() {
		super();

		this.attributeChangedCallback();

		let data = this.data ?? {};

		this.app = Vue.createApp({
			data() {
				return data;
			},

			directives: {
				default: vDefault
			}
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
}

customElements.define("v-app", VApp);