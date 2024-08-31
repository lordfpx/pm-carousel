import { ACTIVECLASS } from "./constants"
import updateScroll from "./updateScroll"
import prevBtn from "./prevBtn"
import nextBtn from "./nextBtn"
import {
	disableKeyboardNavigation,
	enableKeyboardNavigation,
} from "./manageFocus"

function setActive() {
	this.visibleSlides = []

	// Le nbr de page est différent du nbr de slides !
	if (this.nodes.paging) {
		this.nodes.pages.forEach((node, index) => {
			let pageBtn = node

			// button child
			const btnNode = node.querySelector("button")

			if (btnNode) {
				pageBtn = btnNode
			}

			if (index === this.activePage) {
				pageBtn.setAttribute("aria-current", "true")
				node.classList.add(ACTIVECLASS)
			} else {
				pageBtn.removeAttribute("aria-current")
				node.classList.remove(ACTIVECLASS)
			}
		})
	}

	this.nodes.items.forEach((nodes, index) => {
		nodes.forEach((node, indexFirstItem) => {
			if (index === this.activePage) {
				node.removeAttribute("aria-hidden")

				if (this.supportsInert) {
					node.inert = false
				} else {
					enableKeyboardNavigation(node)
				}

				this.visibleSlides.push(node)

				// put focus on 1st item from active slide
				setTimeout(() => {
					if (indexFirstItem === 0 && this.autoplayStatus !== "play") {
						node.focus({ preventScroll: true })
					}
				}, 0)
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

	updateScroll.call(this)
	prevBtn.call(this)
	nextBtn.call(this)
}

export default setActive
