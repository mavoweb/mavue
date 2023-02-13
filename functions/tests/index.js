import * as Functions from "../functions.js";

// Remove indents from <td> to make for nice presentation
for (let td of document.querySelectorAll("td")) {
	let indent = td.previousSibling.textContent.match(/[ \t]*$/)[0];

	// If <td> is indented and doesn't have element children, remove indent from each line
	if (indent && td.children.length === 0) {
		td.textContent = td.textContent.replace(new RegExp(`^${indent}`, "gm"), "");
	}
}

function functionEvaluation (test, result, expected) {
	let r = eval(test.textContent);
	let json = JSON.stringify(r);
	result.textContent = json;

	let err;

	try {
		let evaluated = eval(expected.textContent);

		if (Test.equals(r, evaluated)) {
			return true;
		}
	}
	catch (e) { err = e }

	try {
		let stringified = JSON.stringify(JSON.parse(expected.textContent));

		if (json === stringified) {
			return true;
		}
	}
	catch (e) { err = e }

	return err || false;
}

Object.assign(globalThis, { ...Functions, functionEvaluation });