const vDefault = {
	mounted(el, binding, vnode, prevVnode) {
		let vModel = vnode.dirs[0];
		let value = vModel.value;
		let defaultValue = binding.value ?? el.value;

		if (value === null || value === undefined) { // No value set
			setValue(el, defaultValue);
		}
	},

	updated(el, binding, vnode, prevVnode) {
		if (binding.oldValue !== binding.value) { // Default value changed
			let vModel = vnode.dirs[0];

			if (vModel.value === binding.oldValue) { // v-model value is still the old default value
				setValue(el, binding.value);
			}
		}
	},
}



// Get the value of a form element
export function getValue(formElement) {
	if (formElement.type === "checkbox") {
		return formElement.checked;
	}
	else if (formElement.type === "radio") {
		if (formElement.checked) {
			return formElement.value;
		}
		else {
			return null;
		}
	}

	return formElement.value;
}

export function setValue(formElement, value) {
	if (formElement.type === "checkbox") {
		formElement.checked = value;
	}
	else if (formElement.type === "radio") {
		if (formElement.value === value) {
			formElement.checked = true;
		}
	}
	else {
		formElement.value = value;
	}

	let event;
	if (formElement.matches("select")) {
		event = new Event("change", { bubbles: true });
	}
	else {
		event = new InputEvent("input", { bubbles: true });
	}

	formElement.dispatchEvent(event);
}

export default vDefault;

export const meta = {
	type: "directive",
	name: "default",
	default: vDefault
}

if (globalThis.VApp) {
	VApp.registerHelper(meta);
}