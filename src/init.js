import {
  ATTRPAGING,
  ATTRWRAPPER,
  ATTROVERFLOW,
  ATTRITEM,
  ATTRPREV,
  ATTRNEXT,
  ATTRPLAYSTOP,
} from "./constants"
import build from "./build"
import onClick from "./onClick"
import onKeydown from "./onKeydown"
import onTouch from "./onTouch"

function init() {
  this.nodes = {
    paging: this.el.querySelector(`[${ATTRPAGING}]`),
    wrapper: this.el.querySelector(`[${ATTRWRAPPER}]`),
    overflow: this.el.querySelector(`[${ATTROVERFLOW}]`),
    items: [].slice.call(this.el.querySelectorAll(`[${ATTRITEM}]`)),
    prev: this.el.querySelector(`[${ATTRPREV}]`),
    next: this.el.querySelector(`[${ATTRNEXT}]`),
    playstop: this.el.querySelector(`[${ATTRPLAYSTOP}]`),
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
  this.onTouchStart = onTouch.onTouchStart.bind(this)
  this.onTouchMove = onTouch.onTouchMove.bind(this)
  this.onTouchEnd = onTouch.onTouchEnd.bind(this)
  this.onKeydown = onKeydown.bind(this)

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
    this.el.addEventListener("mouseenter", this.pause.bind(this))
    this.el.addEventListener("mouseleave", this.play.bind(this))
  } else {
    this.changeActive(this.active)
  }
}

export default init
