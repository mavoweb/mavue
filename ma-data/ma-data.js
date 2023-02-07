import MaData from "https://madata.dev/components/vue/madata-vue.js";

export default MaData;

export const meta = {
	type: "component",
	name: "ma-data",
	default: MaData,
}

if (globalThis.VApp) {
	VApp.registerHelper(meta);
}