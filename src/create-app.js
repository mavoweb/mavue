import { Vue, mixin } from "./index.js";

export default function createApp(spec, element) {
	spec.mixins ??= [];
	spec.mixins.push(mixin);

	if (typeof spec.data !== "function") {
		let data = spec.data;
		spec.data = () => data;
	}

	return Vue.createApp(spec).mount(element);
}

export { Vue, mixin };