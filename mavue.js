/**
 * Full service: This imports absolutely everything
 */

import VApp, {Vue} from "./v-app/v-app.js";
import DataStore, { register as registerDataStore } from "./data-store/data-store.js";
import vDefault, { register as registerVDefault } from "./v-default/v-default.js";
import ComputedData, { register as registerComputedData } from "./computed-data/computed-data.js";

registerDataStore(VApp);
registerVDefault(VApp);
registerComputedData(VApp);

// Init <v-app> asynchronously, to give other code the chance to add
// things (methods, computed properties, components, directives etc) to it
requestAnimationFrame(VApp.register);

export {
	VApp,
	Vue,
	DataStore,
	vDefault,
	ComputedData,
};
