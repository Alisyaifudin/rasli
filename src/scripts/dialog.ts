(function () {
	document.body.addEventListener("htmx:afterOnLoad", (e) => {
		main();
	});
	window.addEventListener("popstate", (e) => {
		main();
	});
	function main() {
		const portalEl = document.querySelector<HTMLDivElement>("#portal-element");
		const dialogEls = document.querySelectorAll<HTMLDivElement>(".dialog-root");
		dialogEls.forEach((dialogRoot) => {
			const dialogEl = dialogRoot.querySelector<HTMLDialogElement>(".dialog-el");
			const openBtnEl = dialogRoot.querySelector<HTMLButtonElement>(".dialog-trigger");
			const closeBtnEl = dialogRoot.querySelector<HTMLButtonElement>(".dialog-close");
			const backdropEl = dialogRoot.querySelector<HTMLDivElement>(".dialog-backdrop");
			const cardEl = dialogRoot.querySelector<HTMLDivElement>(".dialog-card");
			const titleEl = dialogRoot.querySelector<HTMLDivElement>(".dialog-title");
			const titleSlotEl = dialogRoot.querySelector<HTMLDivElement>(".dialog-title-slot");
			if (
				openBtnEl === null ||
				closeBtnEl === null ||
				backdropEl === null ||
				cardEl === null ||
				titleEl === null ||
				titleSlotEl === null ||
				dialogEl === null
			) {
				throw new Error("dialog elements not found");
			}
			if (portalEl === null) throw new Error("No portal");
			titleSlotEl.replaceWith(titleEl);
			portalEl.appendChild(dialogEl);
			dialogRoot.replaceWith(openBtnEl);

			openBtnEl.addEventListener("click", () => {
				cardEl.classList.add("open-dialog");
				dialogEl.showModal();
				const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
				document.body.style.overflow = "hidden";
				document.body.style.paddingRight = `${scrollBarWidth}px`;
				cardEl.addEventListener(
					"animationend",
					function handler() {
						cardEl.classList.remove("open-dialog");
					},
					{ once: true }
				);
			});

			// "Close" button closes the dialog
			closeBtnEl.addEventListener("click", closeDialog(cardEl, dialogEl));
			backdropEl.addEventListener("click", closeDialog(cardEl, dialogEl));
		});

		function closeDialog(cardEl: HTMLDivElement, dialogEl: HTMLDialogElement) {
			return function (event: Event) {
				if (event.target === event.currentTarget) {
					cardEl.classList.add("close-dialog");
					// Wait for animation to complete before closing
					cardEl.addEventListener(
						"animationend",
						function handler() {
							document.body.style.overflow = "";
							document.body.style.paddingRight = "";
							cardEl.removeEventListener("animationend", handler);
							dialogEl.close();
							cardEl.classList.remove("close-dialog");
						},
						{ once: true }
					);
				}
			};
		}
	}
	main();
})();
