import CONST from "./CONST.js";

function _onClick(ev) {
  let newActive = this.active;
  let targetNode = ev.target;

  if (targetNode.closest(`[${CONST.attr}-playstop]`)) {
    this.toggleAutoplay();
    return;
  }

  if (targetNode.closest(`[${CONST.attr}-prev]`)) {
    newActive--;
  } else if (targetNode.closest(`[${CONST.attr}-next]`)) {
    newActive++;
  } else if (targetNode.closest(`[${CONST.attr}-paging]`)) {
    let targetBtn = targetNode.closest(`[${CONST.attr}-paging] li`);
    newActive = this.nodes.pages.indexOf(targetBtn);
  } else {
    return;
  }

  this.stop();
  this.changeActive(newActive);
}

export default _onClick;
