import CONST from "./CONST";
import updateScroll from "./updateScroll";
import prevBtn from "./prevBtn";
import nextBtn from "./nextBtn";

function setActive() {
  this.activeSlides = [];

  // Le nbr de page est différent du nbr de slides !
  if (this.nodes.paging) {
    this.nodes.pages.forEach((node, index) => {
      let pageBtn = node

      // button child
      const btnNode = node.querySelector("button")

      if (btnNode) {
        pageBtn = btnNode
      }

      if (index === this.active) {
        pageBtn.setAttribute("aria-current", "true");
        node.classList.add(CONST.activeClass);
      } else {
        pageBtn.removeAttribute("aria-current");
        node.classList.remove(CONST.activeClass);
      }
    });
  }

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

  updateScroll.call(this);
  prevBtn.call(this);
  nextBtn.call(this);
}

export default setActive;
