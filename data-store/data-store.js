import Backend from "https://madata.dev/src/index.js";

const exportOnData = [
	"login", "logout",
	"save", "upload",
	"backend",
]

const DataStore = {
	props: {
		src: String,
		modelValue: Object,
	},

	emits: ["update:modelValue"],

	data() {
		return {
			inProgress: "",
			user: null
		}
	},

	mounted () {
		if (!this.modelValue || !Array.isArray(this.modelValue) && typeof this.modelValue !== "object") {
			throw new Error("DataStore: data must be an object or array");
		}

		for (let property of exportOnData) {
			Object.defineProperty(this.modelValue, property, {
				value: this[property],
			});
		}

		let getters = {
			inProgress: () => this.inProgress,
			user: () => this.user,
			username: () => this.user?.username,
		}

		for (let property in getters) {
			Object.defineProperty(this.modelValue, property, {
				get: getters[property]
			});
		}
	},

	computed: {
		username() { return this.user.username; }
	},

	watch: {
		src: {
			async handler (url, oldUrl) {
				this.pastBackends ??= new Set();

				if (this.backend) {
					this.pastBackends.add(this.backend);
				}

				this.backend = Backend.create(url, {
					existing: [...this.pastBackends]
				});

				return this.load();
			},
			immediate: true,
		}
	},

	methods: {
		async login (o) {
			console.log("login start");
			this.inProgress = "Logging in...";
			await this.backend.login(o);
			this.inProgress = "";
			console.log(this.backend.user);
			return this.user = this.backend.user;
		},

		async logout () {
			await this.backend.logout();
			this.user = this.backend.user;
		},

		async load () {
			let data = await this.backend.load();
			// load() also calls login({passive: true})
			this.user = this.backend.user;

			// Replace data maintaining a reference to its object
			if (Array.isArray(this.modelValue)) {
				this.modelValue.splice(0, this.modelValue.length, ...data);
			}
			else { // Object
				// Delete old data
				for (let key in this.modelValue) {
					delete this.modelValue[key];
				}
				// Add new data
				Object.assign(this.modelValue, data);
			}

			this.$emit("update:modelValue", this.modelValue);
		},

		async save () {
			this.inProgress = "Saving...";
			let ret = await this.backend.store(this.modelValue);
			this.inProgress = "";
			return ret;
		},

		async upload (file) {
			this.inProgress = "Uploading...";
			let ret = await this.backend.upload(file);
			this.inProgress = "";
			return ret;
		}
	},

	template: " "
}

export default DataStore;

if (globalThis.VApp) {
	VApp.components["data-store"] = DataStore;
}