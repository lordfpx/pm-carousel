import {
	ATTRPAGING,
	ATTRPREV,
	ATTRNEXT,
	ATTRPLAYSTOP,
	ATTRWRAPPER,
	ATTRITEM,
	ATTROVERFLOW,
} from "./constants"

function getNodes() {
	const nodes = {
		paging: this.el.querySelector(`[${ATTRPAGING}]`),
		prev: this.el.querySelector(`[${ATTRPREV}]`),
		next: this.el.querySelector(`[${ATTRNEXT}]`),
		playstop: this.el.querySelector(`[${ATTRPLAYSTOP}]`),
		overflow: this.el.querySelector(`[${ATTROVERFLOW}]`),
		wrapper: this.el.querySelector(`[${ATTRWRAPPER}]`),
		items: [].slice.call(this.el.querySelectorAll(`[${ATTRITEM}]`)),
	}
	if (nodes.paging) {
		nodes.pagingTpl = nodes.paging?.cloneNode(true)
	}

	return nodes
}

export default getNodes
