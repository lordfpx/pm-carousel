import CONST from "./CONST";

function slides() {
  const newSlides = [];

  this.nodes.items = [...this.clonedItems];

  // prepare DOM
  this.nodes.items.forEach((node, index) => {
    node.setAttribute("tabindex", "-1");
    node.setAttribute(CONST.attr + "-item", index);
    node.style.flex = `1 0 ${100 / this.config.group}%`;
    node.style.overflow = "hidden";
  });

  // split in groups
  while (this.nodes.items.length > 0) {
    newSlides.push(this.nodes.items.splice(0, this.config.group));
  }

  this.nodes.items = newSlides;
  this.slideLength = this.nodes.items.length;
}

export default { slides };
