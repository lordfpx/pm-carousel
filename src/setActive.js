import { ACTIVECLASS } from "./constants"
import updateScroll from "./updateScroll"
import prevBtn from "./prevBtn"
import nextBtn from "./nextBtn"

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
				// put focus on 1st item from active slide
				if (indexFirstItem === 0 && this.autoplayStatus !== "play") {
					node.focus({ preventScroll: true })
				}
				node.setAttribute("aria-hidden", "false")
				this.visibleSlides.push(node)
			} else {
				node.setAttribute("aria-hidden", "true")
			}
		})
	})

	updateScroll.call(this)
	prevBtn.call(this)
	nextBtn.call(this)
}

export default setActive
