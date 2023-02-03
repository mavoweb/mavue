/**
 * Full service: This imports absolutely everything
 */

import VApp, {Vue} from "./v-app/v-app.js";
import MaData, { register as registerMaData } from "./ma-data/ma-data.js";
import vDefault, { register as registerVDefault } from "./v-default/v-default.js";
import SetData, { register as registerSetData } from "./set-data/set-data.js";

registerMaData(VApp);
registerVDefault(VApp);
registerSetData(VApp);

// Init <v-app> asynchronously, to give other code the chance to add
// things (methods, computed properties, components, directives etc) to it
requestAnimationFrame(VApp.register);

export {
	VApp,
	Vue,
	MaData,
	vDefault,
	SetData,
};
