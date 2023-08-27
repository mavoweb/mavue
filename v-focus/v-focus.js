const focus = {
	mounted(el, binding, vnode, prevVnode) {
		// If v-focus is used without a value, we just focus when mounted
		// However, if it's used with a value, and the value is falsy, we don't focus,
		// because this is used for conditional focusing
		if (binding.value === undefined || binding.value) {
			el.focus();
		}
	},

	updated(el, binding, vnode, prevVnode) {
		if (!!binding.value !== !!binding.oldValue) {
			if (binding.value) {
				el.focus();
			}
			else {
				el.blur();
			}
		}
	}
}

export default focus;

export const meta = {
	type: "directive",
	name: "focus",
	default: focus
}

if (globalThis.VApp) {
	VApp.registerHelper(meta);
}