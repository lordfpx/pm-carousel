import CONST from "./src/CONST";
import utils from "./src/utils";

import init from "./src/init";
import setActive from "./src/setActive";
import onClick from "./src/onClick";
import onMatchMedia from "./src/onMatchMedia";
import getMqConfig from "./src/getMqConfig";
import touch from "./src/touch";

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

    this.el.addEventListener("click", onClick.bind(this));

    // carousel config
    this.config = this.settings.config;

    this.clonedChildren = this.el.innerHTML;

    // media query carousel config
    if (this.settings.responsive) {
      this.config = getMqConfig.call(this);
      this.settings.responsive.forEach(config => {
        let mql = window.matchMedia(`(min-width: ${config.width})`);
        mql.addEventListener("change", onMatchMedia.bind(this));
      });
    }

    if (!this.config.disable) {
      init.call(this);
    }
  }

  refresh() {
    init.call(this)
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

    setActive.call(this);
  }

  disable() {
    this.nodes.wrapper.removeEventListener("touchstart", touch.onTouchStart.bind(this));
    this.nodes.wrapper.removeEventListener("touchmove", touch.onTouchMove.bind(this));
    this.nodes.wrapper.removeEventListener("touchend", touch.onTouchEnd.bind(this));
    this.el.removeEventListener("mouseenter", this.pause.bind(this));
    this.el.removeEventListener("mouseleave", this.play.bind(this));

    this.el.innerHTML = this.clonedChildren;
    this.el.classList.remove(CONST.activeClass);
  }
}

const pmCarousel = function (settings = {}) {
  const elements = document.querySelectorAll(`[${CONST.attr}]`);
  elements.forEach(node => (node.pmCarousel = new Plugin(node, settings)));
};

export default pmCarousel
