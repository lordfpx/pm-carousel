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
		this._touchstartX = Math.round(ev.touches[0].pageX)
		this._slideWidth = this.nodes.wrapper.offsetWidth
	})
}

export function onTouchMove(ev) {
	if (timeoutOnTouchMove) {
		window.cancelAnimationFrame(timeoutOnTouchMove)
	}

	timeoutOnTouchMove = window.requestAnimationFrame(() => {
		this._touchmoveX = Math.round(ev.touches[0].pageX)
		this._moveX = this._touchstartX - this._touchmoveX

		this.nodes.overflow.style.transform = `translateX(${
			-this._distance - this._moveX
		}px)`
	})
}

export function onTouchEnd() {
	if (timeoutOnTouchEnd) {
		window.cancelAnimationFrame(timeoutOnTouchEnd)
	}

	timeoutOnTouchEnd = window.requestAnimationFrame(() => {
		let newActive = this.active

		this.nodes.overflow.style.transition = TRANSITION

		if (this._moveX > this._slideWidth / 3) {
			newActive++
		} else if (this._moveX < -this._slideWidth / 3) {
			newActive--
		} else {
			// reset to initial position
			this.nodes.overflow.style.transform = `translateX(${-this._distance}px)`
			return
		}

		this.changeActive(newActive, true)
	})
}
