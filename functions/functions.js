import * as functions from "./functions-fn.js";

if (typeof VApp !== "undefined") {
	VApp.registerHelper(functions);
}