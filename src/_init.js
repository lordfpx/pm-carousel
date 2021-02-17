import _onClick from "./_onClick.js";
import touch from "./touch.js";
import _onMatchMedia from "./_onMatchMedia.js";
import _getMqConfig from "./_getMqConfig.js";
import _build from "./_build.js";

function _init() {
  // carousel config
  this.config = this.settings.config;

  // media query carousel config
  if (this.settings.responsive) {
    this.config = _getMqConfig.call(this);
    this.settings.responsive.forEach(configs => {
      let mql = window.matchMedia(configs.mq);
      mql.addListener(_onMatchMedia.bind(this));
    });
  }

  _build.call(this, ["slides", "wrappers", "buttons", "paging"]);

  this.el.addEventListener("click", _onClick.bind(this));

  this.nodes.wrapper.addEventListener("touchstart", touch._onTouchStart.bind(this));
  this.nodes.wrapper.addEventListener("touchmove", touch._onTouchMove.bind(this));
  this.nodes.wrapper.addEventListener("touchend", touch._onTouchEnd.bind(this));

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

export default _init;
