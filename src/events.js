import onClick from "./onClick"
import onKeydown from "./onKeydown"
import { onTouchStart, onTouchMove, onTouchEnd } from "./onTouch"
import { ATTRPLAYSTOP } from "./constants"

function manageEvents(add = true) {
	const method = add ? "addEventListener" : "removeEventListener"

	const handleFocusIn = (event) => {
		!event.target.closest(`[${ATTRPLAYSTOP}]`) ? this.pause() : this.play()
	}

	// Touch event on the wrapper
	;["touchstart", "touchmove", "touchend"].forEach((event, index) => {
		const handler = [onTouchStart, onTouchMove, onTouchEnd][index]
		this.nodes.wrapper[method](event, handler.bind(this))
	})

	// Events on the component
	this.el[method]("click", onClick.bind(this))
	this.el[method]("keydown", onKeydown.bind(this))
	this.el[method]("focusin", handleFocusIn)
	this.el[method]("focusout", this.play.bind(this))
	this.el[method]("mouseenter", this.pause.bind(this))
	this.el[method]("mouseleave", this.play.bind(this))
}

export function addEvents() {
	manageEvents.call(this, true)
}

export function removeEvents() {
	manageEvents.call(this, false)
}
