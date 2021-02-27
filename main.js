import CONST from "./src/CONST";
import utils from "./src/utils";

import init from "./src/init";
import setActive from "./src/setActive";
import onClick from "./src/onClick";
import onKeydown from "./src/onKeydown";
import onTouch from "./src/onTouch";
import onMatchMedia from "./src/onMatchMedia";
import getMqConfig from "./src/getMqConfig";

const DEFAULT = {
  default: {
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

    // carousel config
    this.config = this.settings.default;

    // media query carousel config
    if (this.settings.responsive) {
      // order respinsive widths
      this.settings.responsive.sort((a, b) => parseInt(a.minWidth, 10) - parseInt(b.minWidth, 10))

      this.config = getMqConfig.call(this);
      this.settings.responsive.forEach(config => {
        let mql = window.matchMedia(`(min-width: ${config.minWidth})`);
        mql.addEventListener("change", onMatchMedia.bind(this));
      });
    }

    // events functions
    this.onClick = onClick.bind(this);
    this.onTouchstart = onTouch.onTouchStart.bind(this);
    this.onTouchMove = onTouch.onTouchMove.bind(this);
    this.onTouchEnd = onTouch.onTouchEnd.bind(this);
    this.onKeydown = onKeydown.bind(this);

    // pseudo templates
    this.nodes = {
      paging: this.el.querySelector(`[${CONST.attrPaging}]`),
      prev: this.el.querySelector(`[${CONST.attrPrev}]`),
      next: this.el.querySelector(`[${CONST.attrNext}]`),
      playstop: this.el.querySelector(`[${CONST.attrPlaystop}]`),
    };
    this.pagingBtnString = this.nodes.paging.children[0].outerHTML;
    this.playstopString = this.nodes.playstop.children[0].outerHTML;
    this.prevString = this.nodes.prev.children[0].outerHTML;
    this.nextString = this.nodes.next.children[0].outerHTML;

    // Labels
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

    if (!this.config.disable) {
      init.call(this);
    }
  }

  refresh() {
    init.call(this)
  }

  play() {
    // "stop" status !== pause
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
      if (newActive > this.slideLength - 1) {
        newActive = 0;
      }

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

    if (this.active < 0) {
      this.active = this.config.loop ? this.slideLength - 1 : 0;
    }

    if (this.active > this.slideLength - 1) {
      this.active = this.config.loop ? 0 : this.slideLength - 1;
    }

    setActive.call(this);
  }

  disable() {
    this.stop();

    this.nodes.wrapper.removeEventListener("touchstart", this.onTouchStart);
    this.nodes.wrapper.removeEventListener("touchmove", this.onTouchMove);
    this.nodes.wrapper.removeEventListener("touchend", this.onTouchEnd);
    this.el.removeEventListener("click", this.onClick);
    this.el.removeEventListener("mouseenter", this.pause);
    this.el.removeEventListener("mouseleave", this.play);

    this.nodes.paging.hidden = true;
    this.nodes.prev.hidden = true;
    this.nodes.next.hidden = true;
    this.nodes.playstop.hidden = true;

    this.nodes.overflow.removeAttribute("style");
    this.nodes.wrapper.removeAttribute("style");

    this.nodes.items.forEach((nodes) => {
      nodes.forEach((node) => {
        node.removeAttribute("tabindex");
        node.removeAttribute("aria-hidden");
        node.removeAttribute("style");
      })
    });

    this.el.classList.remove(CONST.activeClass);
  }
}

const initPmCarousel = (node, settings) => {
  if (!node.pmCarousel && node.hasAttribute(CONST.attr)) {
    node.pmCarousel = new Plugin(node, settings)
  }
}

const pmCarousel = function (settings = {}, node) {
  if (node === null) return;

  node = node || document.querySelectorAll(`[${CONST.attr}]`);

  node.length
    ? node.forEach(node => initPmCarousel(node, settings))
    : initPmCarousel(node, settings);
};

window.pmCarousel = pmCarousel;

export default pmCarousel
