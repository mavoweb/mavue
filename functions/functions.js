export const type = "functions";

export function iff (test, yes, no = "") {
	return test ? yes : no;
}

/**
 *
 * @param {Array | Object} obj
 * @param {Array<string> | string | number} path
 * @returns
 */
export function get (object, path) {
	if (typeof path === "string") {
		// Produce error if path doesn’t seem to match format
		path = path.split(".");

		if (!path.every(prop => /^([$\w]+|\*)$/.test(prop))) {
			throw new TypeError(`Invalid property path: ${path.join(".")}.
			Property paths must be dot-separated strings of alphanumeric characters, dollar signs ($), or a single asterisk (*).
			If you have an object with weird keys, use the array path syntax instead, which does not perform this check`);
		}
	}

	let obj = object;

	for (let i = 0; i < path.length; i++) {
		let prop = path[i];

		if (prop === "*") {
			// Get all items in array or all values in object
			if (Array.isArray(obj)) {
				continue;
			}
			else {
				obj = Object.values(obj);
			}
		}
		else {
			if (Array.isArray(obj)) {
				if (/^\d+$/.test(prop)) {
					// Get item by index

					obj = obj[prop];
				}
				else {
					// Get all child properties
					obj = obj.flatMap(item => item?.[prop]);
				}

			}
			else {
				// Just get property, if it exists
				obj = obj?.[prop];
			}
		}

		if (obj === null || obj === undefined) {
			return obj;
		}
	}

	if (Array.isArray(obj)) {
		return obj.flat();
	}

	return obj;
}

/**
 * Sum one or more arrays of numbers.
 * Non-numerical values are silently dropped.
 * @param  {...any} numbers
 */
export function sum (...numbers) {
	numbers = numbers.flat();

	return numbers.reduce((acc, current) => {
		if (!isNaN(current)) {
			return acc + Number(current);
		}
		else {
			return acc;
		}
	}, 0);
}

/**
 * Count the number of truthy values in one or more arrays
 * @param  {...any} values
 */
export function count (...values) {
	values = values.flat();
	let count = 0;

	for (let value of values) {
		if (value) {
			count++;
		}
	}

	return count;
}