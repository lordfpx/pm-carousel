import CONST from "./CONST";
import touch from "./touch";
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

  // pseudo templates
  this.pagingBtnString = this.nodes.paging.children[0].outerHTML;
  this.playstopString = this.nodes.playstop.children[0].outerHTML;
  this.prevString = this.nodes.prev.children[0].outerHTML;
  this.nextString = this.nodes.next.children[0].outerHTML;

  const playstopTexts = this.nodes.playstop.getAttribute(CONST.attrPlaystop).split("|");
  const prevTexts = this.nodes.prev.getAttribute(CONST.attrPrev).split("|");
  const nextTexts = this.nodes.next.getAttribute(CONST.attrNext).split("|");
  this.texts = {
    stop: playstopTexts[0],
    play: playstopTexts[1],
    prev: prevTexts[0],
    prevFirst: prevTexts[1],
    next: nextTexts[0],
    nextLast: nextTexts[1],
  };

  this.active = 0;
  this._interval = null;
  this.autoplayStatus = "stop"; // to manage play/stop

  // touch
  this._slideWidth = 0;
  this._touchstartX = 0;
  this._touchmoveX = 0;
  this._moveX = 0;

  build.call(this, ["slides", "wrappers", "buttons", "paging"]);

  this.nodes.wrapper.addEventListener("touchstart", touch.onTouchStart.bind(this));
  this.nodes.wrapper.addEventListener("touchmove", touch.onTouchMove.bind(this));
  this.nodes.wrapper.addEventListener("touchend", touch.onTouchEnd.bind(this));

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
