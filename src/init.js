import { ATTRWRAPPER, ATTROVERFLOW, ATTRITEM } from "./constants"
import build from "./build"
import onClick from "./onClick"
import onKeydown from "./onKeydown"
import { onTouchStart, onTouchMove, onTouchEnd } from "./onTouch"

function init() {
	this.nodes = {
		...this.nodes,
		wrapper: this.el.querySelector(`[${ATTRWRAPPER}]`),
		overflow: this.el.querySelector(`[${ATTROVERFLOW}]`),
		items: [].slice.call(this.el.querySelectorAll(`[${ATTRITEM}]`)),
	}

	this.active = 0
	this._interval = null
	this.autoplayStatus = "stop" // to manage play/stop

	// touch
	this._slideWidth = 0
	this._touchstartX = 0
	this._touchmoveX = 0
	this._moveX = 0

	build.call(this, ["slides", "wrappers", "playstop", "paging"])

	// events functions
	this.onClick = onClick.bind(this)
	this.onTouchStart = onTouchStart.bind(this)
	this.onTouchMove = onTouchMove.bind(this)
	this.onTouchEnd = onTouchEnd.bind(this)
	this.onKeydown = onKeydown.bind(this)
	this.onMouseEnter = this.pause.bind(this)
	this.onMouseLeave = this.play.bind(this)

	this.el.addEventListener("click", this.onClick)
	this.el.addEventListener("keydown", this.onKeydown)

	this.nodes.wrapper.addEventListener("touchstart", this.onTouchStart)
	this.nodes.wrapper.addEventListener("touchmove", this.onTouchMove)
	this.nodes.wrapper.addEventListener("touchend", this.onTouchEnd)

	// autoplay should be a number, not a boolean
	if (this.config.autoplay > 1 && this.nodes.playstop) {
		// can't autoplay without loop
		this.config.loop = true
		this.autoplayStatus = "play"
		this.play()
		this.el.addEventListener("mouseenter", this.onMouseEnter)
		this.el.addEventListener("mouseleave", this.onMouseLeave)
	} else {
		this.changeActive(this.active)
	}
}

export default init
