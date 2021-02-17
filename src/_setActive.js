import CONST from "./CONST.js";
import _updateScroll from "./_updateScroll.js";
import _prevBtn from "./_prevBtn.js";
import _nextBtn from "./_nextBtn.js";

function _setActive() {
  this.activeSlides = [];

  // Le nbr de page est différent du nbr de slides !
  this.nodes.pages.forEach((node, index) => {
    let pageBtn = node.tagName === "BUTTON" ? node : node.querySelector("button");

    if (index === this.active) {
      pageBtn.setAttribute("aria-current", "true");
      node.classList.add(CONST.activeClass);
    } else {
      pageBtn.removeAttribute("aria-current");
      node.classList.remove(CONST.activeClass);
    }
  });

  this.nodes.items.forEach((nodes, index) => {
    nodes.forEach((node, indexFirstItem) => {
      if (index === this.active) {
        // put focus on 1st item from active slide
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

  _updateScroll.call(this);
  _prevBtn.call(this);
  _nextBtn.call(this);
}

export default _setActive;
