import CONST from "./CONST";

function onClick(ev) {
  let newActive = this.active;
  let targetNode = ev.target;

  const isPlaystop = targetNode.closest(`[${CONST.attr}-playstop]`)
  const isPrev = targetNode.closest(`[${CONST.attr}-prev]`)
  const isNext = targetNode.closest(`[${CONST.attr}-next]`)
  const isPaging = targetNode.closest(`[${CONST.attr}-paging]`)

  if (isPlaystop) {
    this.toggleAutoplay();
    return;
  } else if (isPrev) {
    newActive--;
  } else if (isNext) {
    newActive++;
  } else if (isPaging && isPaging.querySelector('button')) {
    let targetBtn = targetNode.closest(`[${CONST.attr}-paging] li`);
    newActive = this.nodes.pages.indexOf(targetBtn);
  } else {
    return;
  }

  this.stop();
  this.changeActive(newActive);
}

export default onClick;
