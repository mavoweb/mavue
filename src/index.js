/**
 * Full service: This imports absolutely everything
 */

import VApp, {Vue} from "../v-app/v-app.js";
export {VApp, Vue};

import { register } from "./util.js";
export { register };

let mixin = {};

import MaData, * as MaDataAll from "../ma-data/ma-data.js";
register(VApp, MaDataAll);
register(mixin, MaDataAll);
export {MaData};

import vDefault, * as vDefaultAll from "../v-default/v-default.js";
register(VApp, vDefaultAll);
register(mixin, vDefaultAll);
export {vDefault};

import SetData, * as SetDataAll from "../set-data/set-data.js";
register(VApp, SetDataAll);
register(mixin, SetDataAll);
export {SetData};

import * as functions from "../functions/functions.js";
register(VApp, functions);
register(mixin, functions);
export {functions};

// Init <v-app> asynchronously, to give other code the chance to add
// things (methods, computed properties, components, directives etc) to it
requestAnimationFrame(VApp.register);

export {
	mixin,
};
