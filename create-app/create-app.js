import { Vue, mixin } from "../src/index.js";

/**
 * Create and mount a Vue app
 * @param {Object} spec
 * @param {Element} [spec.element] The element to mount the app on. Defaults to `"#app"`
 * @param {Element} [element] The element to mount the app on.
*/
export default function createApp(spec, element = spec.element) {
	spec.mixins ??= [];
	spec.mixins.push(mixin);

	if (typeof spec.data !== "function") {
		let data = spec.data;
		spec.data = () => data;
	}

	let app = Vue.createApp(spec);

	if (!element && element !== false && typeof document !== "undefined") {
		// If there’s an element with id "app"…
		let candidate = document.getElementById("app");

		// That is not already a Vue app…
		if (!candidate.__vue_app__) {
			// …use that
			element = candidate;
		}
	}

	if (!element) {
		if (element !== false) {
			console.warn("[MaVue.createApp] No element to mount app on. Call .mount() on the result of createApp() or pass in an element parameter. Set element: false to mute this warning.");
		}

		return app;
	}

	return app.mount(element);
}

export { Vue, mixin };