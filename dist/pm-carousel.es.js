var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const ATTR = "data-pm-carousel";
const ATTRPAGING = `${ATTR}-paging`;
const ATTRWRAPPER = `${ATTR}-wrapper`;
const ATTROVERFLOW = `${ATTR}-overflow`;
const ATTRITEM = `${ATTR}-item`;
const ATTRPREV = `${ATTR}-prev`;
const ATTRNEXT = `${ATTR}-next`;
const ATTRPLAYSTOP = `${ATTR}-playstop`;
const TRANSITION = "transform .5s ease-in-out";
const ACTIVECLASS = "is-active";
function extend() {
  const extended = {};
  let deep = false;
  let i = 0;
  const length = arguments.length;
  if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
    deep = arguments[0];
    i++;
  }
  const merge = function(obj) {
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
          extended[prop] = extend(true, extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };
  for (; i < length; i++) {
    const obj = arguments[i];
    merge(obj);
  }
  return extended;
}
function returnJson(string) {
  try {
    return JSON.parse(string);
  } catch (error) {
    return {};
  }
}
var utils = { extend, returnJson };
const buildActions = {
  playstop: function() {
    if (!this.nodes.playstop)
      return;
    this.nodes.playstop.hidden = !this.config.autoplay;
  },
  wrappers: function() {
    const startSpace = this.config.noStartSpace ? 0 : this.config.spaceAround;
    this.nodes.overflow.style.transform = `translateX(${this.active * -100 + startSpace}%)`;
    if (this.config.noStartSpace) {
      this.nodes.overflow.style.paddingRight = this.config.spaceAround + "%";
    } else {
      this.nodes.overflow.style.paddingRight = startSpace + "%";
      this.nodes.overflow.style.paddingLeft = startSpace + "%";
    }
    this.nodes.overflow.style.transition = TRANSITION;
    this.nodes.overflow.style.display = "flex";
    this.nodes.wrapper.style.overflow = "hidden";
    this.el.classList.add(ACTIVECLASS);
  },
  slides: function() {
    const newSlides = [];
    this.nodes.items.forEach((node, index) => {
      node.setAttribute("tabindex", "-1");
      node.setAttribute(ATTR + "-item", index);
      node.style.flex = `1 0 ${100 / this.config.group}%`;
      node.style.overflow = "hidden";
    });
    while (this.nodes.items.length > 0) {
      newSlides.push(this.nodes.items.splice(0, this.config.group));
    }
    this.nodes.items = newSlides;
    this.slideLength = this.nodes.items.length;
  },
  paging: function() {
    if (!this.nodes.paging)
      return;
    let newPage, btnString;
    const pages = document.createDocumentFragment();
    this.nodes.paging.innerHTML = "";
    this.nodes.pages = [];
    this.nodes.items.forEach((node, index) => {
      btnString = this.pagingBtnString;
      newPage = document.createElement("div");
      newPage.innerHTML = btnString.replace("{nbr}", ++index);
      this.nodes.pages.push(newPage.firstElementChild);
      pages.appendChild(newPage.firstElementChild);
    });
    this.nodes.paging.append(pages);
    this.nodes.paging.hidden = false;
  }
};
function build(actions = []) {
  actions.forEach((action) => buildActions[action].call(this));
}
function onClick(ev) {
  let newActive = this.active;
  const targetNode = ev.target;
  const isPlaystop = targetNode.closest(`[${ATTR}-playstop]`);
  const isPrev = targetNode.closest(`[${ATTR}-prev]`);
  const isNext = targetNode.closest(`[${ATTR}-next]`);
  const isPaging = targetNode.closest(`[${ATTR}-paging]`);
  if (isPlaystop) {
    this.toggleAutoplay();
    return;
  } else if (isPrev) {
    newActive--;
  } else if (isNext) {
    newActive++;
  } else if (isPaging && isPaging.querySelector("button")) {
    const targetBtn = targetNode.closest(`[${ATTR}-paging] li`);
    newActive = this.nodes.pages.indexOf(targetBtn);
  } else {
    return;
  }
  this.stop();
  this.changeActive(newActive);
}
function onKeydown(ev) {
  let prevDef = false;
  console.log(ev.key);
  switch (ev.key) {
    case "ArrowUp":
    case "ArrowLeft":
      prevDef = true;
      this.changeActive(this.active - 1);
      break;
    case "ArrowDown":
    case "ArrowRight":
      prevDef = true;
      this.changeActive(this.active + 1);
      break;
    case "Home":
      prevDef = true;
      this.changeActive(0);
      break;
    case "End":
      prevDef = true;
      this.changeActive(this.slideLength - 1);
      break;
  }
  prevDef && ev.preventDefault();
}
function onTouchStart(ev) {
  this.nodes.overflow.style.transition = "none";
  this._touchstartX = Math.round(ev.touches[0].pageX);
  this._slideWidth = this.nodes.wrapper.offsetWidth;
}
function onTouchMove(ev) {
  this._touchmoveX = Math.round(ev.touches[0].pageX);
  this._moveX = this._touchstartX - this._touchmoveX;
  this.nodes.overflow.style.transform = `translateX(${-this._distance - this._moveX / 2}px)`;
}
function onTouchEnd(ev) {
  let newActive = this.active;
  this.nodes.overflow.style.transition = TRANSITION;
  if (this._moveX > this._slideWidth / 3) {
    newActive++;
  } else if (this._moveX < -this._slideWidth / 3) {
    newActive--;
  } else {
    this.nodes.overflow.style.transform = `translateX(${-this._distance}px)`;
    return;
  }
  this.changeActive(newActive);
}
var onTouch = { onTouchStart, onTouchMove, onTouchEnd };
function init() {
  this.nodes = {
    paging: this.el.querySelector(`[${ATTRPAGING}]`),
    wrapper: this.el.querySelector(`[${ATTRWRAPPER}]`),
    overflow: this.el.querySelector(`[${ATTROVERFLOW}]`),
    items: [].slice.call(this.el.querySelectorAll(`[${ATTRITEM}]`)),
    prev: this.el.querySelector(`[${ATTRPREV}]`),
    next: this.el.querySelector(`[${ATTRNEXT}]`),
    playstop: this.el.querySelector(`[${ATTRPLAYSTOP}]`)
  };
  this.active = 0;
  this._interval = null;
  this.autoplayStatus = "stop";
  this._slideWidth = 0;
  this._touchstartX = 0;
  this._touchmoveX = 0;
  this._moveX = 0;
  build.call(this, ["slides", "wrappers", "playstop", "paging"]);
  this.onClick = onClick.bind(this);
  this.onTouchStart = onTouch.onTouchStart.bind(this);
  this.onTouchMove = onTouch.onTouchMove.bind(this);
  this.onTouchEnd = onTouch.onTouchEnd.bind(this);
  this.onKeydown = onKeydown.bind(this);
  this.el.addEventListener("click", this.onClick);
  this.el.addEventListener("keydown", this.onKeydown);
  this.nodes.wrapper.addEventListener("touchstart", this.onTouchStart);
  this.nodes.wrapper.addEventListener("touchmove", this.onTouchMove);
  this.nodes.wrapper.addEventListener("touchend", this.onTouchEnd);
  if (this.config.autoplay > 1 && this.nodes.playstop) {
    this.config.loop = true;
    this.autoplayStatus = "play";
    this.play();
    this.el.addEventListener("mouseenter", this.pause.bind(this));
    this.el.addEventListener("mouseleave", this.play.bind(this));
  } else {
    this.changeActive(this.active);
  }
}
function updateScroll() {
  this._slideWidth = this.activeSlides[0].offsetWidth * this.config.group;
  this._distance = this.active * this._slideWidth;
  if (this.active === this.slideLength - 1) {
    this._distance = this.nodes.overflow.scrollWidth - this._slideWidth;
    if (this.config.spaceAround) {
      this._distance -= parseInt(window.getComputedStyle(this.nodes.overflow).getPropertyValue("padding-right"), 10);
    }
  }
  this.nodes.overflow.style.transform = `translateX(${-this._distance}px`;
}
function prevBtn() {
  if (!this.nodes.prev)
    return;
  const prevText = this.prevString;
  this.nodes.prev.innerHTML = prevText.replace("{text}", this.active === 0 ? this.texts.prevFirst : this.texts.prev);
  this.config.loop ? this.nodes.prev.hidden = false : this.nodes.prev.hidden = this.active === 0;
}
function nextBtn() {
  if (!this.nodes.next)
    return;
  const nextText = this.nextString;
  this.nodes.next.innerHTML = nextText.replace("{text}", this.active === this.slideLength - 1 ? this.texts.nextLast : this.texts.next);
  this.config.loop ? this.nodes.next.hidden = false : this.nodes.next.hidden = this.active === this.slideLength - 1;
}
function setActive() {
  this.activeSlides = [];
  if (this.nodes.paging) {
    this.nodes.pages.forEach((node, index) => {
      let pageBtn = node;
      const btnNode = node.querySelector("button");
      if (btnNode) {
        pageBtn = btnNode;
      }
      if (index === this.active) {
        pageBtn.setAttribute("aria-current", "true");
        node.classList.add(ACTIVECLASS);
      } else {
        pageBtn.removeAttribute("aria-current");
        node.classList.remove(ACTIVECLASS);
      }
    });
  }
  this.nodes.items.forEach((nodes, index) => {
    nodes.forEach((node, indexFirstItem) => {
      if (index === this.active) {
        if (indexFirstItem === 0 && this.autoplayStatus !== "play") {
          node.focus({ preventScroll: true });
        }
        node.setAttribute("aria-hidden", "false");
        this.activeSlides.push(node);
      } else {
        node.setAttribute("aria-hidden", "true");
      }
    });
  });
  updateScroll.call(this);
  prevBtn.call(this);
  nextBtn.call(this);
}
function getMqConfig() {
  const updatedMqConfig = this.settings.responsive.slice().reverse().find((mqConfigs) => window.matchMedia(`(min-width: ${mqConfigs.minWidth})`).matches);
  return updatedMqConfig ? __spreadValues(__spreadValues({}, this.settings.default), updatedMqConfig) : this.settings.default;
}
let timeout;
let checkDebounce = false;
function onMatchMedia() {
  if (checkDebounce)
    return;
  checkDebounce = true;
  timeout = setTimeout(() => {
    this.config = getMqConfig.call(this);
    this.config.disable ? this.disable() : this.reinit();
    checkDebounce = false;
    clearTimeout(timeout);
  }, 500);
}
const DEFAULT = {
  default: {
    loop: true,
    group: 1,
    spaceAround: 0,
    noStartSpace: false,
    autoplay: 0
  }
};
class Plugin {
  constructor(el, settings) {
    this.el = el;
    const elSettings = utils.returnJson(this.el.getAttribute(ATTR));
    this.settings = utils.extend(true, DEFAULT, settings, elSettings);
    this.config = this.settings.default;
    if (this.settings.responsive) {
      this.settings.responsive.sort((a, b) => parseInt(a.minWidth, 10) - parseInt(b.minWidth, 10));
      this.config = getMqConfig.call(this);
      this.settings.responsive.forEach((config) => {
        const mql = window.matchMedia(`(min-width: ${config.minWidth})`);
        mql.addEventListener("change", onMatchMedia.bind(this));
      });
    }
    this.nodes = {
      paging: this.el.querySelector(`[${ATTRPAGING}]`),
      prev: this.el.querySelector(`[${ATTRPREV}]`),
      next: this.el.querySelector(`[${ATTRNEXT}]`),
      playstop: this.el.querySelector(`[${ATTRPLAYSTOP}]`)
    };
    if (this.nodes.paging) {
      this.pagingBtnString = this.nodes.paging.innerHTML;
    }
    this.texts = {};
    if (this.nodes.playstop) {
      this.playstopString = this.nodes.playstop.innerHTML;
      const playstopTexts = this.nodes.playstop.getAttribute(ATTRPLAYSTOP).split("|");
      this.texts = __spreadProps(__spreadValues({}, this.texts), {
        play: playstopTexts[0],
        stop: playstopTexts[1]
      });
    }
    if (this.nodes.prev && this.nodes.next) {
      this.prevString = this.nodes.prev.innerHTML;
      this.nextString = this.nodes.next.innerHTML;
      const prevTexts = this.nodes.prev.getAttribute(ATTRPREV).split("|");
      const nextTexts = this.nodes.next.getAttribute(ATTRNEXT).split("|");
      this.texts = __spreadProps(__spreadValues({}, this.texts), {
        prev: prevTexts[0],
        prevFirst: prevTexts[1],
        next: nextTexts[0],
        nextLast: nextTexts[1]
      });
    }
    if (!this.config.disable) {
      init.call(this);
    }
  }
  reinit() {
    init.call(this);
  }
  play() {
    if (!this.nodes.playstop || this.autoplayStatus === "stop")
      return;
    this.pause();
    this.autoplayStatus = "play";
    this.nodes.playstop.classList.add("is-playing");
    const playText = this.playstopString;
    this.nodes.playstop.innerHTML = playText.replace("{text}", this.texts.play);
    let newActive = this.active;
    this._interval = window.setInterval(() => {
      newActive++;
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
    if (!this.nodes.playstop)
      return;
    this.autoplayStatus = "stop";
    this.nodes.playstop.classList.remove("is-playing");
    const stopText = this.playstopString;
    this.nodes.playstop.innerHTML = stopText.replace("{text}", this.texts.stop);
    window.clearInterval(this._interval);
  }
  toggleAutoplay() {
    if (!this.nodes.playstop)
      return;
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
      });
    });
    this.el.classList.remove(ACTIVECLASS);
  }
}
const initPmCarousel = (node, settings) => {
  if (!node.pmCarousel && node.hasAttribute(ATTR)) {
    node.pmCarousel = new Plugin(node, settings);
  }
};
const pmCarousel = function(settings = {}, node) {
  if (node === null)
    return;
  node = node || document.querySelectorAll(`[${ATTR}]`);
  node.length ? node.forEach((node2) => initPmCarousel(node2, settings)) : initPmCarousel(node, settings);
};
window.pmCarousel = pmCarousel;
export { pmCarousel as default };
