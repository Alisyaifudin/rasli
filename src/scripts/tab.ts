(function () {
	document.body.addEventListener("htmx:afterOnLoad", (e) => {
		main();
	});
	window.addEventListener("popstate", (e) => {
		main();
	});
	function main() {
		const tabEls = document.querySelectorAll<HTMLDivElement>(".tab-root");
		tabEls.forEach((tabRoot) => {
			const attr = tabRoot.attributes.getNamedItem("data-value");
			if (attr === null) return;
			let selected = attr.value;
			const contentEls = tabRoot.querySelectorAll<HTMLDivElement>(".tab-content");
			const triggerSlotEl = tabRoot.querySelector<HTMLDivElement>(".tab-trigger-slot");
			if (contentEls === null || triggerSlotEl === null) {
				throw new Error("dialog elements not found");
			}
			const contents: Map<string, [HTMLDivElement, HTMLButtonElement]> = new Map();
			contentEls.forEach((el) => {
				const triggerEl = el.querySelector<HTMLButtonElement>(".tab-trigger");
				if (triggerEl === null) return;
				triggerSlotEl.appendChild(triggerEl);
				const value = el.getAttribute("data-value");
				if (value === null) return;
				contents.set(value, [el, triggerEl]);
				if (selected === value) {
					el.hidden = false;
					triggerEl.setAttribute("data-state", "active");
				}
				triggerEl.addEventListener("click", () => {
					tabRoot.setAttribute("data-value", value);
				});
				const observer = new MutationObserver(function (mutations) {
					mutations.forEach(function (mutation) {
						if (mutation.type === "attributes" && mutation.attributeName === "data-value") {
							const value = tabRoot.getAttribute("data-value");
							for (const [val, els] of contents.entries()) {
								const [content, trigger] = els;
								if (val === value) {
									content.hidden = false;
									trigger.setAttribute("data-state", "active");
								} else {
									content.hidden = true;
									trigger.setAttribute("data-state", "inactive");
								}
							}
						}
					});
				});
				const config = {
					attributes: true,
					attributeFilter: ["data-value"],
				};
				observer.observe(tabRoot, config);
			});
		});
	}
	main();
})();
