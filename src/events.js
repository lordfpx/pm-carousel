import onClick from "./onClick"
import onKeydown from "./onKeydown"
import { onTouchStart, onTouchMove, onTouchEnd } from "./onTouch"
import { ATTRPLAYSTOP } from "./constants"

function events() {
	// events functions
	const handleClick = onClick.bind(this)
	const handleTouchStart = onTouchStart.bind(this)
	const handleTouchMove = onTouchMove.bind(this)
	const handleTouchEnd = onTouchEnd.bind(this)
	const handleKeydown = onKeydown.bind(this)
	const handleMouseEnter = this.pause.bind(this)
	const handleMouseLeave = this.play.bind(this)
	const handleFocusIn = function (event) {
		// not when on play/stop button
		!event.target.closest(`[${ATTRPLAYSTOP}]`) ? this.pause() : this.play()
	}
	const handleFocusOut = this.play.bind(this)

	this.el.addEventListener("click", handleClick)
	this.el.addEventListener("keydown", handleKeydown)
	this.el.addEventListener("focusin", handleFocusIn.bind(this))
	this.el.addEventListener("focusout", handleFocusOut.bind(this))

	this.nodes.wrapper.addEventListener("touchstart", handleTouchStart)
	this.nodes.wrapper.addEventListener("touchmove", handleTouchMove)
	this.nodes.wrapper.addEventListener("touchend", handleTouchEnd)

	this.el.addEventListener("mouseenter", handleMouseEnter)
	this.el.addEventListener("mouseleave", handleMouseLeave)
}

export default events
