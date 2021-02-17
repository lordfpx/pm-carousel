import CONST from "./src/CONST.js";
import utils from "./src/utils.js";
import _init from "./src/_init.js";
import _setActive from "./src/_setActive.js";
import _build from "./src/_build.js";
import disable from "./src/disable.js";
import reset from "./src/reset.js";

const DEFAULT = {
  config: {
    loop: true,
    group: 1,
    spaceAround: 0,
    noStartSpace: false,
    autoplay: 0,
  },
};

class Plugin {
  constructor(el, settings) {
    this.el = el;

    // data-attribute settings
    const elSettings = utils.returnJson(this.el.getAttribute(CONST.attr));

    // merged settings
    this.settings = utils.extend(true, DEFAULT, settings, elSettings);

    this.nodes = {
      paging: this.el.querySelector(`[${CONST.attrPaging}]`),
      wrapper: this.el.querySelector(`[${CONST.attrWrapper}]`),
      overflow: this.el.querySelector(`[${CONST.attrOverflow}]`),
      items: [].slice.call(this.el.querySelectorAll(`[${CONST.attrItem}]`)),
      prev: this.el.querySelector(`[${CONST.attrPrev}]`),
      next: this.el.querySelector(`[${CONST.attrNext}]`),
      playstop: this.el.querySelector(`[${CONST.attrPlaystop}]`),
    };

    // to allow reset
    this.clonedItems = [...this.nodes.items];

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

    _init.call(this);
  }

  refresh() {
    reset.resetSlides.call(this);
    _build.call(this, ["paging"]);
    this.active = 0;
    _setActive.call(this);
  }

  play() {
    // stop status !== pause
    if (this.autoplayStatus === "stop") return;

    this.pause(); // clear interval
    this.autoplayStatus = "play";
    this.nodes.playstop.classList.add("is-playing");

    const playText = this.playstopString;
    this.nodes.playstop.innerHTML = playText.replace("{text}", this.texts.play);

    let newActive = this.active;
    this._interval = window.setInterval(() => {
      newActive++;

      // must loop even with loop: false
      if (newActive > this.slideLength - 1) newActive = 0;

      this.changeActive(newActive);
    }, this.config.autoplay);
  }

  pause() {
    window.clearInterval(this._interval);
  }

  stop() {
    this.autoplayStatus = "stop";
    this.nodes.playstop.classList.remove("is-playing");

    const stopText = this.playstopString;
    this.nodes.playstop.innerHTML = stopText.replace("{text}", this.texts.stop);
    window.clearInterval(this._interval);
  }

  toggleAutoplay() {
    if (this.autoplayStatus === "play") {
      this.stop();
    } else if (this.autoplayStatus === "stop") {
      this.autoplayStatus = "play";
      this.play();
    }
  }

  changeActive(newActive) {
    this.active = newActive;

    if (this.active < 0)
      this.active = this.config.loop ? this.slideLength - 1 : 0;

    if (this.active > this.slideLength - 1)
      this.active = this.config.loop ? 0 : this.slideLength - 1;

    _setActive.call(this);
  }
}

Plugin.prototype.disable = disable;

const pmCarousel = function (settings = {}) {
  const elements = document.querySelectorAll(`[${CONST.attr}]`);
  elements.forEach(node => (node[CONST.pluginName] = new Plugin(node, settings)));
};

export default pmCarousel
