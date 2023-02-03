import MaData from "https://madata.dev/components/vue/madata-vue.js";

export default MaData;

export function register (app) {
	app.components["ma-data"] = MaData;
}

if (globalThis.VApp) {
	register(VApp);
}