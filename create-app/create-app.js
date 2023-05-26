import { Vue, mixin } from "../src/index.js";
import { fixupRoot as setDataFixupRoot } from "../set-data/set-data.js";

/**
 * Create and mount a Vue app
 * @param {Object} spec
 * @param {Element} [spec.element] The element to mount the app on. Defaults to `"#app"`
 * @param {Element} [element] The element to mount the app on. Deprecated, use `spec.element` instead.
*/
export default function createApp(spec, element = spec.element) {
	spec.mixins ??= [];
	spec.mixins.push(mixin);

	// Figure out root element
	if (!element && element !== false && typeof document !== "undefined") {
		// If there’s an element with id "app"…
		let candidate = document.getElementById("app");

		// That is not already a Vue app…
		if (!candidate.__vue_app__) {
			// …use that
			element = candidate;
		}
	}

	// Wrap data in a function as that's what Vue expects
	if (typeof spec.data !== "function") {
		let data = spec.data;

		if (element) {
			setDataFixupRoot(element, data);
		}

		spec.data = () => data;
	}

	// Any variables to expose?
	if (spec.expose) {
		for (let key in spec.expose) {
			let value = spec.expose[key];

			if (typeof value === "function") {
				spec.methods ??= {};
				// Global functions can produce errors if called with a different context
				// and globalThis is a reasonable default context anyway
				let isConstructor = !!value.prototype && value.prototype.constructor === value;
				spec.methods[key] = isConstructor? value : value.bind(globalThis);
			}
			else {
				spec.computed ??= {};
				spec.computed[key] = () => value;
			}
		}
	}

	let app = Vue.createApp(spec);

	if (!element) {
		if (element !== false) {
			console.warn("[MaVue.createApp] No element to mount app on. Call .mount() on the result of createApp() or pass in an element parameter. Set element: false to mute this warning.");
		}

		return app;
	}

	return app.mount(element);
}

export { Vue, mixin };