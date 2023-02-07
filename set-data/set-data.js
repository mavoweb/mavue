import Backend from "https://madata.dev/src/index.js";

const SetData = {
	props: {
		value: {
			required: true,
		},
		on: Object,
		name: {
			required: true,
			type: String
		},
		once: Boolean,
		// While normal Vue attribute inheritance should take care of this for most cases,
		// it tends to produce warnings when the element's content is not a single element
		hidden: Boolean,
	},

	emits: ["update"],

	data() {
		return {}
	},

	methods: {
		isPrimitive,

		watchValue () {
			this.unwatchValue = this.$watch("value", (value, oldValue) => {
				if (oldValue !== undefined) {
					if (this.once) {
						// You'd expect we'd never get here, since we call `unwatchValue()`
						// but somehow this gets called once more after the unwatch.
						this.unwatchValue?.();
						return;
					}

					if (isPrimitive(value)) {
						if (value === oldValue) {
							return;
						}
					}
					else {
						console.log("slow code path")
						if (JSON.stringify(value) === JSON.stringify(oldValue)) {
							return;
						}
					}
				}

				if (this.once) {
					this.unwatchValue?.();
				}

				this.setValue(value);

				this.$emit("update", value);
			}, {
				immediate: true,
				deep: true,
			});
		},

		setValue (value) {
			this.root[this.name] = undefined;
			Object.defineProperty(this.root, this.name, {
				value: value,
				writable: true,
				enumerable: false
			});
		}
	},

	computed: {
		root () {
			return this.on ?? this.$parent;
		},

		storedValue () {
			return this.root[this.name];
		}
	},

	created () {
		this.watchValue();
	},

	mounted () {
		if (!this.once) {
			this.watchValue();
		}
	},

	unmounted () {
		if (!this.once) {
			this.unwatchValue?.();
			this.setValue(undefined);
		}
	},

	template: `<slot><span :hidden="hidden">{{ isPrimitive(storedValue)? storedValue : "" }}</span></slot>`
}

function isPrimitive (value) {
	return ["number", "string", "boolean"].includes(typeof value);
}

export default SetData;

export const meta = {
	type: "component",
	name: "set-data",
	default: SetData,
}

if (globalThis.VApp) {
	VApp.registerHelper(meta);
}