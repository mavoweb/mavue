/**
 * Register an app on a Vue spec object, mixin, or component
 * @param {*} app
 * @param  {...any} helpers
 */
export function register(app, ...helpers) {
	for (let helper of helpers) {
		let meta = helper.meta ?? helper;

		if (meta.type === "component") {
			app.components ??= {};
			app.components[meta.name] = meta.default;
		}
		else if (meta.type === "directive") {
			app.directives ??= {};
			app.directives[meta.name] = meta.default;
		}
		else if (meta.type === "mixin") {
			app.mixins ??= [];
			app.mixins.push(meta.default);
		}
		else { // helper functions
			app.methods ??= {};

			if (meta.default) {
				// Default export of object with functions as keys
				Object.assign(app.methods, meta.default);
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

/**
 * Return a promise that resolves after the specified timeout
 * @param {number} timeout
 * @param {AbortSignal} [signal] Abort signal to cancel the delay (the promise then never resolves)
 * @returns {Promise<void>}
 */
export function delay (timeout, { signal } = {}) {
	return new Promise((resolve, reject) => {
		let id = setTimeout(() => {
			if (!signal || !signal.aborted) {
				resolve();
			}
		}, timeout);

		if (signal) {
			signal.addEventListener("abort", () => {
				clearTimeout(id);
			});
		}
	});
}