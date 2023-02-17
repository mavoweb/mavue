// Website scripts
import "https://prismjs.com/prism.js";
import "https://prismjs.com/plugins/normalize-whitespace/prism-normalize-whitespace.js";

function renderDemos() {
	for (let code of document.querySelectorAll("pre > code.language-html, pre.language-html > code")) {
		let pre = code.parentNode;

		if (!pre.previousElementSibling?.matches(".demo, .no-demos *")) {
			code.parentNode.insertAdjacentHTML("beforebegin", `<div class="demo">${code.textContent}</div>`);

			// Ensure scripts actually run
			let demoDiv = pre.previousElementSibling;
			let styles = pre.nextElementSibling?.matches("style")? pre.nextElementSibling : null;
			let scripts = demoDiv.querySelectorAll("script");

			for (let script of scripts) {
				script.replaceWith( clone(script) )
			}

			// Create "Open in CodePen" button

			// Dummy so we can get outerHTML
			let dummy = document.createElement("div");

			// Additional includes
			let head = [...document.head.querySelectorAll("script")].map(script => {
				let script2 = clone(script);
				// Absolutize href
				if (script.hasAttribute("src")) {
					let src = new URL(script.src, location);
					if (src.host.startsWith("localhost")) {
						src.host = "mavue.mavo.io:80";
						src.protocol = "https:";
					}
					script2.setAttribute("src", src);
				}
				else if (script.type === "module") {
					let content = script.textContent;
					let re = /import\s+.*\s+from\s+\"(?<url>.+)\"/gm;
					for (const match of content.matchAll(re)) {
						let url = match.groups.url;
						let src = new URL(url, location);
						if (src.host.startsWith("localhost")) {
							src.host = "mavue.mavo.io:80";
							src.protocol = "https:";
						}
						content = content.replace(url, src);
					}
					script2.textContent = content;
				}

				dummy.append(script2);

				return script2.outerHTML;
			}).join("\n");
			let options = {
				title: "MaVue Demo",
				html: code.textContent,
				css: styles?.textContent,
				head
			}
			demoDiv.insertAdjacentHTML("afterend", `<form action="https://codepen.io/pen/define" method="POST" target="_blank" class="codepen">
				<input type="hidden" name="data" value='${ JSON.stringify(options).replaceAll("'", "&apos;") }'>
				<button>Open in <img src="/assets/codepen.svg" alt="CodePen"></button>
			</form>`);

		}
	}

	if (!document.documentElement.matches(".no-home-link")) {
		let h1 = document.querySelector("h1");

		if (h1 && !h1.parentNode.querySelector(".home")) {
			h1.insertAdjacentHTML("beforebegin", `<a href="../index.html" class="home">MaVue</a>`);
		}
	}
}

renderDemos();

function clone (node){
	let ret = document.createElement(node.tagName);

	ret.innerHTML = node.innerHTML;

	for (let attr of node.getAttributeNames()) {
		ret.setAttribute(attr, node.getAttribute(attr));
	}

	return ret;
}