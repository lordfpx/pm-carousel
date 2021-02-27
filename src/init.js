import CONST from "./CONST";
import build from "./build";

function init() {
  this.nodes = {
    paging: this.el.querySelector(`[${CONST.attrPaging}]`),
    wrapper: this.el.querySelector(`[${CONST.attrWrapper}]`),
    overflow: this.el.querySelector(`[${CONST.attrOverflow}]`),
    items: [].slice.call(this.el.querySelectorAll(`[${CONST.attrItem}]`)),
    prev: this.el.querySelector(`[${CONST.attrPrev}]`),
    next: this.el.querySelector(`[${CONST.attrNext}]`),
    playstop: this.el.querySelector(`[${CONST.attrPlaystop}]`),
  };

  this.active = 0;
  this._interval = null;
  this.autoplayStatus = "stop"; // to manage play/stop

  // touch
  this._slideWidth = 0;
  this._touchstartX = 0;
  this._touchmoveX = 0;
  this._moveX = 0;

  build.call(this, ["slides", "wrappers", "playstop", "paging"]);

  this.el.addEventListener("click", this.onClick);
  this.el.addEventListener("keydown", this.onKeydown);

  this.nodes.wrapper.addEventListener("touchstart", this.onTouchStart);
  this.nodes.wrapper.addEventListener("touchmove", this.onTouchMove);
  this.nodes.wrapper.addEventListener("touchend", this.onTouchEnd);

  if (this.config.autoplay) {
    // can't autoplay without loop
    this.config.loop = true;
    this.autoplayStatus = "play";
    this.play();
    this.el.addEventListener("mouseenter", this.pause.bind(this));
    this.el.addEventListener("mouseleave", this.play.bind(this));
  } else {
    this.changeActive(this.active);
  }
}

export default init;
