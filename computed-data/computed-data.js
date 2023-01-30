import Backend from "https://madata.dev/src/index.js";

const ComputedData = {
	props: {
		value: {
			required: true,
		},
		on: Object,
		name: {
			required: true,
			type: String
		}
	},

	emits: ["update"],

	data() {
		return {}
	},

	watch: {
		value: {
			handler (value) {
				let root = this.on ?? this.$parent;
				root[this.name] = undefined;
				Object.defineProperty(root, this.name, {
					value: value,
					writable: true,
					enumerable: false
				});

				this.$emit("update", value);
			},
			immediate: true,
		},

	},

	template: `<span>{{ ["number", "string", "boolean"].includes(typeof value)? value : "" }}</span>`
}

export default ComputedData;

export function register (app) {
	app.components["computed-data"] = ComputedData;
}

if (globalThis.VApp) {
	register(VApp);
}