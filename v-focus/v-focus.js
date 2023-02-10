const focus = {
	mounted(el, binding, vnode, prevVnode) {
		el.focus();
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