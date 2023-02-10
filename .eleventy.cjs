let markdownIt = require("markdown-it");
let markdownItAnchor = require("markdown-it-anchor");

module.exports = config => {
	let data = {
		"layout": "page.njk",
		"permalink": "{{ page.filePathStem | replace('README', '') }}/index.html",
		eleventyComputed: {
			defaultTitle: data => {
				if (data.id) {
					return data.id;
				}

				return "Mavue: Easier Vue.js apps, inspired by Mavo";
			}
		}
	};

	for (let p in data) {
		config.addGlobalData(p, data[p]);
	}

	config.setDataDeepMerge(true);

	config.setLibrary("md", markdownIt({
			html: true,
		})
		.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.headerLink(),
			level: 2,
		})
		.disable("code")
	);

	config.addFilter(
		"relative",
		page => {
			let path = page.url.replace(/[^/]+$/, "");
			let ret = require("path").relative(path, "/");

			return ret || ".";
		}
	);

	config.addFilter("CamelCase", str => {
		return str?.replace(/(?:^|\-)([A-Za-z])/g, (g, $1) => $1.toUpperCase());
	});

	return {
		markdownTemplateEngine: "njk",
		templateFormats: ["md", "njk"],
		dir: {
			output: "."
		},
	};
};
