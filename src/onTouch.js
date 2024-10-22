import { TRANSITION } from "./constants"

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
		this._metrics.slideWidth = this.nodes.wrapper.offsetWidth
	})
}

export function onTouchMove(ev) {
	handleRequestAnimationFrame("onTouchMove", () => {
		this._metrics.moveX =
			this._metrics.touchstartX - Math.round(ev.touches[0].pageX)

		this.nodes.overflow.style.transform = `translateX(${
			-this._metrics.distance - this._metrics.moveX
		}px)`
	})
}

export function onTouchEnd() {
	handleRequestAnimationFrame("onTouchEnd", () => {
		const goToNext = this._metrics.moveX > this._metrics.slideWidth / 3
		const goToPrev = this._metrics.moveX < -this._metrics.slideWidth / 3

		this.nodes.overflow.style.transition = TRANSITION
		let newActive = this.activePage

		// réinit moving distance
		this._metrics.moveX = 0

		if (!goToNext && !goToPrev) {
			// reset to initial position
			this.nodes.overflow.style.transform = `translateX(${-this._metrics
				.distance}px)`
			return
		}

		goToNext ? (newActive += 1) : (newActive -= 1)

		this.changeActive(newActive, true)
	})
}
