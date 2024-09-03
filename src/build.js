import { ATTR, TRANSITION, ACTIVECLASS } from "./constants"

const buildActions = {
	playstop: function () {
		if (!this.nodes.playstop) return

		// play/stop
		this.nodes.playstop.hidden = !this.currentSettings.autoplay
	},

	wrapper: function () {
		const startSpace = this.currentSettings.noStartSpace
			? 0
			: this.currentSettings.spaceAround

		// overflow container display
		this.nodes.overflow.style.transform = `translateX(${
			this.activePage * -100 + startSpace
		}%)`

		if (this.currentSettings.noStartSpace) {
			this.nodes.overflow.style.paddingRight =
				this.currentSettings.spaceAround + "%"
		} else {
			this.nodes.overflow.style.paddingRight = startSpace + "%"
			this.nodes.overflow.style.paddingLeft = startSpace + "%"
		}

		// overflow container transition
		this.nodes.overflow.style.transition = TRANSITION
		this.nodes.overflow.style.display = "flex"

		// wrapper overflow
		this.nodes.wrapper.style.overflow = "hidden"

		// it's ready!
		this.el.classList.add(ACTIVECLASS)
	},

	slides: function () {
		const newSlides = []

		// prepare DOM
		this.nodes.items.forEach((node, index) => {
			node.setAttribute("tabindex", "-1")
			node.setAttribute(ATTR + "-item", index)
			node.style.flex = `1 0 ${100 / this.currentSettings.group}%`
			node.style.overflow = "hidden"
		})

		// split in groups
		while (this.nodes.items.length > 0) {
			newSlides.push(this.nodes.items.splice(0, this.currentSettings.group))
		}

		this.nodes.items = newSlides
		this.pagesLength = this.nodes.items.length
	},

	paging: function () {
		if (!this.nodes.paging) return

		let newPage, btnString

		const pages = document.createDocumentFragment()
		this.nodes.paging.innerHTML = ""
		this.nodes.pages = []

		this.nodes.items.forEach((_node, index) => {
			btnString = this._templates.pagingTpl
			newPage = document.createElement("div")
			newPage.innerHTML = btnString.replace("{nbr}", ++index)
			this.nodes.pages.push(newPage.firstElementChild)
			pages.appendChild(newPage.firstElementChild)
		})

		this.nodes.paging.append(pages)
		this.nodes.paging.hidden = false
	},
}

function build() {
	const elements = ["slides", "wrapper", "playstop", "paging"]
	elements.forEach((action) => buildActions[action].call(this))
}

export default build
