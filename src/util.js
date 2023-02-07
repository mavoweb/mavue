/**
 * Register an app on a Vue spec object, mixin, or component
 * @param {*} app
 * @param  {...any} helpers
 */
export function register(app, ...helpers) {
	for (let helper of helpers) {
		let meta = helper.meta;

		if (meta?.type === "component") {
			app.components ??= {};
			app.components[meta.name] = meta.default;
		}
		else if (meta?.type === "directive") {
			app.directives ??= {};
			app.directives[meta.name] = meta.default;
		}
		else if (meta?.type === "mixin") {
			app.mixins ??= [];
			app.mixins.push(meta.default);
		}
		else { // helper functions
			app.methods ??= {};

			if (meta?.default ?? helper.default) {
				// Default export of object with functions as keys
				Object.assign(app.methods, meta?.default ?? helper.default);
			}
			else {
				// Methods exported as individual named exports
				for (let name in helper) {
					let value = helper[name];
					if (typeof value === "function") {
						app.methods[name] = value;
					}
				}
			}
		}
	}
}