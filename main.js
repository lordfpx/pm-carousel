import {
	ATTR,
	ACTIVECLASS,
	ATTRITEM,
	ATTRPREV,
	ATTRNEXT,
	ATTRPLAYSTOP,
} from "./src/constants"

import init from "./src/init"
import setActive from "./src/setActive"
import getConfig from "./src/getConfig"
import getNodes from "./src/getNodes"
import events from "./src/events"

class Plugin {
	constructor(el, settings) {
		this.el = el

		this.currentSettings = getConfig.call(this, settings)
		this.nodes = getNodes.call(this)
		this._templates = {}

		events.call(this)

		if (this.nodes.playstop) {
			const playstopTexts = this.nodes.playstop
				.getAttribute(ATTRPLAYSTOP)
				.split("|")

			this._templates.playstop = {
				tpl: this.nodes.playstop.innerHTML,
				playLabel: playstopTexts[0],
				stopLabel: playstopTexts[1],
			}
		}

		if (this.nodes.prev) {
			const prevLabels = this.nodes.prev.getAttribute(ATTRPREV).split("|")

			this._templates.prev = {
				tpl: this.nodes.prev.innerHTML,
				label: prevLabels[0],
				lastLabel: prevLabels[1],
			}
		}

		if (this.nodes.next) {
			const nextLabels = this.nodes.next.getAttribute(ATTRNEXT).split("|")

			this._templates.next = {
				tpl: this.nodes.next.innerHTML,
				label: nextLabels[0],
				lastLabel: nextLabels[1],
			}
		}

		if (!this.currentSettings.disable) {
			init.call(this)
		}
	}

	play() {
		// "stop" status !== pause
		if (!this.nodes.playstop || this.autoplayStatus === "stop") {
			return
		}

		this.pause() // clear interval

		// can't autoplay without loop
		this.currentSettings.loop = true
		this.autoplayStatus = "play"
		this.nodes.playstop.classList.add("is-playing")

		this.nodes.playstop.innerHTML = this._templates.playstop.tpl.replace(
			"{text}",
			this._templates.playstop.playLabel
		)

		let newActive = this.activePage
		this._interval = window.setInterval(() => {
			newActive++

			// must loop even with loop: false
			if (newActive > this.pagesLength - 1) {
				newActive = 0
			}

			this.changeActive(newActive)
		}, this.currentSettings.autoplay)
	}

	pause() {
		window.clearInterval(this._interval)
	}

	stop() {
		if (!this.nodes.playstop) return

		this.autoplayStatus = "stop"
		this.nodes.playstop.classList.remove("is-playing")

		this.nodes.playstop.innerHTML = this._templates.playstop.tpl.replace(
			"{text}",
			this._templates.playstop.stopLabel
		)
		window.clearInterval(this._interval)
	}

	toggleAutoplay() {
		if (!this.nodes.playstop) return

		if (this.autoplayStatus === "play") {
			this.stop()
		} else if (this.autoplayStatus === "stop") {
			this.autoplayStatus = "play"
			this.play()
		}
	}

	changeActive(newActive, isSwipe) {
		this.activePage = newActive

		if (this.activePage < 0) {
			this.activePage =
				this.currentSettings.loop && !isSwipe ? this.pagesLength - 1 : 0
		}

		if (this.activePage > this.pagesLength - 1) {
			this.activePage =
				this.currentSettings.loop && !isSwipe ? 0 : this.pagesLength - 1
		}

		setActive.call(this)
	}

	reinit() {
		this.disable()
		this.nodes.items = [].slice.call(this.el.querySelectorAll(`[${ATTRITEM}]`))
		init.call(this)
	}

	disable() {
		this.stop()

		this.nodes.wrapper.removeEventListener("touchstart", this.onTouchStart)
		this.nodes.wrapper.removeEventListener("touchmove", this.onTouchMove)
		this.nodes.wrapper.removeEventListener("touchend", this.onTouchEnd)
		this.el.removeEventListener("click", this.onClick)
		this.el.removeEventListener("keydown", this.onKeydown)
		this.el.removeEventListener("mouseenter", this.onMouseEnter)
		this.el.removeEventListener("mouseleave", this.onMouseLeave)

		this.nodes.paging.hidden = true
		this.nodes.prev.hidden = true
		this.nodes.next.hidden = true
		this.nodes.playstop.hidden = true

		this.nodes.overflow.removeAttribute("style")
		this.nodes.wrapper.removeAttribute("style")

		this.nodes.items.forEach((nodes) => {
			nodes?.forEach((node) => {
				node.removeAttribute("tabindex")
				node.removeAttribute("aria-hidden")
				node.removeAttribute("style")
			})
		})

		this.el.classList.remove(ACTIVECLASS)
	}
}

const initPmCarousel = (node, settings) => {
	if (!node.pmCarousel && node.hasAttribute(ATTR)) {
		node.pmCarousel = new Plugin(node, settings)
	}
}

const pmCarousel = function (settings = {}, node) {
	if (node === null) return

	node = node || document.querySelectorAll(`[${ATTR}]`)

	node.length
		? node.forEach((node) => initPmCarousel(node, settings))
		: initPmCarousel(node, settings)
}

window.pmCarousel = pmCarousel

export default pmCarousel
