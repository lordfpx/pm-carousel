import { ACTIVECLASS } from "./constants"
import updateScroll from "./updateScroll"
import updateNavBtns from "./updateNavBtns"
import {
	disableKeyboardNavigation,
	enableKeyboardNavigation,
} from "./manageFocus"

function setActive() {
	this.visibleSlides = []

	// update paging buttons
	if (this.nodes.paging) {
		this.nodes.pages.forEach((node, index) => {
			let pageBtn = node.querySelector("button") || node

			if (index === this.activePage) {
				pageBtn.setAttribute("aria-current", "true")
				node.classList.add(ACTIVECLASS)
			} else {
				pageBtn.removeAttribute("aria-current")
				node.classList.remove(ACTIVECLASS)
			}
		})
	}

	// update items in slides
	this.nodes.items.forEach((nodes, index) => {
		nodes.forEach((node, indexFirstItem) => {
			const isActiveSlide = index === this.activePage

			if (isActiveSlide) {
				node.removeAttribute("aria-hidden")

				if (this.supportsInert) {
					node.inert = false
				} else {
					enableKeyboardNavigation(node)
				}

				this.visibleSlides.push(node)

				// put focus on the 1st item from the active slide if autoplay is not playing
				if (indexFirstItem === 0 && this.autoplayStatus !== "play") {
					node.focus({ preventScroll: true })
				}
			} else {
				node.setAttribute("aria-hidden", "true")

				if (this.supportsInert) {
					node.inert = true
				} else {
					disableKeyboardNavigation(node)
				}
			}
		})
	})

	// update scroll and prev/next buttons
	updateScroll.call(this)
	updateNavBtns.call(this)
}

export default setActive
