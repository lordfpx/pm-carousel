import { TRANSITION } from "./constants"

let timeoutOnTouchStart
let timeoutOnTouchMove
let timeoutOnTouchEnd

export function onTouchStart(ev) {
	if (timeoutOnTouchStart) {
		window.cancelAnimationFrame(timeoutOnTouchStart)
	}

	timeoutOnTouchStart = window.requestAnimationFrame(() => {
		// stop autoplay
		this.stop()

		this.nodes.overflow.style.transition = "none"
		this._metrics.touchstartX = Math.round(ev.touches[0].pageX)
		this._metrics.slideWidth = this.nodes.wrapper.offsetWidth
	})
}

export function onTouchMove(ev) {
	if (timeoutOnTouchMove) {
		window.cancelAnimationFrame(timeoutOnTouchMove)
	}

	timeoutOnTouchMove = window.requestAnimationFrame(() => {
		this._metrics.touchmoveX = Math.round(ev.touches[0].pageX)
		this._metrics.moveX = this._metrics.touchstartX - this._metrics.touchmoveX

		this.nodes.overflow.style.transform = `translateX(${
			-this._metrics.distance - this._metrics.moveX
		}px)`
	})
}

export function onTouchEnd() {
	if (timeoutOnTouchEnd) {
		window.cancelAnimationFrame(timeoutOnTouchEnd)
	}

	timeoutOnTouchEnd = window.requestAnimationFrame(() => {
		let newActive = this.activePage

		this.nodes.overflow.style.transition = TRANSITION

		if (this._metrics.moveX > this._metrics.slideWidth / 3) {
			newActive++
		} else if (this._metrics.moveX < -this._metrics.slideWidth / 3) {
			newActive--
		} else {
			// reset to initial position
			this.nodes.overflow.style.transform = `translateX(${-this._metrics
				.distance}px)`
			return
		}

		this.changeActive(newActive, true)
	})
}
