export function disableKeyboardNavigation(element) {
	const focusableElements = element.querySelectorAll(
		"a, button, input, textarea, select, [tabindex]"
	)

	focusableElements.forEach((el) => {
		if (!el.hasAttribute("data-original-tabindex")) {
			el.setAttribute("data-original-tabindex", el.getAttribute("tabindex"))
		}
		el.setAttribute("tabindex", "-1")
		el.setAttribute("aria-hidden", "true")
	})
}

export function enableKeyboardNavigation(element) {
	const focusableElements = element.querySelectorAll(
		'[tabindex="-1"], [aria-hidden="true"]'
	)

	focusableElements.forEach((el) => {
		const originalTabIndex = el.getAttribute("data-original-tabindex")
		if (originalTabIndex !== null) {
			if (originalTabIndex === "null") {
				el.removeAttribute("tabindex")
			} else {
				el.setAttribute("tabindex", originalTabIndex)
			}
			el.removeAttribute("data-original-tabindex")
		}
		el.removeAttribute("aria-hidden")
	})
}
