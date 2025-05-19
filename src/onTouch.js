import { SLIDE_MIN_RATIO, TRANSITION } from "./constants"

const timeouts = {
	onTouchStart: null,
	onTouchMove: null,
	onTouchEnd: null,
}

function handleRequestAnimationFrame(type, callback) {
	if (timeouts[type]) {
		window.cancelAnimationFrame(timeouts[type])
	}
	timeouts[type] = window.requestAnimationFrame(callback)
}

export function onTouchStart(ev) {
	handleRequestAnimationFrame("onTouchStart", () => {
		// stop autoplay
		this.stop()

		this.nodes.overflow.style.transition = "none"
		this._metrics.touchstartX = Math.round(ev.touches[0].pageX)
		this._metrics.touchstartY = Math.round(ev.touches[0].pageY)
		this._metrics.slideWidth = this.nodes.wrapper.offsetWidth
		this._metrics.isScrolling = false
		this._metrics.isSwiping = false
	})
}

export function onTouchMove(ev) {
	handleRequestAnimationFrame("onTouchMove", () => {
		this._metrics.moveX =
			this._metrics.touchstartX - Math.round(ev.touches[0].pageX)
		this._metrics.moveY =
			this._metrics.touchstartY - Math.round(ev.touches[0].pageY)

		// Check if the gesture is primarily horizontal or vertical
		if (!this._metrics.isScrolling && !this._metrics.isSwiping) {
			if (Math.abs(this._metrics.moveX) > Math.abs(this._metrics.moveY)) {
				this._metrics.isSwiping = true // Horizontal swipe
			} else {
				this._metrics.isScrolling = true // Vertical scroll
			}
		}

		if (this._metrics.isSwiping) {
			document.documentElement.style.overflow = "hidden"
			this.nodes.overflow.style.transform = `translateX(${
				-this._metrics.distance - this._metrics.moveX
			}px)`
		}
	})
}

export function onTouchEnd() {
	handleRequestAnimationFrame("onTouchEnd", () => {
		if (!this._metrics.isSwiping) {
			return
		}

		const goToNext =
			this._metrics.moveX > this._metrics.slideWidth / SLIDE_MIN_RATIO
		const goToPrev =
			this._metrics.moveX < -this._metrics.slideWidth / SLIDE_MIN_RATIO

		document.documentElement.style.removeProperty("overflow")

		let newActive = this.activePage

		// réinit moving distance
		this._metrics.moveX = 0

		this._metrics.isScrolling = false
		this._metrics.isSwiping = false

		if (!goToNext && !goToPrev) {
			// reset to initial position
			this.nodes.overflow.style.transition = TRANSITION
			this.nodes.overflow.style.transform = `translateX(${-this._metrics
				.distance}px)`
			return
		}

		goToNext ? (newActive += 1) : (newActive -= 1)

		this.changeActive(newActive, true)
	})
}
